import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { RequestList } from "./RequestList";
import { useEffect, useState } from "react";

interface RequestManagerProps {
  personalOnly?: boolean;
}

export const RequestManager = ({ personalOnly = false }: RequestManagerProps) => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUserId(user?.id || null);
    };
    
    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUserId(session?.user.id || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ['requests', personalOnly, userId],
    queryFn: async () => {
      let query = supabase
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

      if (personalOnly && userId) {
        query = query.eq('submitted_by', userId);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data || [];
    },
    enabled: !personalOnly || !!userId,
  });

  return (
    <RequestList
      requests={requests}
      loading={isLoading}
      showAuditLog={true}
    />
  );
};