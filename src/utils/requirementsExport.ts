
export const getRequirementsMarkdown = () => {
  return `
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

### Option A: Modern Web Application Stack

#### 1. System Architecture
- React-based frontend
- Supabase backend
- Real-time updates
- Responsive design
- Secure data storage

#### 2. Integration Requirements
- Email notification system
- Document management system
- Audit logging
- Analytics and reporting tools

#### 3. Security Requirements
- Role-based access control
- Data encryption
- Secure authentication
- Audit trails
- Session management

#### 4. Performance Requirements
- Quick response times
- Efficient data loading
- Optimized database queries
- Scalable architecture

### Option B: Microsoft 365 Integration Stack

#### 1. System Architecture
- SharePoint Online lists and libraries
- Power Automate workflows
- Microsoft Copilot Studio for AI integration
- SharePoint modern web parts
- Microsoft Teams integration

#### 2. Integration Requirements
- Outlook email notifications
- SharePoint document libraries
- Microsoft 365 audit logging
- Power BI analytics
- Microsoft Graph API integration

#### 3. Security Requirements
- Azure AD authentication
- Microsoft 365 security policies
- SharePoint permission levels
- Microsoft Information Protection
- Conditional access policies

#### 4. Performance Requirements
- SharePoint list indexing
- Content delivery optimization
- Power Automate concurrent runs
- Cached authentication tokens
- Optimized data calls
`;
};

