import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface ApproverRoleCheckProps {
  children: React.ReactNode;
  userId: string | null;
  approverRoles: string[];
  isLoading: boolean;
}

export const ApproverRoleCheck = ({ 
  children, 
  userId, 
  approverRoles, 
  isLoading 
}: ApproverRoleCheckProps) => {
  if (!userId) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (!approverRoles.length) {
    return (
      <div className="p-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>No Approver Roles Assigned</AlertTitle>
          <AlertDescription>
            You currently don't have any approver roles assigned. Please contact your administrator to get the necessary roles assigned to your account.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return <>{children}</>;
};