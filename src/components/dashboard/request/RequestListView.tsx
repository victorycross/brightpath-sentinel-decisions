import { ExceptionRequestCard } from "../ExceptionRequestCard";
import { LoadingState } from "../LoadingState";
import { EmptyState } from "../EmptyState";

interface RequestListViewProps {
  requests: any[];
  loading: boolean;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onView: (id: string) => void;
}

export const RequestListView = ({ 
  requests, 
  loading, 
  onEdit, 
  onDelete, 
  onView 
}: RequestListViewProps) => {
  if (loading) return <LoadingState />;
  if (!requests.length) return <EmptyState />;

  return (
    <div className="space-y-4">
      {requests.map((request) => (
        <ExceptionRequestCard
          key={request.id}
          request={request}
          onEdit={onEdit}
          onDelete={onDelete}
          onView={onView}
        />
      ))}
    </div>
  );
};