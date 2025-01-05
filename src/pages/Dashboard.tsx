import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data for demonstration
const mockRequests = [
  {
    id: 1,
    title: "Cloud Service Provider Exception",
    type: "technology",
    status: "in_process",
    submittedAt: "2024-02-20",
    submittedBy: "John Doe",
  },
  {
    id: 2,
    title: "Third-party Vendor Assessment",
    type: "legal",
    status: "approved",
    submittedAt: "2024-02-19",
    submittedBy: "Jane Smith",
  },
  {
    id: 3,
    title: "Network Security Exception",
    type: "technology",
    status: "in_process",
    submittedAt: "2024-02-18",
    submittedBy: "Mike Johnson",
  }
];

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
  const { toast } = useToast();

  const handleEdit = (id: number) => {
    console.log("Editing request:", id);
    console.log(`[${new Date().toISOString()}] Request ${id} opened for editing`);
    toast({
      title: "Edit Mode",
      description: "You can now edit the request details.",
    });
  };

  const handleDelete = (id: number) => {
    console.log("Deleting request:", id);
    console.log(`[${new Date().toISOString()}] Request ${id} deleted`);
    toast({
      title: "Request Deleted",
      description: "The exception request has been deleted.",
      variant: "destructive",
    });
  };

  // Filter requests to show only in_process and approved
  const filteredRequests = mockRequests.filter(
    request => ["in_process", "approved"].includes(request.status)
  );

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

      <div className="space-y-4">
        {filteredRequests.map((request) => (
          <Card key={request.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{request.title}</CardTitle>
                  <CardDescription>
                    Submitted by {request.submittedBy} on {request.submittedAt}
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
    </div>
  );
};

export default Dashboard;