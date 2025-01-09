import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ExceptionRequest } from "@/types/request";
import { RequestActions } from "./RequestActions";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

interface RequestCardProps {
  request: ExceptionRequest;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onView: (id: string) => void;
}

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

export const RequestCard = ({ request, onEdit, onDelete, onView }: RequestCardProps) => {
  return (
    <Card key={request.id} className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{request.title}</CardTitle>
            <CardDescription>
              Submitted by {request.profiles?.email} on {new Date(request.submitted_at).toLocaleDateString()}
            </CardDescription>
          </div>
          <Badge className={getStatusColor(request.status)}>
            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
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
              onClick={() => onView(request.id)}
              className="gap-2"
            >
              <Eye className="h-4 w-4" />
              View
            </Button>
            <RequestActions
              onEdit={() => onEdit(request.id)}
              onDelete={() => onDelete(request.id)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};