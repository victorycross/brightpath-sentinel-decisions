import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ExceptionRequestView } from "./ExceptionRequestView";
import { ExceptionRequestAuditLog } from "./ExceptionRequestAuditLog";
import { useRequestOperations } from "@/hooks/useRequestOperations";
import { ExceptionRequestForm } from "../ExceptionRequestForm";
import { useToast } from "@/hooks/use-toast";
import { RequestListView } from "./request/RequestListView";

interface RequestListProps {
  requests: any[];
  loading: boolean;
  showAuditLog?: boolean;
}

export const RequestList = ({ requests, loading, showAuditLog = false }: RequestListProps) => {
  const [viewingRequest, setViewingRequest] = useState<any>(null);
  const [editingRequest, setEditingRequest] = useState<any>(null);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const { handleDelete, fetchRequestDetails } = useRequestOperations();
  const { toast } = useToast();

  const handleEdit = async (id: string) => {
    const details = await fetchRequestDetails(id);
    if (details) {
      setEditingRequest(details);
      setViewingRequest(null);
      toast({
        title: "Edit Mode",
        description: "You can now edit the request details.",
      });
    }
  };

  const handleView = async (id: string) => {
    const details = await fetchRequestDetails(id);
    if (details) {
      setViewingRequest(details);
      setEditingRequest(null);
      
      if (showAuditLog) {
        const { data } = await supabase
          .from('exception_request_audit_logs')
          .select(`
            id,
            action,
            created_at,
            changes,
            profiles (
              email
            )
          `)
          .eq('request_id', id)
          .order('created_at', { ascending: false });

        setAuditLogs(data || []);
      }
    }
  };

  if (editingRequest) {
    return (
      <ExceptionRequestForm
        initialData={editingRequest}
        isEditing={true}
        onClose={() => setEditingRequest(null)}
      />
    );
  }

  if (viewingRequest) {
    return (
      <div>
        <ExceptionRequestView
          data={viewingRequest}
          onClose={() => {
            setViewingRequest(null);
            setAuditLogs([]);
          }}
          onEdit={() => handleEdit(viewingRequest.id)}
          onDelete={async () => {
            const success = await handleDelete(viewingRequest.id);
            if (success) {
              setViewingRequest(null);
              toast({
                title: "Success",
                description: "Request deleted successfully",
              });
            }
          }}
        />
        {showAuditLog && <ExceptionRequestAuditLog logs={auditLogs} />}
      </div>
    );
  }

  return (
    <RequestListView
      requests={requests}
      loading={loading}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onView={handleView}
    />
  );
};