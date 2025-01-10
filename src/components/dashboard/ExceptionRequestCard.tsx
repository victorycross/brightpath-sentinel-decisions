import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ExceptionRequest } from "@/types/request";
import { RequestActions } from "./request/RequestActions";
import { CROApprovalIndicator, ExpiryIndicator } from "./request/StatusIndicators";

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
    case "rejected":
      return "bg-error text-error-foreground";
    case "pending":
      return "bg-warning text-warning-foreground";
    default:
      return "bg-secondary text-secondary-foreground";
  }
};

export const ExceptionRequestCard = ({ request, onEdit, onDelete, onView }: ExceptionRequestCardProps) => {
  return (
    <Card key={request.id} className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle 
              className="text-xl hover:text-primary cursor-pointer transition-colors"
              onClick={() => onView(request.id)}
            >
              {request.title}
            </CardTitle>
            <CardDescription>
              Submitted by {request.profiles?.email} on {new Date(request.submitted_at).toLocaleDateString()}
            </CardDescription>
          </div>
          <div className="flex items-center gap-3">
            <ExpiryIndicator 
              expiryDate={request.expiry_date} 
              expired={request.expired}
            />
            <CROApprovalIndicator 
              residualRisk={request.residual_risk} 
              status={request.status} 
            />
            <Badge className={`${getStatusColor(request.status)} ${request.expired ? 'opacity-50' : ''}`}>
              {request.expired ? 'Expired' : request.status.charAt(0).toUpperCase() + request.status.slice(1)}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="capitalize">
            {request.type}
          </Badge>
          <RequestActions
            onEdit={() => onEdit(request.id)}
            onDelete={() => onDelete(request.id)}
          />
        </div>
      </CardContent>
    </Card>
  );
};