
import { Card } from "@/components/ui/card";

export const BusinessRequirements = () => {
  return (
    <Card className="p-6 border border-border/50 shadow-sm hover:shadow-md transition-shadow">
      <h2 className="text-2xl font-semibold mb-4 text-primary">Business Requirements</h2>
      
      <div className="space-y-6">
        <section>
          <h3 className="text-xl font-medium text-secondary mb-3">1. User Management</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Support multiple user roles (Requesters, Approvers, Administrators)</li>
            <li>Role-based access control for different functionalities</li>
            <li>User authentication and authorization</li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-medium text-secondary mb-3">2. Exception Request Management</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Allow users to create exception requests</li>
            <li>Support different types of exceptions:
              <ul className="list-circle pl-5 mt-2 space-y-1">
                <li>Cyber or Technology Issues</li>
                <li>Legal/Privacy Issues</li>
                <li>Independence Issues</li>
                <li>Quality Management Review (QMR)</li>
                <li>Client Acceptance and Continuance</li>
                <li>Engagement Risk</li>
                <li>Audit Finding Exception</li>
                <li>Data-Related Issues</li>
                <li>AI and Emerging Technology Issues</li>
              </ul>
            </li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-medium text-secondary mb-3">3. Request Details</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Title and description</li>
            <li>Request type classification</li>
            <li>Impact assessment</li>
            <li>Risk assessment</li>
            <li>Mitigating factors</li>
            <li>Residual risk evaluation (High, Medium, Low)</li>
            <li>Supporting documentation</li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-medium text-secondary mb-3">4. Approval Workflow</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Multi-level approval process</li>
            <li>Role-specific approval requirements</li>
            <li>Automatic routing based on request type</li>
            <li>Status tracking (Pending, Assigned, Approved, Rejected)</li>
            <li>Comments and feedback mechanism</li>
          </ul>
        </section>
      </div>
    </Card>
  );
};
