import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RequestList } from "../RequestList";
import { ExceptionRequest } from "@/types/request";

interface ApproverTabsProps {
  pendingRequests: ExceptionRequest[];
  requestsLoading: boolean;
}

export const ApproverTabs = ({ pendingRequests, requestsLoading }: ApproverTabsProps) => {
  return (
    <Tabs defaultValue="pending">
      <TabsList>
        <TabsTrigger value="pending">Pending Approval</TabsTrigger>
        <TabsTrigger value="approved">Previously Approved</TabsTrigger>
      </TabsList>
      
      <TabsContent value="pending">
        <RequestList
          requests={pendingRequests}
          loading={requestsLoading}
          showAuditLog={true}
        />
      </TabsContent>
      
      <TabsContent value="approved">
        <RequestList
          requests={[]}
          loading={false}
          showAuditLog={true}
        />
      </TabsContent>
    </Tabs>
  );
};