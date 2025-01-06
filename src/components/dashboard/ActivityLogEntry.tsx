import { format } from "date-fns";
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface ActivityLogEntryProps {
  log: {
    id: string;
    action: string;
    created_at: string;
    changes: any;
    profiles: {
      email: string;
    } | null;
  };
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

export const ActivityLogEntry = ({ log }: ActivityLogEntryProps) => {
  return (
    <TableRow>
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
  );
};