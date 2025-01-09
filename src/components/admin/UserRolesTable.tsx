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
import { Trash2, Edit2, Shield } from "lucide-react";
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
    <div className="rounded-md border bg-white dark:bg-gray-900">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="w-[200px]">User Email</TableHead>
            <TableHead className="w-[200px]">Name</TableHead>
            <TableHead>Current Roles</TableHead>
            <TableHead className="w-[100px] text-center">Status</TableHead>
            <TableHead className="w-[260px]">Add Role</TableHead>
            <TableHead className="w-[80px] text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} className="group">
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
                        className="text-xs py-1.5 px-3 bg-secondary/20 text-secondary-foreground hover:bg-secondary/30 transition-colors group-hover:bg-secondary/25"
                      >
                        <Shield className="w-3 h-3 mr-1 opacity-70" />
                        {roleLabels[role]}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-5 w-5 ml-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => onRoleRemove(user.id, role)}
                        >
                          <Trash2 className="h-3 w-3 text-secondary hover:text-secondary-foreground" />
                        </Button>
                      </Badge>
                    </div>
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
              <TableCell className="text-center">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setEditingUser(user)}
                  className="hover:bg-muted"
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