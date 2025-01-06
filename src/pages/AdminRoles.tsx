import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { UserRolesTable } from "@/components/admin/UserRolesTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ApproverRole, UserRole } from "@/types/approver";

export const AdminRoles = () => {
  const [users, setUsers] = useState<UserRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [newUserEmail, setNewUserEmail] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);

    const { data: profiles, error: profilesError } = await supabase
      .from("profiles")
      .select("*");

    if (profilesError) {
      toast({
        title: "Error",
        description: "Failed to fetch users",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    const { data: roles, error: rolesError } = await supabase
      .from("user_approver_roles")
      .select("*");

    if (rolesError) {
      toast({
        title: "Error",
        description: "Failed to fetch user roles",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    const userRoles = profiles?.map((profile) => ({
      id: profile.id,
      email: profile.email,
      roles: roles
        ?.filter((role) => role.user_id === profile.id)
        .map((role) => role.role as ApproverRole) || [],
      isDisabled: profile.is_disabled,
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

  const handleAddUser = async () => {
    if (!newUserEmail) {
      toast({
        title: "Error",
        description: "Please enter an email address",
        variant: "destructive",
      });
      return;
    }

    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const response = await fetch(
        `${supabase.supabaseUrl}/functions/v1/create-user`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionData.session?.access_token}`,
          },
          body: JSON.stringify({ email: newUserEmail }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to create user');
      }

      toast({
        title: "Success",
        description: "User added successfully. A temporary password has been set.",
      });

      setNewUserEmail("");
      fetchUsers();
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleToggleUserStatus = async (userId: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from("profiles")
      .update({ is_disabled: !currentStatus })
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
      description: `User ${currentStatus ? "enabled" : "disabled"} successfully`,
    });

    fetchUsers();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">User Management</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add New User</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  placeholder="user@example.com"
                />
              </div>
              <Button onClick={handleAddUser}>Add User</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <Tabs defaultValue="active" className="w-full">
        <TabsList>
          <TabsTrigger value="active">Active Users</TabsTrigger>
          <TabsTrigger value="disabled">Disabled Users</TabsTrigger>
        </TabsList>
        <TabsContent value="active">
          <UserRolesTable
            users={users.filter(user => !user.isDisabled)}
            onRoleChange={handleRoleChange}
            onToggleStatus={handleToggleUserStatus}
          />
        </TabsContent>
        <TabsContent value="disabled">
          <UserRolesTable
            users={users.filter(user => user.isDisabled)}
            onRoleChange={handleRoleChange}
            onToggleStatus={handleToggleUserStatus}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
