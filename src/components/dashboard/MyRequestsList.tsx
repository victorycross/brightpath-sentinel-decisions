import { useUserRequests } from "@/hooks/useUserRequests";
import { RequestList } from "./RequestList";

export const MyRequestsList = () => {
  const { requests, loading } = useUserRequests();
  
  return (
    <RequestList
      requests={requests}
      loading={loading}
      showAuditLog={false}
    />
  );
};