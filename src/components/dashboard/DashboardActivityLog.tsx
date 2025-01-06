import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ActivityLogTable } from "./ActivityLogTable";

export const DashboardActivityLog = () => {
  const { data: activityLogs = [], isLoading, error } = useQuery({
    queryKey: ['activityLogs'],
    queryFn: async () => {
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

      if (error) {
        console.error('Error fetching activity logs:', error);
        throw error;
      }

      return data || [];
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