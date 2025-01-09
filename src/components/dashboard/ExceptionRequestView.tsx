import { FormContainer } from "../form/FormContainer";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";
import { RequestViewActions } from "./RequestViewActions";
import { RequestDetails } from "./request/RequestDetails";
import { useRequestStatusActions } from "./request/RequestStatusActions";

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

  const { handleApprove, handleReject } = useRequestStatusActions({
    requestId: data.id,
    onClose,
  });

  return (
    <FormContainer
      title={data.title}
      onClose={onClose}
    >
      <RequestDetails data={data} />
      <RequestViewActions
        canApprove={canApprove}
        onClose={onClose}
        onEdit={onEdit}
        onDelete={onDelete}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </FormContainer>
  );
};