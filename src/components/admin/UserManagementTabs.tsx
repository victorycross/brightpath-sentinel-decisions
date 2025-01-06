import { UserRole } from "@/types/approver";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserRolesTable } from "@/components/admin/UserRolesTable";

interface UserManagementTabsProps {
  users: UserRole[];
  onRoleChange: (userId: string, role: string) => Promise<void>;
  onToggleStatus: (userId: string, currentStatus: boolean) => Promise<void>;
}

export const UserManagementTabs = ({
  users,
  onRoleChange,
  onToggleStatus,
}: UserManagementTabsProps) => {
  return (
    <Tabs defaultValue="active" className="w-full">
      <TabsList>
        <TabsTrigger value="active">Active Users</TabsTrigger>
        <TabsTrigger value="disabled">Disabled Users</TabsTrigger>
      </TabsList>
      <TabsContent value="active">
        <UserRolesTable
          users={users.filter(user => !user.isDisabled)}
          onRoleChange={onRoleChange}
          onToggleStatus={onToggleStatus}
        />
      </TabsContent>
      <TabsContent value="disabled">
        <UserRolesTable
          users={users.filter(user => user.isDisabled)}
          onRoleChange={onRoleChange}
          onToggleStatus={onToggleStatus}
        />
      </TabsContent>
    </Tabs>
  );
};