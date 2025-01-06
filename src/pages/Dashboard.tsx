import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { LoadingState } from "@/components/dashboard/LoadingState";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { RequestManager } from "@/components/dashboard/RequestManager";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { DashboardActivityLog } from "@/components/dashboard/DashboardActivityLog";
import { MyRequestsList } from "@/components/dashboard/MyRequestsList";
import { RiskDashboard } from "@/components/dashboard/RiskDashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type ExceptionRequest = {
  id: string;
  title: string;
  type: string;
  status: string;
  submitted_at: string;
  profiles: {
    email: string;
  } | null;
};

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <DashboardHeader />
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Risk Overview</h2>
          <RiskDashboard />
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="all">All Requests</TabsTrigger>
            <TabsTrigger value="my">My Requests</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <RequestManager />
          </TabsContent>
          <TabsContent value="my">
            <MyRequestsList />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;