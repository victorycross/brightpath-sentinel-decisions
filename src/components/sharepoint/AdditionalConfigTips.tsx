
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, FileDown } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export function AdditionalConfigTips() {
  const { toast } = useToast();
  
  const generateContent = () => {
    return `# Additional Configuration Tips
Best practices for optimizing your SharePoint lists

## Creating Indexes
For better performance, create indexes on frequently queried fields:
- Status field in Exception Requests list
- SubmittedBy field in Exception Requests list
- RequestID field in Exception Approval History list
- ApproverRole fields in both Approvers and Approval History lists

## Validation Settings
Add column validation to enforce data quality:
- For ExpiryDate: [ExpiryDate] > [SubmittedDate]
- Ensure Title fields have minimum length requirements

## Versioning
Enable versioning on all lists to track changes over time:
1. Go to List Settings
2. Click on "Versioning settings"
3. Select "Create a version each time you edit an item in this list"
4. Set the number of versions to keep (recommend: 10)
5. Click "OK"

## Power App Integration
These SharePoint lists are designed to work seamlessly with the Power App and Copilot implementation described in the Power App Setup and Copilot Guide pages. The field names and types are specifically chosen to facilitate easy integration.

## Pro Tip
After creating your lists, consider creating a few test items to verify your configuration. This will help you identify any issues before connecting to Power Apps and Copilot.
`;
  };
  
  const handleCopyContent = () => {
    const content = generateContent();
    navigator.clipboard.writeText(content);
    toast({
      title: "Content Copied",
      description: "Configuration tips have been copied to clipboard.",
      duration: 3000,
    });
  };
  
  const handleDownloadText = () => {
    const content = generateContent();
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "SharePoint_Config_Tips.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Text File Downloaded",
      description: "Configuration tips have been downloaded as a text file.",
      duration: 3000,
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Additional Configuration Tips</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleCopyContent}>
              <Copy className="mr-2 h-4 w-4" />
              Copy
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownloadText}>
              <FileDown className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>
        </div>
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
