import { useEffect } from "react";
import { UserRolesTable } from "@/components/admin/UserRolesTable";
import { useAdminAccess } from "@/components/admin/useAdminAccess";
import { useUserManagement } from "@/components/admin/useUserManagement";

export const AdminRoles = () => {
  const { 
    users, 
    loading, 
    fetchUsers,
    handleRoleChange,
    handleRoleRemove,
    handleUserDisable,
    handleUserUpdate,
  } = useUserManagement();

  useAdminAccess();

  useEffect(() => {
    fetchUsers();
  }, []);

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