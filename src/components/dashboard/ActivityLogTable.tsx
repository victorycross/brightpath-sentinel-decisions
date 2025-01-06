import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ActivityLogEntry } from "./ActivityLogEntry";

interface ActivityLogTableProps {
  logs: Array<{
    id: string;
    action: string;
    created_at: string;
    changes: any;
    profiles: {
      email: string;
    } | null;
  }>;
}

export const ActivityLogTable = ({ logs }: ActivityLogTableProps) => {
  return (
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
              <ActivityLogEntry key={log.id} log={log} />
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
};