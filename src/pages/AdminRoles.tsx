import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { UserRole, ApproverRole } from "@/types/approver";
import { AddUserDialog } from "@/components/admin/AddUserDialog";
import { UserManagementTabs } from "@/components/admin/UserManagementTabs";

export const AdminRoles = () => {
  const [users, setUsers] = useState<UserRole[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);

    const { data: profiles, error: profilesError } = await supabase
      .from("profiles")
      .select("*");

    if (profilesError) {
      toast({
        title: "Error",
        description: "Failed to fetch users",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    const { data: roles, error: rolesError } = await supabase
      .from("user_approver_roles")
      .select("*");

    if (rolesError) {
      toast({
        title: "Error",
        description: "Failed to fetch user roles",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    const userRoles = profiles?.map((profile) => ({
      id: profile.id,
      email: profile.email,
      roles: roles
        ?.filter((role) => role.user_id === profile.id)
        .map((role) => role.role as ApproverRole) || [],
      isDisabled: profile.is_disabled,
    })) || [];

    setUsers(userRoles);
    setLoading(false);
  };

  const handleRoleChange = async (userId: string, role: ApproverRole) => {
    const { error } = await supabase
      .from("user_approver_roles")
      .insert({ user_id: userId, role: role });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update user role",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "User role updated successfully",
    });

    fetchUsers();
  };

  const handleToggleUserStatus = async (userId: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from("profiles")
      .update({ is_disabled: !currentStatus })
      .eq("id", userId);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update user status",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: `User ${currentStatus ? "enabled" : "disabled"} successfully`,
    });

    fetchUsers();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">User Management</h1>
        <AddUserDialog onUserAdded={fetchUsers} />
      </div>
      <UserManagementTabs
        users={users}
        onRoleChange={handleRoleChange}
        onToggleStatus={handleToggleUserStatus}
      />
    </div>
  );
};