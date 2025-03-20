
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function FlowConfiguration() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Required Power Automate Flows</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">
          The Exception Management System requires several Power Automate flows to handle different aspects of the approval process. Each flow serves a specific purpose and integrates with SharePoint and other Microsoft 365 services.
        </p>
        
        <Tabs defaultValue="approval">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="approval">Approval Flow</TabsTrigger>
            <TabsTrigger value="notification">Notification Flow</TabsTrigger>
            <TabsTrigger value="expiration">Expiration Flow</TabsTrigger>
          </TabsList>
          
          <TabsContent value="approval" className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50 dark:bg-blue-950 dark:border-blue-400 my-4">
              <h3 className="font-semibold mb-1">Exception Request Approval Flow</h3>
              <p className="text-sm">This flow handles the routing and approval of exception requests through multiple approvers based on the request type and risk level.</p>
            </div>
            
            <h4 className="font-semibold text-lg mb-2">Flow Steps:</h4>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                <strong>Trigger:</strong> When a new item is created or modified in the "Exception Requests" SharePoint list with Status = "Submitted"
              </li>
              <li>
                <strong>Initialize Variables:</strong> Set up variables for approvers, current approval stage, and request details
              </li>
              <li>
                <strong>Get Approvers:</strong> Query the "Exception Approvers" list to determine the appropriate approvers based on request type and department
              </li>
              <li>
                <strong>Create Approval:</strong> Send approval request to the first approver
              </li>
              <li>
                <strong>Condition:</strong> Check if approval was approved or rejected
              </li>
              <li>
                <strong>Update SharePoint:</strong> Update the exception request status based on the approval decision
              </li>
              <li>
                <strong>Conditional:</strong> If approved and more approvers are needed, route to next approver
              </li>
              <li>
                <strong>Final Update:</strong> Update request status to "Approved" or "Rejected" and record final decision
              </li>
              <li>
                <strong>Send Notification:</strong> Notify the requester of the final decision
              </li>
            </ol>
            
            <div className="bg-muted p-4 rounded-md mt-4">
              <h4 className="font-semibold mb-2">Important Configuration Notes:</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Use dynamic content from SharePoint for email templates and approver assignments</li>
                <li>Configure parallel approvals for requests requiring multiple approvers at the same level</li>
                <li>Add appropriate error handling to manage cases where approvers are unavailable</li>
                <li>Set reasonable timeout periods for approval actions</li>
              </ul>
            </div>
          </TabsContent>
          
          <TabsContent value="notification" className="space-y-4">
            <div className="border-l-4 border-green-500 pl-4 py-2 bg-green-50 dark:bg-green-950 dark:border-green-400 my-4">
              <h3 className="font-semibold mb-1">Exception Request Notification Flow</h3>
              <p className="text-sm">This flow sends notifications to relevant stakeholders when exception requests change status or require attention.</p>
            </div>
            
            <h4 className="font-semibold text-lg mb-2">Flow Steps:</h4>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                <strong>Trigger:</strong> When an item is modified in the "Exception Requests" SharePoint list
              </li>
              <li>
                <strong>Condition:</strong> Check if the status has changed from its previous value
              </li>
              <li>
                <strong>Get Request Details:</strong> Retrieve full details of the exception request
              </li>
              <li>
                <strong>Get Requester Info:</strong> Look up requester's email and details from Azure AD
              </li>
              <li>
                <strong>Switch Statement:</strong> Different notification templates based on new status (Submitted, In Review, Approved, Rejected, etc.)
              </li>
              <li>
                <strong>Send Email:</strong> Send appropriate notification email with request details
              </li>
              <li>
                <strong>Log Notification:</strong> Record that notification was sent in a tracking list or log
              </li>
            </ol>
            
            <div className="bg-muted p-4 rounded-md mt-4">
              <h4 className="font-semibold mb-2">Email Template Configuration:</h4>
              <p className="mb-2">Include the following dynamic content in your notification emails:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Exception ID and Title</li>
                <li>Current Status</li>
                <li>Requester's Name</li>
                <li>Submission Date</li>
                <li>Link to view the full request</li>
                <li>Next steps or actions required (if applicable)</li>
              </ul>
            </div>
          </TabsContent>
          
          <TabsContent value="expiration" className="space-y-4">
            <div className="border-l-4 border-amber-500 pl-4 py-2 bg-amber-50 dark:bg-amber-950 dark:border-amber-400 my-4">
              <h3 className="font-semibold mb-1">Exception Expiration Management Flow</h3>
              <p className="text-sm">This scheduled flow checks for exceptions approaching their expiration date and sends reminders to owners and stakeholders.</p>
            </div>
            
            <h4 className="font-semibold text-lg mb-2">Flow Steps:</h4>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                <strong>Trigger:</strong> Recurrence (Daily at a specified time)
              </li>
              <li>
                <strong>Get Exceptions:</strong> Get all active exceptions from the "Exception Requests" SharePoint list
              </li>
              <li>
                <strong>Apply to Each:</strong> For each active exception, check expiration date
              </li>
              <li>
                <strong>Condition:</strong> Calculate if expiration is within 30, 14, or 7 days
              </li>
              <li>
                <strong>Get Owner Details:</strong> Look up exception owner's email from SharePoint/Azure AD
              </li>
              <li>
                <strong>Send Reminder Email:</strong> Send appropriate reminder based on days until expiration
              </li>
              <li>
                <strong>Update Exception:</strong> Add tag or note that reminder was sent
              </li>
              <li>
                <strong>Condition:</strong> Check for expired exceptions that are still active
              </li>
              <li>
                <strong>Update Expired Status:</strong> Mark exceptions as "Expired" when past their expiration date
              </li>
              <li>
                <strong>Send Expiration Notice:</strong> Notify stakeholders that an exception has expired
              </li>
            </ol>
            
            <div className="bg-muted p-4 rounded-md mt-4">
              <h4 className="font-semibold mb-2">Reminder Schedule Configuration:</h4>
              <p className="mb-2">Configure reminders to be sent at these intervals before expiration:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>30 days before expiration: Early warning</li>
                <li>14 days before expiration: Action reminder</li>
                <li>7 days before expiration: Urgent reminder</li>
                <li>On expiration day: Final notice</li>
                <li>After expiration: Expired notification and status change</li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
