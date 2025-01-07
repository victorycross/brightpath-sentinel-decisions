import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { RequestList } from "./RequestList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Database } from "@/integrations/supabase/types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type RequestType = Database["public"]["Enums"]["request_type"];
type ApproverRole = Database["public"]["Enums"]["approver_role"];

const convertApproverRoleToRequestType = (role: ApproverRole): RequestType => {
  return role.replace('_approver', '') as RequestType;
};

export const ApproverDashboard = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/auth');
        return;
      }
      setUserId(user.id);
    };
    
    checkUser();
  }, [navigate]);

  const { data: approverRoles = [] } = useQuery({
    queryKey: ['approverRoles', userId],
    queryFn: async () => {
      if (!userId) return [];

      const { data, error } = await supabase
        .from('user_approver_roles')
        .select('role')
        .eq('user_id', userId);

      if (error) throw error;
      return data.map(r => r.role as ApproverRole);
    },
    enabled: !!userId,
  });

  const { data: pendingRequests = [], isLoading } = useQuery({
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

      if (error) throw error;
      return data || [];
    },
    enabled: approverRoles.length > 0,
  });

  if (!userId) {
    return null;
  }

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
            loading={isLoading}
            showAuditLog={true}
          />
        </TabsContent>
        
        <TabsContent value="approved">
          <RequestList
            requests={[]}
            loading={false}
            showAuditLog={true}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};