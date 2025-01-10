import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { FormContainer } from "../form/FormContainer";
import { Database } from "@/integrations/supabase/types";
import { RequestViewActions } from "./RequestViewActions";
import { RequestDetails } from "./request/RequestDetails";
import { Button } from "../ui/button";
import { Edit2 } from "lucide-react";
import { useRequestStatusActions } from "../../hooks/useRequestStatusActions";

type RequestType = Database["public"]["Enums"]["request_type"];
type ApproverRole = Database["public"]["Enums"]["approver_role"];

interface ExceptionRequestViewProps {
  data?: any;
  onClose?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  standalone?: boolean;
}

export const ExceptionRequestView = ({ 
  data: initialData, 
  onClose: propOnClose, 
  onEdit: propOnEdit, 
  onDelete: propOnDelete,
  standalone = false
}: ExceptionRequestViewProps) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: request, isLoading } = useQuery({
    queryKey: ['request', id],
    queryFn: async () => {
      if (initialData) return initialData;
      
      const { data, error } = await supabase
        .from('exception_requests')
        .select(`
          *,
          profiles (
            email
          )
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !initialData && !!id,
  });

  const { data: userRoles = [] } = useQuery({
    queryKey: ['userApproverRoles'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      const { data } = await supabase
        .from('user_approver_roles')
        .select('role')
        .eq('user_id', user?.id);
      return (data || []).map(r => r.role);
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!request && !initialData) {
    return <div>Request not found</div>;
  }

  const requestData = request || initialData;
  const isApprover = userRoles.includes(`${requestData.type}_approver` as ApproverRole);
  const canApprove = isApprover && ['pending', 'assigned'].includes(requestData.status);

  const handleClose = () => {
    if (propOnClose) {
      propOnClose();
    } else {
      navigate(-1);
    }
  };

  const handleEdit = () => {
    if (propOnEdit) {
      propOnEdit();
    } else {
      navigate(`/requests/${id}/edit`);
    }
  };

  const handleDelete = () => {
    if (propOnDelete) {
      propOnDelete();
    } else {
      // Implement standalone delete functionality
      navigate(-1);
    }
  };

  const { handleApprove, handleReject } = useRequestStatusActions({
    requestId: requestData.id,
    onClose: handleClose,
  });

  return (
    <FormContainer
      title={requestData.title}
      onClose={handleClose}
      actions={
        <Button
          variant="outline"
          size="sm"
          onClick={handleEdit}
          className="gap-2"
        >
          <Edit2 className="h-4 w-4" />
          Edit
        </Button>
      }
    >
      <RequestDetails data={requestData} />
      <RequestViewActions
        canApprove={canApprove}
        onClose={handleClose}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </FormContainer>
  );
};