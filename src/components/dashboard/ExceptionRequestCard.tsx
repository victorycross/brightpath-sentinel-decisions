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

interface ExceptionRequestCardProps {
  request: ExceptionRequest;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onView: (id: string) => void;
}

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

export const ExceptionRequestCard = ({
  request,
  onEdit,
  onDelete,
  onView,
}: ExceptionRequestCardProps) => {
  return (
    <Card 
      className="hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onView(request.id)}
    >
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl mb-2">
              {request.title || "Untitled Request"}
            </CardTitle>
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
          <div className="space-x-2" onClick={(e) => e.stopPropagation()}>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(request.id)}
              className="gap-2"
            >
              <Edit2 className="h-4 w-4" />
              Edit
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(request.id)}
              className="gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};