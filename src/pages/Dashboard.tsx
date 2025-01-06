import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { LoadingState } from "@/components/dashboard/LoadingState";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { RequestManager } from "@/components/dashboard/RequestManager";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { DashboardActivityLog } from "@/components/dashboard/DashboardActivityLog";
import { MyRequestsList } from "@/components/dashboard/MyRequestsList";
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
  const [requests, setRequests] = useState<ExceptionRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const { data, error } = await supabase
          .from('exception_requests')
          .select(`
            id,
            title,
            type,
            status,
            submitted_at,
            profiles (
              email
            )
          `)
          .in('status', ['in_process', 'approved'])
          .order('submitted_at', { ascending: false });

        if (error) throw error;

        setRequests(data || []);
      } catch (err) {
        console.error('Error fetching requests:', err);
        setError('Failed to load requests');
        toast({
          title: "Error",
          description: "Failed to load exception requests",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchRequests();
  }, [toast]);

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
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="all">All Requests</TabsTrigger>
            <TabsTrigger value="my">My Requests</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            {requests.length === 0 ? (
              <EmptyState />
            ) : (
              <>
                <RequestManager requests={requests} setRequests={setRequests} />
                <DashboardActivityLog />
              </>
            )}
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