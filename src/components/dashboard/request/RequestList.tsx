import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ExceptionRequest } from "@/types/request";
import { RequestCard } from "./RequestCard";
import { LoadingState } from "../LoadingState";
import { EmptyState } from "../EmptyState";

export const RequestList = () => {
  const { toast } = useToast();

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
          submitted_at,
          profiles (
            email
          )
        `)
        .order('submitted_at', { ascending: false });

      if (error) {
        console.error('Error fetching requests:', error);
        throw error;
      }

      return data as ExceptionRequest[];
    },
  });

  const handleEdit = async (id: string) => {
    console.log(`[${new Date().toISOString()}] Request ${id} opened for editing`);
    toast({
      title: "Edit Mode",
      description: "You can now edit the request details.",
    });
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('exception_requests')
        .delete()
        .eq('id', id);

      if (error) throw error;

      console.log(`[${new Date().toISOString()}] Request ${id} deleted`);
      toast({
        title: "Request Deleted",
        description: "The exception request has been deleted.",
        variant: "destructive",
      });
    } catch (error) {
      console.error('Error deleting request:', error);
      toast({
        title: "Error",
        description: "Failed to delete the request.",
        variant: "destructive",
      });
    }
  };

  const handleView = async (id: string) => {
    console.log(`[${new Date().toISOString()}] Viewing request ${id}`);
  };

  if (isLoading) return <LoadingState />;
  if (!requests.length) return <EmptyState />;

  return (
    <div className="space-y-4">
      {requests.map((request) => (
        <RequestCard
          key={request.id}
          request={request}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={handleView}
        />
      ))}
    </div>
  );
};