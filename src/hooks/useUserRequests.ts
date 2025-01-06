import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export type ExceptionRequest = {
  id: string;
  title: string;
  type: string;
  status: string;
  submitted_at: string;
  profiles: {
    email: string;
  } | null;
};

export const useUserRequests = () => {
  const [requests, setRequests] = useState<ExceptionRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchUserRequests = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

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
          .eq('submitted_by', user.id)
          .order('submitted_at', { ascending: false });

        if (error) throw error;
        setRequests(data || []);
      } catch (err) {
        console.error('Error fetching user requests:', err);
        toast({
          title: "Error",
          description: "Failed to load your requests",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserRequests();
  }, [toast]);

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('exception_requests')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setRequests(requests.filter(request => request.id !== id));
      toast({
        title: "Request Deleted",
        description: "Your exception request has been deleted.",
      });
    } catch (err) {
      console.error('Error deleting request:', err);
      toast({
        title: "Error",
        description: "Failed to delete the request",
        variant: "destructive",
      });
    }
  };

  return {
    requests,
    loading,
    handleDelete,
  };
};