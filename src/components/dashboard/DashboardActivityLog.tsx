import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ActivityLogTable } from "./ActivityLogTable";

interface ActivityLogEntry {
  id: string;
  action: string;
  created_at: string;
  changes: any;
  profiles: {
    email: string;
  } | null;
}

export const DashboardActivityLog = () => {
  const [logs, setLogs] = useState<ActivityLogEntry[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchActivityLogs = async () => {
      try {
        const { data, error } = await supabase
          .from('exception_request_audit_logs')
          .select(`
            id,
            action,
            created_at,
            changes,
            profiles (
              email
            )
          `)
          .order('created_at', { ascending: false })
          .limit(10);

        if (error) throw error;
        setLogs(data || []);
      } catch (err) {
        console.error('Error fetching activity logs:', err);
        toast({
          title: "Error",
          description: "Failed to load activity logs",
          variant: "destructive",
        });
      }
    };

    fetchActivityLogs();

    // Set up real-time subscription
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'exception_request_audit_logs'
        },
        () => {
          fetchActivityLogs();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [toast]);

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
      <ActivityLogTable logs={logs} />
    </div>
  );
};