import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface RequestStatusActionsProps {
  requestId: string;
  onClose: () => void;
}

export const useRequestStatusActions = ({ requestId, onClose }: RequestStatusActionsProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleApprove = async () => {
    try {
      const { error } = await supabase
        .from('exception_requests')
        .update({ status: 'approved' })
        .eq('id', requestId);

      if (error) throw error;

      await queryClient.invalidateQueries({ queryKey: ['pendingRequests'] });
      await queryClient.invalidateQueries({ queryKey: ['exception-stats'] });
      
      toast({
        title: "Request Approved",
        description: "The exception request has been approved successfully.",
      });
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

      await queryClient.invalidateQueries({ queryKey: ['pendingRequests'] });
      await queryClient.invalidateQueries({ queryKey: ['exception-stats'] });
      
      toast({
        title: "Request Rejected",
        description: "The exception request has been rejected.",
      });
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

  return {
    handleApprove,
    handleReject,
  };
};