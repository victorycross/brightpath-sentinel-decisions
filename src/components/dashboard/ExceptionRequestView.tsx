import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { FormContainer } from "../form/FormContainer";
import { Badge } from "@/components/ui/badge";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";
import { RequestViewActions } from "./RequestViewActions";
import { useToast } from "@/hooks/use-toast";

type RequestType = Database["public"]["Enums"]["request_type"];
type ApproverRole = Database["public"]["Enums"]["approver_role"];

interface ExceptionRequestViewProps {
  data: {
    id: string;
    title: string;
    type: RequestType;
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
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: userRoles = [] } = useQuery({
    queryKey: ['userApproverRoles'],
    queryFn: async () => {
      const { data: roles } = await supabase
        .from('user_approver_roles')
        .select('role')
        .eq('user_id', (await supabase.auth.getUser()).data.user?.id);
      return (roles?.map(r => r.role) || []) as ApproverRole[];
    },
  });

  const isApprover = userRoles.includes(`${data.type}_approver` as ApproverRole);
  const canApprove = isApprover && ['pending', 'assigned'].includes(data.status);

  const handleApprove = async () => {
    try {
      const { error } = await supabase
        .from('exception_requests')
        .update({ status: 'approved' })
        .eq('id', data.id);

      if (error) throw error;

      await queryClient.invalidateQueries({ queryKey: ['pendingRequests'] });
      toast({
        title: "Request Approved",
        description: "The exception request has been approved successfully.",
      });
      onClose();
    } catch (error) {
      console.error('Error approving request:', error);
      toast({
        title: "Error",
        description: "Failed to approve the request. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleReject = async () => {
    try {
      const { error } = await supabase
        .from('exception_requests')
        .update({ status: 'rejected' })
        .eq('id', data.id);

      if (error) throw error;

      await queryClient.invalidateQueries({ queryKey: ['pendingRequests'] });
      toast({
        title: "Request Rejected",
        description: "The exception request has been rejected.",
      });
      onClose();
    } catch (error) {
      console.error('Error rejecting request:', error);
      toast({
        title: "Error",
        description: "Failed to reject the request. Please try again.",
        variant: "destructive",
      });
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

        <RequestViewActions
          canApprove={canApprove}
          onClose={onClose}
          onEdit={onEdit}
          onDelete={onDelete}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      </div>
    </FormContainer>
  );
};