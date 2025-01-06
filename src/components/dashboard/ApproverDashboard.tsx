import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { RequestList } from "./RequestList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const ApproverDashboard = () => {
  const { data: approverRoles = [] } = useQuery({
    queryKey: ['approverRoles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_approver_roles')
        .select('role')
        .eq('user_id', (await supabase.auth.getUser()).data.user?.id);

      if (error) throw error;
      return data.map(r => r.role);
    },
  });

  const { data: pendingRequests = [], isLoading: pendingLoading } = useQuery({
    queryKey: ['pendingRequests', approverRoles],
    queryFn: async () => {
      if (!approverRoles.length) return [];

      const types = approverRoles.map(role => role.replace('_approver', ''));
      
      const { data, error } = await supabase
        .from('exception_requests')
        .select(`
          id,
          title,
          type,
          status,
          request,
          reason,
          impact,
          mitigating_factors,
          residual_risk,
          submitted_at,
          profiles (
            email
          )
        `)
        .in('type', types)
        .in('status', ['pending', 'assigned'])
        .order('submitted_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },
    enabled: approverRoles.length > 0,
  });

  const { data: approvedRequests = [], isLoading: approvedLoading } = useQuery({
    queryKey: ['approvedRequests', approverRoles],
    queryFn: async () => {
      if (!approverRoles.length) return [];

      const types = approverRoles.map(role => role.replace('_approver', ''));
      
      const { data, error } = await supabase
        .from('exception_requests')
        .select(`
          id,
          title,
          type,
          status,
          request,
          reason,
          impact,
          mitigating_factors,
          residual_risk,
          submitted_at,
          profiles (
            email
          )
        `)
        .in('type', types)
        .eq('status', 'approved')
        .order('submitted_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },
    enabled: approverRoles.length > 0,
  });

  if (!approverRoles.length) {
    return (
      <div className="text-center py-8 text-gray-500">
        You don't have any approver roles assigned.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold tracking-tight">Approver Dashboard</h2>
      
      <Tabs defaultValue="pending">
        <TabsList>
          <TabsTrigger value="pending">Pending Approval</TabsTrigger>
          <TabsTrigger value="approved">Previously Approved</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending">
          <RequestList
            requests={pendingRequests}
            loading={pendingLoading}
            showAuditLog={true}
          />
        </TabsContent>
        
        <TabsContent value="approved">
          <RequestList
            requests={approvedRequests}
            loading={approvedLoading}
            showAuditLog={true}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};