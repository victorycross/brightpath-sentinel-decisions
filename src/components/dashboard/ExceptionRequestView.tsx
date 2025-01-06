import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FormContainer } from "../form/FormContainer";
import { Badge } from "@/components/ui/badge";
import { Edit2, Trash2, Check, X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface ExceptionRequestViewProps {
  data: {
    title: string;
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
  const { data: userRoles = [] } = useQuery({
    queryKey: ['userApproverRoles'],
    queryFn: async () => {
      const { data: roles } = await supabase
        .from('user_approver_roles')
        .select('role')
        .eq('user_id', (await supabase.auth.getUser()).data.user?.id);
      return roles?.map(r => r.role) || [];
    },
  });

  const isApprover = userRoles.includes(`${data.type}_approver`);
  const canApprove = isApprover && ['pending', 'assigned'].includes(data.status);

  const handleApprove = async () => {
    const { error } = await supabase
      .from('exception_requests')
      .update({ status: 'approved' })
      .eq('id', data.id);

    if (error) {
      console.error('Error approving request:', error);
      return;
    }
  };

  const handleReject = async () => {
    const { error } = await supabase
      .from('exception_requests')
      .update({ status: 'rejected' })
      .eq('id', data.id);

    if (error) {
      console.error('Error rejecting request:', error);
      return;
    }
  };

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

        <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
          <Button
            variant="outline"
            onClick={onClose}
            className="hover:bg-gray-50"
          >
            Close
          </Button>
          {canApprove && (
            <>
              <Button
                variant="outline"
                onClick={handleReject}
                className="gap-2 bg-destructive/10 hover:bg-destructive/20 text-destructive"
              >
                <X className="h-4 w-4" />
                Reject
              </Button>
              <Button
                onClick={handleApprove}
                className="gap-2 bg-success hover:bg-success/90"
              >
                <Check className="h-4 w-4" />
                Approve
              </Button>
            </>
          )}
          {!canApprove && (
            <>
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
            </>
          )}
        </div>
      </div>
    </FormContainer>
  );
};