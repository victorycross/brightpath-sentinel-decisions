import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { UserRoleSelect } from "./UserRoleSelect";

type ApproverRole = 
  | "cyber_approver"
  | "legal_approver"
  | "independence_approver"
  | "qmr_approver"
  | "clientAcceptance_approver"
  | "engagementRisk_approver"
  | "auditFinding_approver"
  | "data_approver"
  | "ai_approver";

type UserRole = {
  id: string;
  email: string | null;
  roles: ApproverRole[];
};

interface UserRolesTableProps {
  users: UserRole[];
  onRoleChange: (userId: string, role: ApproverRole) => void;
}

export const UserRolesTable = ({ users, onRoleChange }: UserRolesTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>User Email</TableHead>
          <TableHead>Current Roles</TableHead>
          <TableHead>Add Role</TableHead>
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
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};