import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FormContainer } from "../form/FormContainer";
import { Badge } from "@/components/ui/badge";
import { Edit2, Trash2 } from "lucide-react";

interface ExceptionRequestViewProps {
  data: {
    title: string;
    type: string;
    status: string;
    request: string;
    reason: string;
    impact: string;
    mitigating_factors: string;
    residual_risk: string;
    submitted_at: string;
    profiles: {
      email: string;
    } | null;
  };
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export const ExceptionRequestView = ({ 
  data, 
  onClose, 
  onEdit, 
  onDelete 
}: ExceptionRequestViewProps) => {
  return (
    <FormContainer
      title={data.title}
      onClose={onClose}
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Badge variant="outline" className="capitalize">
            {data.type}
          </Badge>
          <Badge className={
            data.status === "approved" 
              ? "bg-success text-success-foreground" 
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
              <TableCell>{data.request}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Reason</TableCell>
              <TableCell>{data.reason}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Impact</TableCell>
              <TableCell>{data.impact}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Mitigating Factors</TableCell>
              <TableCell>{data.mitigating_factors}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Residual Risk</TableCell>
              <TableCell className="capitalize">{data.residual_risk}</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
          <Button
            variant="outline"
            onClick={onClose}
            className="hover:bg-gray-50"
          >
            Close
          </Button>
          <Button
            variant="outline"
            onClick={onEdit}
            className="gap-2"
          >
            <Edit2 className="h-4 w-4" />
            Edit
          </Button>
          <Button
            variant="destructive"
            onClick={onDelete}
            className="gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>
    </FormContainer>
  );
};