
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const RequirementsDoc = () => {
  const { toast } = useToast();

  const handleExport = () => {
    const content = `
# Exception Management System Requirements Documentation

## Business Requirements

### 1. User Management
- Support multiple user roles (Requesters, Approvers, Administrators)
- Role-based access control for different functionalities
- User authentication and authorization

### 2. Exception Request Management
- Allow users to create exception requests
- Support different types of exceptions:
  - Cyber or Technology Issues
  - Legal/Privacy Issues
  - Independence Issues
  - Quality Management Review (QMR)
  - Client Acceptance and Continuance
  - Engagement Risk
  - Audit Finding Exception
  - Data-Related Issues
  - AI and Emerging Technology Issues

### 3. Request Details
- Title and description
- Request type classification
- Impact assessment
- Risk assessment
- Mitigating factors
- Residual risk evaluation (High, Medium, Low)
- Supporting documentation

### 4. Approval Workflow
- Multi-level approval process
- Role-specific approval requirements
- Automatic routing based on request type
- Status tracking (Pending, Assigned, Approved, Rejected)
- Comments and feedback mechanism

### 5. Notifications
- Email notifications for:
  - New requests
  - Status changes
  - Approaching deadlines
  - Request updates
  - Approval/Rejection decisions

### 6. Reporting and Analytics
- Dashboard with key metrics
- Exception type distribution
- Risk level analytics
- Processing time statistics
- Status distribution reports
- Expiry tracking

### 7. Compliance and Audit
- Audit trail for all actions
- Document version control
- Compliance with regulatory requirements
- Data retention policies

## Workflow Requirements

### 1. Request Creation
1. User logs into the system
2. Selects "New Request"
3. Fills in required information:
   - Request type
   - Title
   - Description
   - Impact assessment
   - Mitigating factors
   - Risk assessment
4. Submits request

### 2. Initial Review
1. System routes request to appropriate approvers
2. Approvers receive notification
3. Initial review for completeness
4. Request either:
   - Proceeds to approval
   - Returns for additional information
   - Gets rejected

### 3. Approval Process
1. Approver reviews request details
2. Evaluates risk and impact
3. Reviews mitigating factors
4. Makes decision:
   - Approve
   - Reject
   - Request modifications
5. Provides comments/feedback

### 4. Post-Approval
1. System updates request status
2. Notifies all relevant parties
3. Updates dashboards and reports
4. Archives request details
5. Initiates any required follow-up actions

### 5. Monitoring and Review
1. Regular review of active exceptions
2. Expiry tracking and notifications
3. Periodic risk reassessment
4. Compliance verification
5. Analytics and reporting updates

## Technical Requirements

### 1. System Architecture
- React-based frontend
- Supabase backend
- Real-time updates
- Responsive design
- Secure data storage

### 2. Integration Requirements
- Email notification system
- Document management system
- Audit logging
- Analytics and reporting tools

### 3. Security Requirements
- Role-based access control
- Data encryption
- Secure authentication
- Audit trails
- Session management

### 4. Performance Requirements
- Quick response times
- Efficient data loading
- Optimized database queries
- Scalable architecture
`;

    // Create blob and download
    const blob = new Blob([content], { type: "text/markdown" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "exception_management_requirements.md";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    toast({
      title: "Documentation Exported",
      description: "Requirements documentation has been downloaded as a Markdown file.",
    });
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Exception Management System Requirements</h1>
        <Button onClick={handleExport} className="gap-2">
          <FileDown className="h-4 w-4" />
          Export to MD
        </Button>
      </div>

      <div className="prose max-w-none">
        <h2>Business Requirements</h2>
        
        <h3>1. User Management</h3>
        <ul>
          <li>Support multiple user roles (Requesters, Approvers, Administrators)</li>
          <li>Role-based access control for different functionalities</li>
          <li>User authentication and authorization</li>
        </ul>

        <h3>2. Exception Request Management</h3>
        <ul>
          <li>Allow users to create exception requests</li>
          <li>Support different types of exceptions:
            <ul>
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

        <h3>3. Request Details</h3>
        <ul>
          <li>Title and description</li>
          <li>Request type classification</li>
          <li>Impact assessment</li>
          <li>Risk assessment</li>
          <li>Mitigating factors</li>
          <li>Residual risk evaluation (High, Medium, Low)</li>
          <li>Supporting documentation</li>
        </ul>

        <h3>4. Approval Workflow</h3>
        <ul>
          <li>Multi-level approval process</li>
          <li>Role-specific approval requirements</li>
          <li>Automatic routing based on request type</li>
          <li>Status tracking (Pending, Assigned, Approved, Rejected)</li>
          <li>Comments and feedback mechanism</li>
        </ul>

        <h2>Workflow Requirements</h2>

        <h3>1. Request Creation</h3>
        <ol>
          <li>User logs into the system</li>
          <li>Selects "New Request"</li>
          <li>Fills in required information:
            <ul>
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

        <h3>2. Approval Process</h3>
        <ol>
          <li>Approver reviews request details</li>
          <li>Evaluates risk and impact</li>
          <li>Reviews mitigating factors</li>
          <li>Makes decision:
            <ul>
              <li>Approve</li>
              <li>Reject</li>
              <li>Request modifications</li>
            </ul>
          </li>
          <li>Provides comments/feedback</li>
        </ol>

        <h2>Technical Requirements</h2>

        <h3>1. System Architecture</h3>
        <ul>
          <li>React-based frontend</li>
          <li>Supabase backend</li>
          <li>Real-time updates</li>
          <li>Responsive design</li>
          <li>Secure data storage</li>
        </ul>

        <h3>2. Security Requirements</h3>
        <ul>
          <li>Role-based access control</li>
          <li>Data encryption</li>
          <li>Secure authentication</li>
          <li>Audit trails</li>
          <li>Session management</li>
        </ul>
      </div>
    </div>
  );
};
