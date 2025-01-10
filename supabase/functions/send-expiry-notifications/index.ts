import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const supabase = createClient(
  SUPABASE_URL!,
  SUPABASE_SERVICE_ROLE_KEY!
);

async function sendExpiryNotification(
  to: string,
  exceptionTitle: string,
  daysUntilExpiry: number
) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: "Risk Management <notifications@yourdomain.com>",
      to: [to],
      subject: `Exception Request Expiring Soon: ${exceptionTitle}`,
      html: `
        <h2>Exception Request Expiring Soon</h2>
        <p>The following exception request will expire in ${daysUntilExpiry} days:</p>
        <p><strong>${exceptionTitle}</strong></p>
        <p>Please take appropriate action before the exception expires.</p>
      `,
    }),
  });

  if (!res.ok) {
    const error = await res.text();
    console.error("Error sending email:", error);
    throw new Error(`Failed to send email: ${error}`);
  }

  return await res.json();
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Checking for expiring exceptions...");

    // Get exceptions that are:
    // 1. Approved
    // 2. Not expired
    // 3. Expiring within 30 days
    const { data: expiringExceptions, error: queryError } = await supabase
      .from("exception_requests")
      .select(`
        id,
        title,
        type,
        expiry_date,
        submitted_by,
        profiles!exception_requests_submitted_by_fkey (
          email
        )
      `)
      .eq("status", "approved")
      .eq("expired", false)
      .lt("expiry_date", new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString())
      .gt("expiry_date", new Date().toISOString());

    if (queryError) {
      throw queryError;
    }

    console.log(`Found ${expiringExceptions?.length || 0} expiring exceptions`);

    const notifications = [];

    for (const exception of expiringExceptions || []) {
      const daysUntilExpiry = Math.ceil(
        (new Date(exception.expiry_date).getTime() - Date.now()) /
          (1000 * 60 * 60 * 24)
      );

      // Get approver email
      const { data: approverRoles } = await supabase
        .from("user_approver_roles")
        .select(`
          profiles!user_approver_roles_user_id_fkey (
            email
          )
        `)
        .eq("role", `${exception.type}_approver`);

      // Send notification to exception owner
      if (exception.profiles?.email) {
        try {
          await sendExpiryNotification(
            exception.profiles.email,
            exception.title,
            daysUntilExpiry
          );
          notifications.push({
            success: true,
            recipient: "owner",
            exceptionId: exception.id,
          });
        } catch (error) {
          console.error(
            `Failed to send notification to owner for exception ${exception.id}:`,
            error
          );
          notifications.push({
            success: false,
            recipient: "owner",
            exceptionId: exception.id,
            error: error.message,
          });
        }
      }

      // Send notification to approvers
      for (const approverRole of approverRoles || []) {
        if (approverRole.profiles?.email) {
          try {
            await sendExpiryNotification(
              approverRole.profiles.email,
              exception.title,
              daysUntilExpiry
            );
            notifications.push({
              success: true,
              recipient: "approver",
              exceptionId: exception.id,
            });
          } catch (error) {
            console.error(
              `Failed to send notification to approver for exception ${exception.id}:`,
              error
            );
            notifications.push({
              success: false,
              recipient: "approver",
              exceptionId: exception.id,
              error: error.message,
            });
          }
        }
      }
    }

    return new Response(
      JSON.stringify({
        message: "Notifications processed",
        notifications,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error in send-expiry-notifications function:", error);
    return new Response(
      JSON.stringify({
        error: error.message,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
};

serve(handler);