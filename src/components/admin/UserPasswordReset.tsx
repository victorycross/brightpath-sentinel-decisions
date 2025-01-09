import { Button } from "@/components/ui/button";
import { Key } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface UserPasswordResetProps {
  email: string | null;
}

export const UserPasswordReset = ({ email }: UserPasswordResetProps) => {
  const [resetInProgress, setResetInProgress] = useState(false);
  const { toast } = useToast();

  const handlePasswordReset = async () => {
    if (!email || resetInProgress) {
      toast({
        title: "Please wait",
        description: "A password reset was recently requested. Please wait before trying again.",
        variant: "destructive",
      });
      return;
    }

    try {
      setResetInProgress(true);
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) {
        if (error.message.includes('rate_limit')) {
          toast({
            title: "Rate limit exceeded",
            description: "Please wait a minute before requesting another password reset.",
            variant: "destructive",
          });
        } else {
          throw error;
        }
        return;
      }
      
      toast({
        title: "Password reset email sent",
        description: `A password reset email has been sent to ${email}`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to send password reset email",
        variant: "destructive",
      });
    } finally {
      // Remove the rate limit after 60 seconds
      setTimeout(() => {
        setResetInProgress(false);
      }, 60000);
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handlePasswordReset}
      className="hover:bg-primary/10"
      title="Reset Password"
      disabled={!email || resetInProgress}
    >
      <Key className="h-4 w-4 text-primary/70" />
    </Button>
  );
};