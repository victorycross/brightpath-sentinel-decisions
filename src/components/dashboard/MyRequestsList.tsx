import { ExceptionRequestCard } from "./ExceptionRequestCard";
import { EmptyState } from "./EmptyState";
import { LoadingState } from "./LoadingState";
import { useUserRequests } from "@/hooks/useUserRequests";
import { useState } from "react";
import { ExceptionRequestView } from "./ExceptionRequestView";

export const MyRequestsList = () => {
  const { requests, loading, handleDelete } = useUserRequests();
  const [viewingRequest, setViewingRequest] = useState<any>(null);

  const handleEdit = (id: string) => {
    console.log("Edit request:", id);
    // Implement edit functionality
  };

  const handleView = (id: string) => {
    const request = requests.find(r => r.id === id);
    if (request) {
      setViewingRequest(request);
    }
  };

  if (loading) return <LoadingState />;
  if (!requests.length) return <EmptyState />;

  if (viewingRequest) {
    return (
      <ExceptionRequestView
        data={viewingRequest}
        onClose={() => setViewingRequest(null)}
        onEdit={() => handleEdit(viewingRequest.id)}
        onDelete={() => {
          handleDelete(viewingRequest.id);
          setViewingRequest(null);
        }}
      />
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