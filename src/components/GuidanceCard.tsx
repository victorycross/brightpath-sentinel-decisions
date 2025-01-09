import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

interface ApproverInfo {
  title: string;
  name?: string;
}

interface GuidanceCardProps {
  type: string;
  disciplineApprovers: ApproverInfo[];
  finalApprover: ApproverInfo;
  residualRisk?: string;
}

export const GuidanceCard = ({
  type,
  disciplineApprovers,
  finalApprover,
  residualRisk,
}: GuidanceCardProps) => {
  const needsCROApproval = residualRisk && ['medium', 'high'].includes(residualRisk.toLowerCase());

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>{type}</CardTitle>
        <CardDescription>Required approvers for this request type</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium">Discipline Approvers:</h4>
            <ul className="list-disc pl-6">
              {disciplineApprovers.map((approver, index) => (
                <li key={index}>{approver.title}</li>
              ))}
            </ul>
          </div>
          {needsCROApproval && (
            <div className="bg-warning/20 p-3 rounded-md">
              <div className="flex items-center gap-2 text-warning-foreground">
                <AlertTriangle className="h-4 w-4" />
                <h4 className="font-medium">CRO Approval Required</h4>
              </div>
              <p className="text-sm mt-1 text-muted-foreground">
                Due to {residualRisk} residual risk, this request requires CRO approval
              </p>
            </div>
          )}
          <div>
            <h4 className="font-medium">Final Approver:</h4>
            <p className="pl-6">{finalApprover.title}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};