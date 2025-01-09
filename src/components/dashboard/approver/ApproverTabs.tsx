import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RequestList } from "../RequestList";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";
import { RequestType } from "@/types/request";

type ApproverRole = Database["public"]["Enums"]["approver_role"];

interface ApproverTabsProps {
  approverRoles: ApproverRole[];
}

const convertApproverRoleToRequestType = (role: ApproverRole): RequestType => {
  return role.replace('_approver', '') as RequestType;
};

export const ApproverTabs = ({ approverRoles }: ApproverTabsProps) => {
  const { data: pendingRequests = [], isLoading: pendingLoading } = useQuery({
    queryKey: ['pendingRequests', approverRoles],
    queryFn: async () => {
      if (!approverRoles.length) return [];

      const types = approverRoles.map(convertApproverRoleToRequestType);
      
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

      if (error) {
        console.error('Error fetching pending requests:', error);
        throw error;
      }
      return data || [];
    },
    enabled: approverRoles.length > 0,
  });

  const { data: approvedRequests = [], isLoading: approvedLoading } = useQuery({
    queryKey: ['approvedRequests', approverRoles],
    queryFn: async () => {
      if (!approverRoles.length) return [];

      const types = approverRoles.map(convertApproverRoleToRequestType);
      
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

      if (error) {
        console.error('Error fetching approved requests:', error);
        throw error;
      }
      return data || [];
    },
    enabled: approverRoles.length > 0,
  });

  return (
    <Tabs defaultValue="pending" className="space-y-4">
      <TabsList>
        <TabsTrigger value="pending">
          Pending Approval ({pendingRequests.length})
        </TabsTrigger>
        <TabsTrigger value="approved">
          Previously Approved ({approvedRequests.length})
        </TabsTrigger>
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
  );
};