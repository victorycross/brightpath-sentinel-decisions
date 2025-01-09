import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";
import { RequestType } from "@/types/request";

type ApproverRole = Database["public"]["Enums"]["approver_role"];

const convertApproverRoleToRequestType = (role: ApproverRole): RequestType => {
  return role.replace('_approver', '') as RequestType;
};

export const usePendingRequests = (approverRoles: ApproverRole[]) => {
  return useQuery({
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
};