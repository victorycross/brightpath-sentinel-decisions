
import { Card } from "@/components/ui/card";

export const WorkflowRequirements = () => {
  return (
    <Card className="p-6 border border-border/50 shadow-sm hover:shadow-md transition-shadow">
      <h2 className="text-2xl font-semibold mb-4 text-primary">Workflow Requirements</h2>
      
      <section>
        <h3 className="text-xl font-medium text-secondary mb-3">1. Request Creation</h3>
        <ol className="list-decimal pl-5 space-y-2">
          <li>User logs into the system</li>
          <li>Selects "New Request"</li>
          <li>Fills in required information:
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Request type</li>
              <li>Title</li>
              <li>Description</li>
              <li>Impact assessment</li>
              <li>Mitigating factors</li>
              <li>Risk assessment</li>
            </ul>
          </li>
          <li>Submits request</li>
        </ol>
      </section>

      <section className="mt-6">
        <h3 className="text-xl font-medium text-secondary mb-3">2. Approval Process</h3>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Approver reviews request details</li>
          <li>Evaluates risk and impact</li>
          <li>Reviews mitigating factors</li>
          <li>Makes decision:
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Approve</li>
              <li>Reject</li>
              <li>Request modifications</li>
            </ul>
          </li>
          <li>Provides comments/feedback</li>
        </ol>
      </section>
    </Card>
  );
};
