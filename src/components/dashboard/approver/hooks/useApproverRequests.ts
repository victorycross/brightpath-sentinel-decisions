import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { RequestType } from "@/types/request";
import { ApproverRole } from "@/types/approver";

const convertApproverRoleToRequestType = (role: ApproverRole): RequestType | null => {
  if (role === 'cro_approver') return null;
  return role.replace('_approver', '') as RequestType;
};

export const useApproverRequests = (approverRoles: ApproverRole[], status: 'pending' | 'approved') => {
  return useQuery({
    queryKey: ['approverRequests', approverRoles, status],
    queryFn: async () => {
      if (!approverRoles.length) return [];

      const types = approverRoles
        .map(convertApproverRoleToRequestType)
        .filter((type): type is RequestType => type !== null);
      
      const query = supabase
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
        .eq('status', status === 'pending' ? 'pending' : 'approved')
        .order('submitted_at', { ascending: false });

      if (types.length > 0) {
        query.in('type', types);
      }

      const { data, error } = await query;

      if (error) {
        console.error(`Error fetching ${status} requests:`, error);
        throw error;
      }
      return data || [];
    },
    enabled: approverRoles.length > 0,
  });
};