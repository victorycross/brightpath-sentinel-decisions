
import { Card } from "@/components/ui/card";

export const TechnicalRequirements = () => {
  return (
    <Card className="p-6 border border-border/50 shadow-sm hover:shadow-md transition-shadow">
      <h2 className="text-2xl font-semibold mb-4 text-primary">Technical Requirements</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-medium text-secondary mb-3">Option A: Modern Web Application Stack</h3>
          <section>
            <h4 className="text-lg font-medium mb-2">1. System Architecture</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li>React-based frontend</li>
              <li>Supabase backend</li>
              <li>Real-time updates</li>
              <li>Responsive design</li>
              <li>Secure data storage</li>
            </ul>
          </section>

          <section className="mt-4">
            <h4 className="text-lg font-medium mb-2">2. Security Requirements</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li>Role-based access control</li>
              <li>Data encryption</li>
              <li>Secure authentication</li>
              <li>Audit trails</li>
              <li>Session management</li>
            </ul>
          </section>
        </div>

        <div>
          <h3 className="text-xl font-medium text-secondary mb-3">Option B: Microsoft 365 Integration Stack</h3>
          <section>
            <h4 className="text-lg font-medium mb-2">1. System Architecture</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li>SharePoint Online lists and libraries</li>
              <li>Power Automate workflows</li>
              <li>Microsoft Copilot Studio for AI integration</li>
              <li>SharePoint modern web parts</li>
              <li>Microsoft Teams integration</li>
            </ul>
          </section>

          <section className="mt-4">
            <h4 className="text-lg font-medium mb-2">2. Security Requirements</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li>Azure AD authentication</li>
              <li>Microsoft 365 security policies</li>
              <li>SharePoint permission levels</li>
              <li>Microsoft Information Protection</li>
              <li>Conditional access policies</li>
            </ul>
          </section>
        </div>
      </div>
    </Card>
  );
};
