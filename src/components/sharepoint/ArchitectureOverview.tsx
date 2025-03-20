
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, FileDown } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export function ArchitectureOverview() {
  const { toast } = useToast();
  
  const generateContent = () => {
    return `# SharePoint List Architecture Overview

The Exception Management System requires several SharePoint lists to store and manage data effectively. This guide will walk you through setting up each list with the correct fields and configurations.

For optimal performance and integration with Power Apps and Copilot, we recommend creating these lists in a dedicated SharePoint site. This approach helps organize your data and simplifies permissions management.

## Prerequisites
- SharePoint Online site with admin or owner permissions
- Basic understanding of SharePoint list creation
- Microsoft 365 account with appropriate licenses
`;
  };
  
  const handleCopyContent = () => {
    const content = generateContent();
    navigator.clipboard.writeText(content);
    toast({
      title: "Content Copied",
      description: "Architecture overview has been copied to clipboard.",
      duration: 3000,
    });
  };
  
  const handleDownloadText = () => {
    const content = generateContent();
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "SharePoint_Architecture_Overview.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Text File Downloaded",
      description: "Architecture overview has been downloaded as a text file.",
      duration: 3000,
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>SharePoint List Architecture Overview</CardTitle>
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
  );
}
