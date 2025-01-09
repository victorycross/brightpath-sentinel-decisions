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
import { Switch } from "@/components/ui/switch";
import { UserRoleSelect } from "./UserRoleSelect";
import { ApproverRole, UserRole } from "@/types/approver";
import { Trash2, Edit2 } from "lucide-react";
import { UserEditDialog } from "./UserEditDialog";
import { useState } from "react";

interface UserRolesTableProps {
  users: UserRole[];
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
  onRoleChange, 
  onRoleRemove,
  onUserDisable,
  onUserUpdate,
}: UserRolesTableProps) => {
  const [editingUser, setEditingUser] = useState<UserRole | null>(null);

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="w-[200px]">User Email</TableHead>
            <TableHead className="w-[200px]">Name</TableHead>
            <TableHead>Current Roles</TableHead>
            <TableHead className="w-[100px]">Status</TableHead>
            <TableHead className="w-[260px]">Add Role</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.email}</TableCell>
              <TableCell>
                {user.first_name} {user.last_name}
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-2">
                  {user.roles.map((role) => (
                    <div key={role} className="flex items-center gap-1">
                      <Badge 
                        variant="secondary"
                        className="text-xs py-1"
                      >
                        {roleLabels[role]}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => onRoleRemove(user.id, role)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <Switch
                  checked={!user.is_disabled}
                  onCheckedChange={(checked) => onUserDisable(user.id, !checked)}
                />
              </TableCell>
              <TableCell>
                <UserRoleSelect 
                  onRoleChange={(role) => onRoleChange(user.id, role)} 
                />
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setEditingUser(user)}
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
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