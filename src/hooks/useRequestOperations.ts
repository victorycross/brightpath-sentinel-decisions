import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";

export const useRequestOperations = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('exception_requests')
        .delete()
        .eq('id', id);

      if (error) throw error;

      // Invalidate both queries to refresh the lists
      queryClient.invalidateQueries({ queryKey: ['requests'] });
      queryClient.invalidateQueries({ queryKey: ['userRequests'] });

      toast({
        title: "Success",
        description: "Request deleted successfully",
      });
      
      return true;
    } catch (err) {
      console.error('Error deleting request:', err);
      toast({
        title: "Error",
        description: "Failed to delete request",
        variant: "destructive",
      });
      return false;
    }
  };

  const fetchRequestDetails = async (id: string) => {
    try {
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
          submitted_by,
          updated_at,
          profiles (
            email
          )
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      console.error('Error fetching request details:', err);
      toast({
        title: "Error",
        description: "Failed to load request details",
        variant: "destructive",
      });
      return null;
    }
  };

  return {
    handleDelete,
    fetchRequestDetails,
  };
};