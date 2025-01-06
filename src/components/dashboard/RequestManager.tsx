import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { RequestList } from "./RequestList";

export const RequestManager = () => {
  const { data: requests = [], isLoading } = useQuery({
    queryKey: ['requests'],
    queryFn: async () => {
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
        .order('submitted_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },
  });

  return (
    <RequestList
      requests={requests}
      loading={isLoading}
      showAuditLog={true}
    />
  );
};