import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { UserRoleSelect } from "./UserRoleSelect";
import { ApproverRole, UserRole } from "@/types/approver";
import { Edit2, Key } from "lucide-react";
import { UserEditDialog } from "./UserEditDialog";
import { useState } from "react";
import { UserRoleBadge } from "./UserRoleBadge";
import { UserNameDisplay } from "./UserNameDisplay";
import { UserTableLoadingState } from "./UserTableLoadingState";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface UserRolesTableProps {
  users: UserRole[];
  loading?: boolean;
  onRoleChange: (userId: string, role: ApproverRole) => void;
  onRoleRemove: (userId: string, role: ApproverRole) => void;
  onUserDisable: (userId: string, disabled: boolean) => void;
  onUserUpdate: (userId: string, data: { first_name?: string; last_name?: string }) => void;
}

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

export const UserRolesTable = ({ 
  users, 
  loading = false,
  onRoleChange, 
  onRoleRemove,
  onUserDisable,
  onUserUpdate,
}: UserRolesTableProps) => {
  const [editingUser, setEditingUser] = useState<UserRole | null>(null);
  const { toast } = useToast();

  const handlePasswordReset = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });
      
      if (error) throw error;
      
      toast({
        title: "Password reset email sent",
        description: `A password reset email has been sent to ${email}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send password reset email",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <UserTableLoadingState />;
  }

  if (!users || users.length === 0) {
    return (
      <div className="rounded-md border bg-white dark:bg-gray-900 p-8 text-center">
        <p className="text-muted-foreground">No users found</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border bg-white dark:bg-gray-900">
      <Table>
        <TableHeader>
          <TableRow className="bg-primary/5 dark:bg-primary/10">
            <TableHead className="w-[250px] font-semibold text-primary/90">User Email</TableHead>
            <TableHead className="w-[200px] font-semibold text-primary/90">Name</TableHead>
            <TableHead className="font-semibold text-primary/90">Current Roles</TableHead>
            <TableHead className="w-[100px] text-center font-semibold text-primary/90">Status</TableHead>
            <TableHead className="w-[260px] font-semibold text-primary/90">Add Role</TableHead>
            <TableHead className="w-[140px] text-center font-semibold text-primary/90">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} className="group hover:bg-muted/50">
              <TableCell className="font-medium">{user.email}</TableCell>
              <TableCell>
                <UserNameDisplay firstName={user.first_name} lastName={user.last_name} />
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-2">
                  {user.roles.map((role) => (
                    <UserRoleBadge
                      key={role}
                      role={role}
                      label={roleLabels[role]}
                      onRemove={() => onRoleRemove(user.id, role)}
                    />
                  ))}
                </div>
              </TableCell>
              <TableCell className="text-center">
                <Switch
                  checked={!user.is_disabled}
                  onCheckedChange={(checked) => onUserDisable(user.id, !checked)}
                  className="data-[state=checked]:bg-success data-[state=unchecked]:bg-destructive"
                />
              </TableCell>
              <TableCell>
                <UserRoleSelect 
                  onRoleChange={(role) => onRoleChange(user.id, role)} 
                />
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setEditingUser(user)}
                    className="hover:bg-primary/10"
                  >
                    <Edit2 className="h-4 w-4 text-primary/70" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => user.email && handlePasswordReset(user.email)}
                    className="hover:bg-primary/10"
                    title="Reset Password"
                  >
                    <Key className="h-4 w-4 text-primary/70" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <UserEditDialog
        user={editingUser}
        open={!!editingUser}
        onClose={() => setEditingUser(null)}
        onSubmit={(data) => {
          if (editingUser) {
            onUserUpdate(editingUser.id, data);
            setEditingUser(null);
          }
        }}
      />
    </div>
  );
};