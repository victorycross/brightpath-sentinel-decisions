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

interface AuditLogEntry {
  id: string;
  action: string;
  created_at: string;
  changes: any;
  profiles: {
    email: string;
  } | null;
}

interface ExceptionRequestAuditLogProps {
  logs: AuditLogEntry[];
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

export const ExceptionRequestAuditLog = ({ logs }: ExceptionRequestAuditLogProps) => {
  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Audit Log</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Changes</TableHead>
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
    </div>
  );
};