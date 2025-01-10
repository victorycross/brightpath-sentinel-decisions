import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { FormContainer } from "../form/FormContainer";
import { Database } from "@/integrations/supabase/types";
import { RequestViewActions } from "./RequestViewActions";
import { RequestDetails } from "./request/RequestDetails";
import { useRequestStatusActions } from "./request/RequestStatusActions";
import { Button } from "../ui/button";
import { Edit2 } from "lucide-react";

type RequestType = Database["public"]["Enums"]["request_type"];
type ApproverRole = Database["public"]["Enums"]["approver_role"];

export const ExceptionRequestView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: request, isLoading } = useQuery({
    queryKey: ['request', id],
    queryFn: async () => {
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
  });

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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!request) {
    return <div>Request not found</div>;
  }

  const isApprover = userRoles.includes(`${request.type}_approver` as ApproverRole);
  const canApprove = isApprover && ['pending', 'assigned'].includes(request.status);

  const { handleApprove, handleReject } = useRequestStatusActions({
    requestId: request.id,
    onClose: () => navigate(-1),
  });

  const handleClose = () => navigate(-1);
  const handleEdit = () => navigate(`/requests/${id}/edit`);
  const handleDelete = () => {
    // Implement delete functionality
    navigate(-1);
  };

  return (
    <FormContainer
      title={request.title}
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
      <RequestDetails data={request} />
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