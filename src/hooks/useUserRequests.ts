import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ExceptionRequest } from "@/types/request";
import { useEffect, useState } from "react";

export const useUserRequests = () => {
  const { toast } = useToast();
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

  const { data: requests = [], isLoading: loading } = useQuery({
    queryKey: ['userRequests', userId],
    queryFn: async () => {
      if (!userId) return [];

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
        .eq('submitted_by', userId)
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
    enabled: !!userId, // Only run query when we have a userId
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