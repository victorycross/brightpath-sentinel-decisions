import { DashboardActivityLog } from "@/components/dashboard/DashboardActivityLog";
import { RequestManager } from "@/components/dashboard/RequestManager";
import { ExpiryDateCheck } from "@/components/dashboard/ExpiryDateCheck";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const ExceptionsDashboard = () => {
  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-8">Exceptions Dashboard</h1>
      
      <div className="grid gap-6">
        <ExpiryDateCheck />
        
        <Card>
          <CardHeader>
            <CardTitle>Exception Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList>
                <TabsTrigger value="all">All Requests</TabsTrigger>
                <TabsTrigger value="my">My Requests</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all">
                <RequestManager />
              </TabsContent>
              
              <TabsContent value="my">
                <RequestManager personalOnly={true} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <DashboardActivityLog />
      </div>
    </div>
  );
};