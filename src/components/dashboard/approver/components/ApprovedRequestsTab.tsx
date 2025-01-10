import { RequestList } from "../../RequestList";
import { ApproverRole } from "@/types/approver";
import { useApproverRequests } from "../hooks/useApproverRequests";

interface ApprovedRequestsTabProps {
  approverRoles: ApproverRole[];
}

export const ApprovedRequestsTab = ({ approverRoles }: ApprovedRequestsTabProps) => {
  const { data: approvedRequests = [], isLoading: approvedLoading } = useApproverRequests(approverRoles, 'approved');

  return (
    <RequestList
      requests={approvedRequests}
      loading={approvedLoading}
      showAuditLog={true}
    />
  );
};