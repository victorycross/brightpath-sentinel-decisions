import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ExceptionRequestCard } from "@/components/dashboard/ExceptionRequestCard";
import { ExceptionRequestAuditLog } from "@/components/dashboard/ExceptionRequestAuditLog";
import { LoadingState } from "@/components/dashboard/LoadingState";
import { ExceptionRequestForm } from "@/components/ExceptionRequestForm";

type ExceptionRequest = {
  id: string;
  title: string;
  type: string;
  status: string;
  submitted_at: string;
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

const Dashboard = () => {
  const [requests, setRequests] = useState<ExceptionRequest[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingRequest, setEditingRequest] = useState<ExceptionRequest | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const { data, error } = await supabase
          .from('exception_requests')
          .select(`
            id,
            title,
            type,
            status,
            submitted_at,
            profiles (
              email
            )
          `)
          .in('status', ['in_process', 'approved'])
          .order('submitted_at', { ascending: false });

        if (error) throw error;

        setRequests(data || []);
      } catch (err) {
        console.error('Error fetching requests:', err);
        setError('Failed to load requests');
        toast({
          title: "Error",
          description: "Failed to load exception requests",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchRequests();
  }, [toast]);

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

  const handleEdit = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('exception_requests')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      setEditingRequest(data);
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

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('exception_requests')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setRequests(requests.filter(request => request.id !== id));
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

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        {error}
      </div>
    );
  }

  if (editingRequest) {
    return (
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <ExceptionRequestForm
          initialData={editingRequest}
          onClose={handleCloseEdit}
          isEditing={true}
        />
        <ExceptionRequestAuditLog logs={auditLogs} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Exception Requests Dashboard
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          View and manage your active and approved exception requests
        </p>
      </div>

      {requests.length === 0 ? (
        <div className="text-center text-gray-500 p-8">
          No exception requests found
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map((request) => (
            <ExceptionRequestCard
              key={request.id}
              request={request}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;