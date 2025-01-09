import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { UserRolesTable } from "@/components/admin/UserRolesTable";
import { ApproverRole, UserRole } from "@/types/approver";

export const AdminRoles = () => {
  const [users, setUsers] = useState<UserRole[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);

    try {
      const { data: profiles, error: profilesError } = await supabase
        .from("profiles")
        .select("*");

      if (profilesError) throw profilesError;

      const { data: roles, error: rolesError } = await supabase
        .from("user_approver_roles")
        .select("*");

      if (rolesError) throw rolesError;

      const userRoles = profiles?.map((profile) => ({
        id: profile.id,
        email: profile.email,
        first_name: profile.first_name,
        last_name: profile.last_name,
        is_disabled: profile.is_disabled || false,
        roles:
          roles
            ?.filter((role) => role.user_id === profile.id)
            .map((role) => role.role as ApproverRole) || [],
      })) || [];

      setUsers(userRoles);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch users",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId: string, role: ApproverRole) => {
    const userWithRole = users.find(user => user.id === userId);
    if (userWithRole?.roles.includes(role)) {
      toast({
        title: "Role already assigned",
        description: "This user already has this role assigned.",
        variant: "destructive",
      });
      return;
    }

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

  const handleRoleRemove = async (userId: string, role: ApproverRole) => {
    const { error } = await supabase
      .from("user_approver_roles")
      .delete()
      .eq("user_id", userId)
      .eq("role", role);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to remove user role",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "User role removed successfully",
    });

    fetchUsers();
  };

  const handleUserDisable = async (userId: string, disabled: boolean) => {
    const { error } = await supabase
      .from("profiles")
      .update({ is_disabled: disabled })
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
      description: `User ${disabled ? "disabled" : "enabled"} successfully`,
    });

    fetchUsers();
  };

  const handleUserUpdate = async (userId: string, data: { first_name?: string; last_name?: string }) => {
    const { error } = await supabase
      .from("profiles")
      .update(data)
      .eq("id", userId);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update user details",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "User details updated successfully",
    });

    fetchUsers();
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-8">User Role Management</h1>
      <UserRolesTable 
        users={users}
        loading={loading}
        onRoleChange={handleRoleChange}
        onRoleRemove={handleRoleRemove}
        onUserDisable={handleUserDisable}
        onUserUpdate={handleUserUpdate}
      />
    </div>
  );
};