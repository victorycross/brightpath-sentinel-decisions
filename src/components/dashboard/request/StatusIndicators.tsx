import { Circle, CheckCircle, XCircle, Clock } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CROApprovalIndicatorProps {
  residualRisk?: string;
  status: string;
}

export const CROApprovalIndicator = ({ residualRisk, status }: CROApprovalIndicatorProps) => {
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

interface ExpiryIndicatorProps {
  expiryDate?: string;
  expired?: boolean;
}

export const ExpiryIndicator = ({ expiryDate, expired }: ExpiryIndicatorProps) => {
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