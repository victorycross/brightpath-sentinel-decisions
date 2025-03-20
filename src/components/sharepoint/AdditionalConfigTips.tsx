
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function AdditionalConfigTips() {
  return (
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
  );
}
