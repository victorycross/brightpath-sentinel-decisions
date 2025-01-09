import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";

type ApproverRole = Database["public"]["Enums"]["approver_role"];

export const useApproverRoles = (userId: string | null) => {
  return useQuery({
    queryKey: ['approverRoles', userId],
    queryFn: async () => {
      if (!userId) return [];

      const { data, error } = await supabase
        .from('user_approver_roles')
        .select('role')
        .eq('user_id', userId)
        .returns<{ role: ApproverRole }[]>();

      if (error) {
        console.error('Error fetching approver roles:', error);
        throw error;
      }
      return data.map(r => r.role);
    },
    enabled: !!userId,
  });
};