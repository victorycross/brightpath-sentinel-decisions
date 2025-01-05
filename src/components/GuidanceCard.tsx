import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ApproverInfo {
  title: string;
  name?: string;
}

interface GuidanceCardProps {
  type: string;
  disciplineApprovers: ApproverInfo[];
  finalApprover: ApproverInfo;
}

export const GuidanceCard = ({
  type,
  disciplineApprovers,
  finalApprover,
}: GuidanceCardProps) => {
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>{type}</CardTitle>
        <CardDescription>Required approvers for this request type</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div>
            <h4 className="font-medium">Discipline Approvers:</h4>
            <ul className="list-disc pl-6">
              {disciplineApprovers.map((approver, index) => (
                <li key={index}>{approver.title}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-medium">Final Approver:</h4>
            <p className="pl-6">{finalApprover.title}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};