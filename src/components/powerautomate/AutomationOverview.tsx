
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, FileDown } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export function AutomationOverview() {
  const { toast } = useToast();
  
  const generateContent = () => {
    return `# Power Automate Flow Architecture Overview

The Exception Management System requires several automated flows to handle the approval process, notifications, and updates. This guide will walk you through setting up each flow with the correct triggers, actions, and conditions.

For optimal performance and integration with SharePoint and Power Apps, we recommend creating these flows in a dedicated solution. This approach helps organize your flows and simplifies permissions management.

## Prerequisites
- Power Automate license (Standard or Premium depending on connector needs)
- Access to SharePoint lists created in the SharePoint setup
- Understanding of basic flow creation in Power Automate
- Microsoft 365 account with appropriate licenses
`;
  };
  
  const handleCopyContent = () => {
    const content = generateContent();
    navigator.clipboard.writeText(content);
    toast({
      title: "Content Copied",
      description: "Automation overview has been copied to clipboard.",
      duration: 3000,
    });
  };
  
  const handleDownloadText = () => {
    const content = generateContent();
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "PowerAutomate_Architecture_Overview.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Text File Downloaded",
      description: "Automation overview has been downloaded as a text file.",
      duration: 3000,
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Power Automate Flow Architecture Overview</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleCopyContent}>
              <Copy className="h-4 w-4" />
              Copy
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownloadText}>
              <FileDown className="h-4 w-4" />
              Download
            </Button>
          </div>
        </div>
        <CardDescription>
          The Exception Management System requires several automated flows to handle the approval process, notifications, and updates. This guide will walk you through setting up each flow with the correct triggers, actions, and conditions.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mb-4">
          For optimal performance and integration with SharePoint and Power Apps, we recommend creating these flows in a dedicated solution. This approach helps organize your flows and simplifies permissions management.
        </p>

        <h3 className="text-lg font-semibold mb-2">Prerequisites</h3>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Power Automate license (Standard or Premium depending on connector needs)</li>
          <li>Access to SharePoint lists created in the SharePoint setup</li>
          <li>Understanding of basic flow creation in Power Automate</li>
          <li>Microsoft 365 account with appropriate licenses</li>
        </ul>
      </CardContent>
    </Card>
  );
}
