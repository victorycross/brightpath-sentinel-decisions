import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";
import { FormContainer } from "../form/FormContainer";
import { Badge } from "@/components/ui/badge";
import { RequestDetailsTable } from "./RequestDetailsTable";
import { RequestActionButtons } from "./RequestActionButtons";
import { useRequestApproval } from "@/hooks/useRequestApproval";

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
  const { handleApprove, handleReject } = useRequestApproval(data.id, onClose);

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

        <RequestDetailsTable
          request={data.request || ''}
          reason={data.reason || ''}
          impact={data.impact || ''}
          mitigatingFactors={data.mitigating_factors || ''}
          residualRisk={data.residual_risk || ''}
        />

        <RequestActionButtons
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