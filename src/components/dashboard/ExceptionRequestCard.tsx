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
import { CheckCircle, Circle, XCircle, Clock } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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

const CROApprovalIndicator = ({ residualRisk, status }: { residualRisk?: string, status: string }) => {
  if (!residualRisk || !['medium', 'high'].includes(residualRisk.toLowerCase())) {
    return null;
  }

  let icon;
  let tooltipText;

  switch (status) {
    case 'approved':
      icon = <CheckCircle className="h-5 w-5 text-success" />;
      tooltipText = "CRO Approved";
      break;
    case 'rejected':
      icon = <XCircle className="h-5 w-5 text-destructive" />;
      tooltipText = "CRO Rejected";
      break;
    default:
      icon = <Circle className="h-5 w-5 text-blue-500" />;
      tooltipText = "Pending CRO Review";
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-1">
            {icon}
            <span className="text-xs text-muted-foreground">CRO</span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const ExpiryIndicator = ({ expiryDate, expired }: { expiryDate?: string, expired?: boolean }) => {
  if (!expiryDate) return null;

  const daysUntilExpiry = Math.ceil((new Date(expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  const isNearExpiry = daysUntilExpiry <= 30 && !expired;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-1">
            <Clock className={`h-5 w-5 ${expired ? 'text-destructive' : isNearExpiry ? 'text-warning' : 'text-muted-foreground'}`} />
            <span className="text-xs text-muted-foreground">
              {expired ? 'Expired' : `${daysUntilExpiry} days`}
            </span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            {expired 
              ? 'Exception has expired and needs renewal' 
              : `Expires on ${new Date(expiryDate).toLocaleDateString()}`}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
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