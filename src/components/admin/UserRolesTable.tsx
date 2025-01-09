import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ApproverRole, UserRole } from "@/types/approver";
import { UserNameDisplay } from "./UserNameDisplay";
import { UserTableLoadingState } from "./UserTableLoadingState";
import { UserStatus } from "./UserStatus";
import { UserEditPopup } from "./UserEditPopup";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit2 } from "lucide-react";

interface UserRolesTableProps {
  users: UserRole[];
  loading?: boolean;
  onRoleChange: (userId: string, role: ApproverRole) => void;
  onRoleRemove: (userId: string, role: ApproverRole) => void;
  onUserDisable: (userId: string, disabled: boolean) => void;
  onUserUpdate: (userId: string, data: { first_name?: string; last_name?: string }) => void;
}

export const UserRolesTable = ({ 
  users, 
  loading = false,
  onRoleChange, 
  onRoleRemove,
  onUserDisable,
  onUserUpdate,
}: UserRolesTableProps) => {
  const [editingUser, setEditingUser] = useState<UserRole | null>(null);

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
            <TableHead className="w-[100px] text-center font-semibold text-primary/90">Status</TableHead>
            <TableHead className="w-[100px] text-center font-semibold text-primary/90">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} className="group hover:bg-muted/50">
              <TableCell className="font-medium">
                <Button
                  variant="link"
                  className="p-0 h-auto font-medium"
                  onClick={() => setEditingUser(user)}
                >
                  {user.email}
                </Button>
              </TableCell>
              <TableCell>
                <UserNameDisplay firstName={user.first_name} lastName={user.last_name} />
              </TableCell>
              <TableCell className="text-center">
                <UserStatus
                  isEnabled={!user.is_disabled}
                  onStatusChange={(checked) => onUserDisable(user.id, !checked)}
                />
              </TableCell>
              <TableCell className="text-center">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setEditingUser(user)}
                  className="hover:bg-primary/10"
                >
                  <Edit2 className="h-4 w-4 text-primary/70" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <UserEditPopup
        user={editingUser}
        open={!!editingUser}
        onClose={() => setEditingUser(null)}
        onUpdate={(data) => {
          if (editingUser) {
            onUserUpdate(editingUser.id, data);
            setEditingUser(null);
          }
        }}
        onRoleAdd={(role) => {
          if (editingUser) {
            onRoleChange(editingUser.id, role);
          }
        }}
        onRoleRemove={(role) => {
          if (editingUser) {
            onRoleRemove(editingUser.id, role);
          }
        }}
      />
    </div>
  );
};