import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Mock data for demonstration
const mockRequests = [
  {
    id: 1,
    title: "Cloud Service Provider Exception",
    type: "technology",
    status: "pending",
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
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "approved":
      return "bg-success text-success-foreground";
    case "rejected":
      return "bg-error text-error-foreground";
    case "pending":
      return "bg-warning text-warning-foreground";
    default:
      return "bg-secondary text-secondary-foreground";
  }
};

export const RequestList = () => {
  return (
    <div className="space-y-4">
      {mockRequests.map((request) => (
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
                {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="capitalize">
                {request.type}
              </Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};