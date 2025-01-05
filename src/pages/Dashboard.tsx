import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

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

const getStatusColor = (status: string) => {
  switch (status) {
    case "approved":
      return "bg-success text-success-foreground";
    case "in_process":
      return "bg-warning text-warning-foreground";
    default:
      return "bg-secondary text-secondary-foreground";
  }
};

const getStatusDisplay = (status: string) => {
  switch (status) {
    case "in_process":
      return "In Process";
    default:
      return status.charAt(0).toUpperCase() + status.slice(1);
  }
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

  const handleEdit = (id: string) => {
    console.log("Editing request:", id);
    toast({
      title: "Edit Mode",
      description: "You can now edit the request details.",
    });
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('exception_requests')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setRequests(requests.filter(request => request.id !== id));
      toast({
        title: "Request Deleted",
        description: "The exception request has been deleted.",
      });
    } catch (err) {
      console.error('Error deleting request:', err);
      toast({
        title: "Error",
        description: "Failed to delete the request",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Exception Requests Dashboard
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          View and manage your active and approved exception requests
        </p>
      </div>

      {requests.length === 0 ? (
        <div className="text-center text-gray-500 p-8">
          No exception requests found
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map((request) => (
            <Card key={request.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{request.title}</CardTitle>
                    <CardDescription>
                      Submitted by {request.profiles?.email} on{" "}
                      {new Date(request.submitted_at).toLocaleDateString()}
                    </CardDescription>
                  </div>
                  <Badge className={getStatusColor(request.status)}>
                    {getStatusDisplay(request.status)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="capitalize">
                    {request.type}
                  </Badge>
                  <div className="space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(request.id)}
                      className="gap-2"
                    >
                      <Edit2 className="h-4 w-4" />
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(request.id)}
                      className="gap-2"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;