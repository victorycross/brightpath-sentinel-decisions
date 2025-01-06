import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserRoleSelect } from "./UserRoleSelect";
import { ApproverRole, UserRole } from "@/types/approver";

interface UserRolesTableProps {
  users: UserRole[];
  onRoleChange: (userId: string, role: ApproverRole) => void;
  onToggleStatus: (userId: string, currentStatus: boolean) => void;
}

export const UserRolesTable = ({ users, onRoleChange, onToggleStatus }: UserRolesTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>User Email</TableHead>
          <TableHead>Current Roles</TableHead>
          <TableHead>Add Role</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              <div className="flex flex-wrap gap-2">
                {user.roles.map((role, index) => (
                  <Badge key={index} variant="secondary">
                    {role.replace("_", " ")}
                  </Badge>
                ))}
              </div>
            </TableCell>
            <TableCell>
              <UserRoleSelect 
                onRoleChange={(role) => onRoleChange(user.id, role)} 
              />
            </TableCell>
            <TableCell>
              <Button
                variant="outline"
                onClick={() => onToggleStatus(user.id, user.isDisabled)}
              >
                {user.isDisabled ? "Enable" : "Disable"}
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};