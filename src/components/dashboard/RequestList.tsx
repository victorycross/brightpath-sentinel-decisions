import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ExceptionRequestCard } from "./ExceptionRequestCard";
import { ExceptionRequestView } from "./ExceptionRequestView";
import { ExceptionRequestAuditLog } from "./ExceptionRequestAuditLog";
import { useRequestOperations } from "@/hooks/useRequestOperations";
import { LoadingState } from "./LoadingState";
import { EmptyState } from "./EmptyState";

interface RequestListProps {
  requests: any[];
  loading: boolean;
  showAuditLog?: boolean;
}

export const RequestList = ({ requests, loading, showAuditLog = false }: RequestListProps) => {
  const [viewingRequest, setViewingRequest] = useState<any>(null);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const { handleDelete, fetchRequestDetails } = useRequestOperations();

  const handleEdit = (id: string) => {
    console.log("Edit request:", id);
    // Implement edit functionality
  };

  const handleView = async (id: string) => {
    const details = await fetchRequestDetails(id);
    if (details) {
      setViewingRequest(details);
      
      if (showAuditLog) {
        try {
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
        } catch (err) {
          console.error('Error fetching audit logs:', err);
        }
      }
    }
  };

  const handleCloseView = () => {
    setViewingRequest(null);
    setAuditLogs([]);
  };

  if (loading) return <LoadingState />;
  if (!requests.length) return <EmptyState />;

  if (viewingRequest) {
    return (
      <div>
        <ExceptionRequestView
          data={viewingRequest}
          onClose={handleCloseView}
          onEdit={() => handleEdit(viewingRequest.id)}
          onDelete={async () => {
            const success = await handleDelete(viewingRequest.id);
            if (success) handleCloseView();
          }}
        />
        {showAuditLog && <ExceptionRequestAuditLog logs={auditLogs} />}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {requests.map((request) => (
        <ExceptionRequestCard
          key={request.id}
          request={request}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={handleView}
        />
      ))}
    </div>
  );
};