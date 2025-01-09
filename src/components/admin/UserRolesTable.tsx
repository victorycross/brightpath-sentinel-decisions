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
};

export const UserRolesTable = ({ users, onRoleChange }: UserRolesTableProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="w-[300px]">User Email</TableHead>
            <TableHead>Current Roles</TableHead>
            <TableHead className="w-[260px]">Add Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.email}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-2">
                  {user.roles.map((role) => (
                    <Badge 
                      key={role} 
                      variant="secondary"
                      className="text-xs py-1"
                    >
                      {roleLabels[role]}
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
    </div>
  );
};