import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserRole, ApproverRole } from "@/types/approver";
import { useState } from "react";
import { UserRoleSelect } from "./UserRoleSelect";
import { UserRoleBadge } from "./UserRoleBadge";
import { Key } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface UserEditPopupProps {
  user: UserRole | null;
  open: boolean;
  onClose: () => void;
  onUpdate: (data: { first_name?: string; last_name?: string }) => void;
  onRoleAdd: (role: ApproverRole) => void;
  onRoleRemove: (role: ApproverRole) => void;
}

export const UserEditPopup = ({ 
  user, 
  open, 
  onClose, 
  onUpdate,
  onRoleAdd,
  onRoleRemove,
}: UserEditPopupProps) => {
  const [firstName, setFirstName] = useState(user?.first_name || "");
  const [lastName, setLastName] = useState(user?.last_name || "");
  const [resetInProgress, setResetInProgress] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({
      first_name: firstName || undefined,
      last_name: lastName || undefined,
    });
  };

  const handlePasswordReset = async () => {
    if (!user?.email || resetInProgress) {
      toast({
        title: "Please wait",
        description: "A password reset was recently requested. Please wait before trying again.",
        variant: "destructive",
      });
      return;
    }

    try {
      setResetInProgress(true);
      
      const { error } = await supabase.auth.resetPasswordForEmail(user.email, {
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
        description: `A password reset email has been sent to ${user.email}`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to send password reset email",
        variant: "destructive",
      });
    } finally {
      setTimeout(() => {
        setResetInProgress(false);
      }, 60000);
    }
  };

  const roleLabels: Record<ApproverRole, string> = {
    cyber_approver: "Cyber Security",
    legal_approver: "Legal",
    independence_approver: "Independence",
    qmr_approver: "Quality & Risk Management",
    clientAcceptance_approver: "Client Acceptance",
    engagementRisk_approver: "Engagement Risk",
    auditFinding_approver: "Audit Finding",
    data_approver: "Data Protection",
    ai_approver: "AI & Innovation",
    cro_approver: "Chief Risk Officer",
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit User Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 pt-4">
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label>Current Name</Label>
              <div className="p-2 bg-muted/50 rounded-md">
                <span className="text-muted-foreground">
                  {user?.first_name || 'No first name set'} {user?.last_name || 'No last name set'}
                </span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="firstName">New First Name</Label>
                <Input
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Enter first name"
                  className="bg-background"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lastName">New Last Name</Label>
                <Input
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Enter last name"
                  className="bg-background"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button type="submit">Save Changes</Button>
            </div>
          </form>

          <div className="space-y-4">
            <Label>User Roles</Label>
            <div className="flex flex-wrap gap-2">
              {user?.roles.map((role) => (
                <UserRoleBadge
                  key={role}
                  role={role}
                  label={roleLabels[role]}
                  onRemove={() => onRoleRemove(role)}
                />
              ))}
            </div>
            <UserRoleSelect onRoleChange={onRoleAdd} />
          </div>

          <div className="space-y-4">
            <Label>Password Reset</Label>
            <Button
              type="button"
              variant="outline"
              onClick={handlePasswordReset}
              disabled={!user?.email || resetInProgress}
              className="w-full"
            >
              <Key className="h-4 w-4 mr-2" />
              Send Password Reset Email
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};