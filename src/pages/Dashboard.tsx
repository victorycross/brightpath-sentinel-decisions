import { useToast } from "@/hooks/use-toast";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { RequestManager } from "@/components/dashboard/RequestManager";
import { DashboardActivityLog } from "@/components/dashboard/DashboardActivityLog";
import { MyRequestsList } from "@/components/dashboard/MyRequestsList";
import { ApproverDashboard } from "@/components/dashboard/ApproverDashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <DashboardHeader />
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="all">All Requests</TabsTrigger>
            <TabsTrigger value="my">My Requests</TabsTrigger>
            <TabsTrigger value="approver">Approver View</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <RequestManager />
            <DashboardActivityLog />
          </TabsContent>
          <TabsContent value="my">
            <MyRequestsList />
          </TabsContent>
          <TabsContent value="approver">
            <ApproverDashboard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;