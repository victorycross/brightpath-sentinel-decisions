import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ExceptionRequestCard } from "./ExceptionRequestCard";
import { ExceptionRequestForm } from "@/components/ExceptionRequestForm";
import { ExceptionRequestView } from "./ExceptionRequestView";
import { ExceptionRequestAuditLog } from "./ExceptionRequestAuditLog";

type ExceptionRequest = {
  id: string;
  title: string;
  type: string;
  status: string;
  request?: string;
  reason?: string;
  impact?: string;
  mitigating_factors?: string;
  residual_risk?: string;
  submitted_at: string;
  submitted_by?: string;
  updated_at?: string;
  profiles: {
    email: string;
  } | null;
};

type AuditLog = {
  id: string;
  action: string;
  created_at: string;
  changes: any;
  profiles: {
    email: string;
  } | null;
};

interface RequestManagerProps {
  requests: ExceptionRequest[];
  setRequests: (requests: ExceptionRequest[]) => void;
}

export const RequestManager = ({ requests, setRequests }: RequestManagerProps) => {
  const [editingRequest, setEditingRequest] = useState<ExceptionRequest | null>(null);
  const [viewingRequest, setViewingRequest] = useState<ExceptionRequest | null>(null);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const { toast } = useToast();

  const fetchAuditLogs = async (requestId: string) => {
    try {
      const { data, error } = await supabase
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
        .eq('request_id', requestId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAuditLogs(data || []);
    } catch (err) {
      console.error('Error fetching audit logs:', err);
      toast({
        title: "Error",
        description: "Failed to load audit logs",
        variant: "destructive",
      });
    }
  };

  const handleView = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('exception_requests')
        .select(`
          id,
          title,
          type,
          status,
          request,
          reason,
          impact,
          mitigating_factors,
          residual_risk,
          submitted_at,
          submitted_by,
          updated_at,
          profiles (
            email
          )
        `)
        .eq('id', id)
        .single();

      if (error) throw error;

      setViewingRequest(data);
      await fetchAuditLogs(id);
    } catch (err) {
      console.error('Error fetching request details:', err);
      toast({
        title: "Error",
        description: "Failed to load request details",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (id: string) => {
    const request = viewingRequest || requests.find(r => r.id === id);
    if (request) {
      setEditingRequest(request);
      setViewingRequest(null);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('exception_requests')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setRequests(requests.filter(request => request.id !== id));
      setViewingRequest(null);
      toast({
        title: "Request Deleted",
        description: "The exception request has been deleted.",
      });
    } catch (err) {
      console.error('Error deleting request:', err);
      toast({
        title: "Error",
        description: "Failed to delete the request",
        variant: "destructive",
      });
    }
  };

  const handleCloseEdit = () => {
    setEditingRequest(null);
    setAuditLogs([]);
  };

  const handleCloseView = () => {
    setViewingRequest(null);
    setAuditLogs([]);
  };

  if (editingRequest) {
    return (
      <div>
        <ExceptionRequestForm
          initialData={editingRequest}
          onClose={handleCloseEdit}
          isEditing={true}
        />
        <ExceptionRequestAuditLog logs={auditLogs} />
      </div>
    );
  }

  if (viewingRequest) {
    return (
      <div>
        <ExceptionRequestView
          data={viewingRequest}
          onClose={handleCloseView}
          onEdit={() => handleEdit(viewingRequest.id)}
          onDelete={() => handleDelete(viewingRequest.id)}
        />
        <ExceptionRequestAuditLog logs={auditLogs} />
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
