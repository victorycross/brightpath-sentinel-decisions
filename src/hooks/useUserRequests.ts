import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export type ExceptionRequest = {
  id: string;
  title: string;
  type: string;
  status: string;
  request?: string;
  reason?: string;
  impact?: string;
  mitigating_factors?: string;
  residual_risk?: string;
  submitted_at: string;
  profiles: {
    email: string;
  } | null;
};

export const useUserRequests = () => {
  const { toast } = useToast();

  const { data: requests = [], isLoading: loading } = useQuery({
    queryKey: ['userRequests'],
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
        .eq('submitted_by', (await supabase.auth.getUser()).data.user?.id)
        .order('submitted_at', { ascending: false });

      if (error) {
        toast({
          title: "Error",
          description: "Failed to fetch requests",
          variant: "destructive",
        });
        throw error;
      }

      return data || [];
    },
  });

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('exception_requests')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Request deleted successfully",
      });
    } catch (err) {
      console.error('Error deleting request:', err);
      toast({
        title: "Error",
        description: "Failed to delete request",
        variant: "destructive",
      });
    }
  };

  return { requests, loading, handleDelete };
};