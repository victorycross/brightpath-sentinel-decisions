import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

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

export const AdminRoles = () => {
  const [users, setUsers] = useState<UserRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAdminStatus();
    fetchUsers();
  }, []);

  const checkAdminStatus = async () => {
    const { data: roles } = await supabase
      .from("user_approver_roles")
      .select("role")
      .eq("user_id", (await supabase.auth.getUser()).data.user?.id);

    const isCyberApprover = roles?.some(
      (role) => role.role === "cyber_approver"
    );
    setIsAdmin(isCyberApprover);

    if (!isCyberApprover) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access this page.",
        variant: "destructive",
      });
      navigate("/");
    }
  };

  const fetchUsers = async () => {
    const { data: profiles } = await supabase.from("profiles").select("*");
    const { data: roles } = await supabase.from("user_approver_roles").select("*");

    const userRoles = profiles?.map((profile) => ({
      id: profile.id,
      email: profile.email,
      roles:
        roles
          ?.filter((role) => role.user_id === profile.id)
          .map((role) => role.role as ApproverRole) || [],
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
        description: "Failed to update user role.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "User role updated successfully.",
      });
      fetchUsers();
    }
  };

  if (!isAdmin) return null;

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">User Role Management</h1>
        <Button variant="outline" onClick={() => navigate("/")}>
          Back to Home
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Current Roles</TableHead>
              <TableHead>Add Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {user.roles.length > 0
                    ? user.roles.join(", ")
                    : "No roles assigned"}
                </TableCell>
                <TableCell>
                  <Select
                    onValueChange={(value: ApproverRole) => handleRoleChange(user.id, value)}
                  >
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cyber_approver">
                        Cyber Approver
                      </SelectItem>
                      <SelectItem value="legal_approver">
                        Legal Approver
                      </SelectItem>
                      <SelectItem value="independence_approver">
                        Independence Approver
                      </SelectItem>
                      <SelectItem value="qmr_approver">QMR Approver</SelectItem>
                      <SelectItem value="clientAcceptance_approver">
                        Client Acceptance Approver
                      </SelectItem>
                      <SelectItem value="engagementRisk_approver">
                        Engagement Risk Approver
                      </SelectItem>
                      <SelectItem value="auditFinding_approver">
                        Audit Finding Approver
                      </SelectItem>
                      <SelectItem value="data_approver">
                        Data Approver
                      </SelectItem>
                      <SelectItem value="ai_approver">AI Approver</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default AdminRoles;