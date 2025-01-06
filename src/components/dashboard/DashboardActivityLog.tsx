import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ActivityLogEntry {
  id: string;
  action: string;
  created_at: string;
  changes: any;
  profiles: {
    email: string;
  } | null;
}

const getActionColor = (action: string) => {
  switch (action) {
    case "created":
      return "bg-success text-success-foreground";
    case "updated":
      return "bg-warning text-warning-foreground";
    case "deleted":
      return "bg-destructive text-destructive-foreground";
    case "status_changed":
      return "bg-info text-info-foreground";
    default:
      return "bg-secondary text-secondary-foreground";
  }
};

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
      <div className="border rounded-lg">
        <ScrollArea className="h-[300px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>
                    {format(new Date(log.created_at), "MMM d, yyyy HH:mm")}
                  </TableCell>
                  <TableCell>{log.profiles?.email || "Unknown"}</TableCell>
                  <TableCell>
                    <Badge className={getActionColor(log.action)}>
                      {log.action.replace("_", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-md">
                    {log.action === "status_changed" ? (
                      <span>
                        Status changed from{" "}
                        <Badge variant="outline">{log.changes.old_status}</Badge> to{" "}
                        <Badge variant="outline">{log.changes.new_status}</Badge>
                      </span>
                    ) : (
                      <span className="text-sm text-gray-600">
                        {log.action === "created"
                          ? "Request created"
                          : log.action === "deleted"
                          ? "Request deleted"
                          : "Request details updated"}
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
    </div>
  );
};