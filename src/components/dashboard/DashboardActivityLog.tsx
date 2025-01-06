import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ActivityLogTable } from "./ActivityLogTable";
import { useToast } from "@/hooks/use-toast";

export const DashboardActivityLog = () => {
  const { toast } = useToast();
  
  const { data: activityLogs = [], isLoading, error } = useQuery({
    queryKey: ['activityLogs'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('exception_request_audit_logs')
          .select(`
            id,
            action,
            changes,
            created_at,
            profiles (
              email
            )
          `)
          .order('created_at', { ascending: false })
          .limit(10);

        if (error) throw error;
        return data || [];
      } catch (err) {
        console.error('Error fetching activity logs:', err);
        toast({
          title: "Error",
          description: "Failed to load activity logs",
          variant: "destructive",
        });
        throw err;
      }
    },
  });

  if (isLoading) {
    return <div>Loading activity logs...</div>;
  }

  if (error) {
    return <div>Error loading activity logs</div>;
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
      <ActivityLogTable logs={activityLogs} />
    </div>
  );
};