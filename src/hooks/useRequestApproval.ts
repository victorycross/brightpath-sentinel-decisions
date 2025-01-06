import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useRequestApproval = (requestId: string, onClose: () => void) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleApprove = async () => {
    try {
      const { error } = await supabase
        .from('exception_requests')
        .update({ status: 'approved' })
        .eq('id', requestId);

      if (error) throw error;

      toast({
        title: "Request Approved",
        description: "The exception request has been approved successfully.",
      });

      queryClient.invalidateQueries({ queryKey: ['pendingRequests'] });
      queryClient.invalidateQueries({ queryKey: ['requests'] });
      
      onClose();
    } catch (error) {
      console.error('Error approving request:', error);
      toast({
        title: "Error",
        description: "Failed to approve the request. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleReject = async () => {
    try {
      const { error } = await supabase
        .from('exception_requests')
        .update({ status: 'rejected' })
        .eq('id', requestId);

      if (error) throw error;

      toast({
        title: "Request Rejected",
        description: "The exception request has been rejected.",
        variant: "destructive",
      });

      queryClient.invalidateQueries({ queryKey: ['pendingRequests'] });
      queryClient.invalidateQueries({ queryKey: ['requests'] });
      
      onClose();
    } catch (error) {
      console.error('Error rejecting request:', error);
      toast({
        title: "Error",
        description: "Failed to reject the request. Please try again.",
        variant: "destructive",
      });
    }
  };

  return { handleApprove, handleReject };
};