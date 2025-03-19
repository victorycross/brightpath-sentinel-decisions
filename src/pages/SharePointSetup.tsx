
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileDown } from "lucide-react";

export function SharePointSetup() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">SharePoint List Setup Guide</h1>
            <p className="text-muted-foreground mt-2">
              Complete guide to configure SharePoint lists for the Exception Management System
            </p>
          </div>
          <Button className="mt-4 md:mt-0" variant="outline">
            <FileDown className="mr-2 h-4 w-4" />
            Download Complete Guide
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>SharePoint List Architecture Overview</CardTitle>
            <CardDescription>
              The Exception Management System requires several SharePoint lists to store and manage data effectively. This guide will walk you through setting up each list with the correct fields and configurations.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              For optimal performance and integration with Power Apps and Copilot, we recommend creating these lists in a dedicated SharePoint site. This approach helps organize your data and simplifies permissions management.
            </p>

            <h3 className="text-lg font-semibold mb-2">Prerequisites</h3>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>SharePoint Online site with admin or owner permissions</li>
              <li>Basic understanding of SharePoint list creation</li>
              <li>Microsoft 365 account with appropriate licenses</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Exception Requests List</CardTitle>
            <CardDescription>
              The primary list that stores all exception requests and their details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <h3 className="text-lg font-semibold mb-4">List Configuration</h3>
            <ol className="list-decimal pl-6 mb-6 space-y-2">
              <li>Navigate to your SharePoint site</li>
              <li>Click on "New" and select "List"</li>
              <li>Name the list "Exception Requests"</li>
              <li>Add a description: "Stores all exception requests and their details"</li>
              <li>Click "Create"</li>
            </ol>

            <h3 className="text-lg font-semibold mb-4">Required Fields</h3>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Field Name</TableHead>
                    <TableHead>Field Type</TableHead>
                    <TableHead>Required</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Title</TableCell>
                    <TableCell>Single line of text</TableCell>
                    <TableCell>Yes</TableCell>
                    <TableCell>Title of the exception request</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">RequestType</TableCell>
                    <TableCell>Choice</TableCell>
                    <TableCell>Yes</TableCell>
                    <TableCell>
                      Type of exception (Cyber, Legal, Independence, QMR, Client Acceptance, Engagement Risk, Audit Finding, Data, AI)
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Description</TableCell>
                    <TableCell>Multiple lines of text</TableCell>
                    <TableCell>Yes</TableCell>
                    <TableCell>Detailed description of the exception request</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Impact</TableCell>
                    <TableCell>Multiple lines of text</TableCell>
                    <TableCell>Yes</TableCell>
                    <TableCell>Description of the impact if exception is approved</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">MitigatingFactors</TableCell>
                    <TableCell>Multiple lines of text</TableCell>
                    <TableCell>Yes</TableCell>
                    <TableCell>Actions taken to reduce risk</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">ResidualRisk</TableCell>
                    <TableCell>Choice</TableCell>
                    <TableCell>Yes</TableCell>
                    <TableCell>Risk level (High, Medium, Low)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Status</TableCell>
                    <TableCell>Choice</TableCell>
                    <TableCell>Yes</TableCell>
                    <TableCell>Current status (Pending, Assigned, Approved, Rejected)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">SubmittedBy</TableCell>
                    <TableCell>Person or Group</TableCell>
                    <TableCell>Yes</TableCell>
                    <TableCell>User who submitted the request</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">SubmittedDate</TableCell>
                    <TableCell>Date and Time</TableCell>
                    <TableCell>Yes</TableCell>
                    <TableCell>Date and time the request was submitted</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">ExpiryDate</TableCell>
                    <TableCell>Date and Time</TableCell>
                    <TableCell>No</TableCell>
                    <TableCell>Date when the exception expires</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">ApproverComments</TableCell>
                    <TableCell>Multiple lines of text</TableCell>
                    <TableCell>No</TableCell>
                    <TableCell>Feedback from approvers</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">SupportingDocuments</TableCell>
                    <TableCell>Hyperlink or Picture</TableCell>
                    <TableCell>No</TableCell>
                    <TableCell>Links to supporting documentation</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <h3 className="text-lg font-semibold mt-6 mb-4">Choice Field Values</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-md p-4">
                <h4 className="font-semibold mb-2">RequestType Options:</h4>
                <ul className="list-disc pl-6 space-y-1">
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
              </div>
              <div className="border rounded-md p-4">
                <h4 className="font-semibold mb-2">Status Options:</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Pending</li>
                  <li>Assigned</li>
                  <li>Approved</li>
                  <li>Rejected</li>
                </ul>
              </div>
              <div className="border rounded-md p-4">
                <h4 className="font-semibold mb-2">ResidualRisk Options:</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>High</li>
                  <li>Medium</li>
                  <li>Low</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Approvers List</CardTitle>
            <CardDescription>
              Stores information about users who can approve exception requests
            </CardDescription>
          </CardHeader>
          <CardContent>
            <h3 className="text-lg font-semibold mb-4">List Configuration</h3>
            <ol className="list-decimal pl-6 mb-6 space-y-2">
              <li>Navigate to your SharePoint site</li>
              <li>Click on "New" and select "List"</li>
              <li>Name the list "Exception Approvers"</li>
              <li>Add a description: "Users who can approve exception requests"</li>
              <li>Click "Create"</li>
            </ol>

            <h3 className="text-lg font-semibold mb-4">Required Fields</h3>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Field Name</TableHead>
                    <TableHead>Field Type</TableHead>
                    <TableHead>Required</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Title</TableCell>
                    <TableCell>Single line of text</TableCell>
                    <TableCell>Yes</TableCell>
                    <TableCell>Display name for the approver role</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">User</TableCell>
                    <TableCell>Person or Group</TableCell>
                    <TableCell>Yes</TableCell>
                    <TableCell>The user assigned to this approver role</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">ApproverRole</TableCell>
                    <TableCell>Choice</TableCell>
                    <TableCell>Yes</TableCell>
                    <TableCell>
                      Type of approval role (Cyber, Legal, Independence, QMR, Client, Risk, Audit, Data, AI)
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">IsActive</TableCell>
                    <TableCell>Yes/No</TableCell>
                    <TableCell>Yes</TableCell>
                    <TableCell>Whether this approver is currently active</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Department</TableCell>
                    <TableCell>Single line of text</TableCell>
                    <TableCell>No</TableCell>
                    <TableCell>Department the approver belongs to</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <h3 className="text-lg font-semibold mt-6 mb-4">Choice Field Values</h3>
            <div className="border rounded-md p-4">
              <h4 className="font-semibold mb-2">ApproverRole Options:</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Cyber Approver</li>
                <li>Legal Approver</li>
                <li>Independence Approver</li>
                <li>QMR Approver</li>
                <li>Client Acceptance Approver</li>
                <li>Risk Approver</li>
                <li>Audit Approver</li>
                <li>Data Approver</li>
                <li>AI Approver</li>
                <li>Admin Approver</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Exception Approval History List</CardTitle>
            <CardDescription>
              Tracks the approval flow and history for each exception request
            </CardDescription>
          </CardHeader>
          <CardContent>
            <h3 className="text-lg font-semibold mb-4">List Configuration</h3>
            <ol className="list-decimal pl-6 mb-6 space-y-2">
              <li>Navigate to your SharePoint site</li>
              <li>Click on "New" and select "List"</li>
              <li>Name the list "Exception Approval History"</li>
              <li>Add a description: "Tracks the approval flow and history"</li>
              <li>Click "Create"</li>
            </ol>

            <h3 className="text-lg font-semibold mb-4">Required Fields</h3>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Field Name</TableHead>
                    <TableHead>Field Type</TableHead>
                    <TableHead>Required</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Title</TableCell>
                    <TableCell>Single line of text</TableCell>
                    <TableCell>Yes</TableCell>
                    <TableCell>Auto-generated title (Request ID + timestamp)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">RequestID</TableCell>
                    <TableCell>Lookup</TableCell>
                    <TableCell>Yes</TableCell>
                    <TableCell>Link to the Exception Request item</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Approver</TableCell>
                    <TableCell>Person or Group</TableCell>
                    <TableCell>Yes</TableCell>
                    <TableCell>User who performed the approval action</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Action</TableCell>
                    <TableCell>Choice</TableCell>
                    <TableCell>Yes</TableCell>
                    <TableCell>Action taken (Approved, Rejected, Returned for Info)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Comments</TableCell>
                    <TableCell>Multiple lines of text</TableCell>
                    <TableCell>No</TableCell>
                    <TableCell>Approver's comments</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">ActionDate</TableCell>
                    <TableCell>Date and Time</TableCell>
                    <TableCell>Yes</TableCell>
                    <TableCell>When the approval action was taken</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">ApproverRole</TableCell>
                    <TableCell>Choice</TableCell>
                    <TableCell>Yes</TableCell>
                    <TableCell>Role of the approver who took action</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Additional Configuration Tips</CardTitle>
            <CardDescription>
              Best practices for optimizing your SharePoint lists
            </CardDescription>
          </CardHeader>
          <CardContent>
            <h3 className="text-lg font-semibold mb-3">Creating Indexes</h3>
            <p className="mb-4">
              For better performance, create indexes on frequently queried fields:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-1">
              <li>Status field in Exception Requests list</li>
              <li>SubmittedBy field in Exception Requests list</li>
              <li>RequestID field in Exception Approval History list</li>
              <li>ApproverRole fields in both Approvers and Approval History lists</li>
            </ul>

            <h3 className="text-lg font-semibold mb-3">Validation Settings</h3>
            <p className="mb-4">
              Add column validation to enforce data quality:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-1">
              <li>For ExpiryDate: <code>[ExpiryDate] &gt; [SubmittedDate]</code></li>
              <li>Ensure Title fields have minimum length requirements</li>
            </ul>

            <h3 className="text-lg font-semibold mb-3">Versioning</h3>
            <p className="mb-4">
              Enable versioning on all lists to track changes over time:
            </p>
            <ol className="list-decimal pl-6 mb-6 space-y-2">
              <li>Go to List Settings</li>
              <li>Click on "Versioning settings"</li>
              <li>Select "Create a version each time you edit an item in this list"</li>
              <li>Set the number of versions to keep (recommend: 10)</li>
              <li>Click "OK"</li>
            </ol>

            <h3 className="text-lg font-semibold mb-3">Power App Integration</h3>
            <p className="mb-6">
              These SharePoint lists are designed to work seamlessly with the Power App and Copilot implementation described in the Power App Setup and Copilot Guide pages. The field names and types are specifically chosen to facilitate easy integration.
            </p>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md border border-blue-200 dark:border-blue-800">
              <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Pro Tip</h4>
              <p className="text-blue-700 dark:text-blue-300">
                After creating your lists, consider creating a few test items to verify your configuration. This will help you identify any issues before connecting to Power Apps and Copilot.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
