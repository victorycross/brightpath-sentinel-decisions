import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ApproverRole } from "@/types/approver";
import { PendingRequestsTab } from "./components/PendingRequestsTab";
import { ApprovedRequestsTab } from "./components/ApprovedRequestsTab";
import { ExpiryDateCheck } from "../ExpiryDateCheck";

interface ApproverTabsProps {
  approverRoles: ApproverRole[];
}

export const ApproverTabs = ({ approverRoles }: ApproverTabsProps) => {
  return (
    <Tabs defaultValue="pending" className="space-y-4">
      <TabsList>
        <TabsTrigger value="pending">Pending Approval</TabsTrigger>
        <TabsTrigger value="approved">Previously Approved</TabsTrigger>
        <TabsTrigger value="expiry">Expiry Check</TabsTrigger>
      </TabsList>
      
      <TabsContent value="pending">
        <PendingRequestsTab approverRoles={approverRoles} />
      </TabsContent>
      
      <TabsContent value="approved">
        <ApprovedRequestsTab approverRoles={approverRoles} />
      </TabsContent>

      <TabsContent value="expiry">
        <ExpiryDateCheck />
      </TabsContent>
    </Tabs>
  );
};