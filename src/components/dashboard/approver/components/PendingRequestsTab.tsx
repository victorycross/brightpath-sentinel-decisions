import { RequestList } from "../../RequestList";
import { ApproverRole } from "@/types/approver";
import { useApproverRequests } from "../hooks/useApproverRequests";

interface PendingRequestsTabProps {
  approverRoles: ApproverRole[];
}

export const PendingRequestsTab = ({ approverRoles }: PendingRequestsTabProps) => {
  const { data: pendingRequests = [], isLoading: pendingLoading } = useApproverRequests(approverRoles, 'pending');

  return (
    <RequestList
      requests={pendingRequests}
      loading={pendingLoading}
      showAuditLog={true}
    />
  );
};