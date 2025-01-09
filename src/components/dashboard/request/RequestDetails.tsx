import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface RequestDetailsProps {
  data: {
    type: string;
    status: string;
    request?: string;
    reason?: string;
    impact?: string;
    mitigating_factors?: string;
    residual_risk?: string;
    submitted_at: string;
    profiles: {
      email: string;
    } | null;
  };
}

export const RequestDetails = ({ data }: RequestDetailsProps) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Badge variant="outline" className="capitalize">
          {data.type}
        </Badge>
        <Badge className={
          data.status === "approved" 
            ? "bg-success text-success-foreground" 
            : data.status === "rejected"
            ? "bg-destructive text-destructive-foreground"
            : "bg-warning text-warning-foreground"
        }>
          {data.status === "in_process" ? "In Process" : data.status.charAt(0).toUpperCase() + data.status.slice(1)}
        </Badge>
      </div>

      <div className="text-sm text-gray-500">
        Submitted by {data.profiles?.email} on {new Date(data.submitted_at).toLocaleDateString()}
      </div>

      <Table>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium w-1/4">Request</TableCell>
            <TableCell>{data.request || 'N/A'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Reason</TableCell>
            <TableCell>{data.reason || 'N/A'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Impact</TableCell>
            <TableCell>{data.impact || 'N/A'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Mitigating Factors</TableCell>
            <TableCell>{data.mitigating_factors || 'N/A'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Residual Risk</TableCell>
            <TableCell className="capitalize">{data.residual_risk || 'N/A'}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};