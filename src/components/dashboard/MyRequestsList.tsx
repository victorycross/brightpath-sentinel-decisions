import { ExceptionRequestCard } from "./ExceptionRequestCard";
import { EmptyState } from "./EmptyState";
import { LoadingState } from "./LoadingState";
import { useUserRequests } from "@/hooks/useUserRequests";

export const MyRequestsList = () => {
  const { requests, loading, handleDelete } = useUserRequests();

  const handleEdit = (id: string) => {
    console.log("Edit request:", id);
    // Implement edit functionality
  };

  if (loading) return <LoadingState />;
  if (!requests.length) return <EmptyState />;

  return (
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
  );
};
