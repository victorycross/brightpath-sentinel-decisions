
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Download, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { downloadAllCopilotGuides } from "@/components/sharepoint/utils/downloadUtils";

export function CopilotGuide() {
  const { toast } = useToast();

  const copyToClipboard = (text: string, itemName: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: `${itemName} has been copied to your clipboard.`,
    });
  };

  const downloadFile = (content: string, filename: string) => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    toast({
      title: "File Downloaded",
      description: `${filename} has been downloaded.`,
    });
  };

  const copilotGuideContent = `# Copilot Studio Implementation Guide

## Overview
This guide provides instructions for setting up your Copilot Studio agent for the Exception Management System.

## Prerequisites
- Microsoft 365 account with Copilot Studio access
- Understanding of your exception management process
- SharePoint lists already set up (see SharePoint Setup Guide)

## Steps for Creating Your Copilot
1. Access Copilot Studio
2. Create a new Copilot
3. Configure the exception management topics
4. Connect to SharePoint lists
5. Test and publish your Copilot
6. Integrate with Power Apps

For detailed steps, please refer to the full Copilot Studio documentation.
`;

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <Card className="p-6 md:p-8 bg-gradient-to-br from-card to-secondary/10 backdrop-blur-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Copilot Studio Implementation Guide
            </h1>
            <p className="text-muted-foreground mt-2">
              Building an AI assistant for your Exception Management System
            </p>
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={() => downloadFile(copilotGuideContent, "copilot-guide-overview.txt")}
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              Download Overview
            </Button>
            <Button 
              onClick={downloadAllCopilotGuides}
              className="gap-2"
              variant="default"
            >
              <Download className="h-4 w-4" />
              Download All Files
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Copilot Studio Setup</CardTitle>
            <CardDescription>
              Step-by-step guide to creating your Exception Management Copilot
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-4 rounded-md mb-4 max-h-96 overflow-y-auto">
              <pre className="whitespace-pre-wrap text-sm">{copilotGuideContent}</pre>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <Card className="p-4 border border-primary/20">
                <h3 className="font-semibold mb-2 flex items-center">
                  <Info className="w-4 h-4 mr-2 text-blue-500" /> Key Components
                </h3>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Topics for handling different exception types</li>
                  <li>Actions to create and modify exception requests</li>
                  <li>SharePoint integration for data access</li>
                  <li>Power Automate flows for complex operations</li>
                  <li>Testing scenarios for validation</li>
                </ul>
              </Card>
              <Card className="p-4 border border-secondary/20">
                <h3 className="font-semibold mb-2 flex items-center">
                  <Info className="w-4 h-4 mr-2 text-green-500" /> Best Practices
                </h3>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Include multiple phrasings for each topic</li>
                  <li>Test with different user personas</li>
                  <li>Add clear error handling for edge cases</li>
                  <li>Implement proper authentication checks</li>
                  <li>Use variables to personalize responses</li>
                </ul>
              </Card>
            </div>
            
            <div className="flex justify-end gap-2 mt-4">
              <Button 
                variant="outline" 
                onClick={() => copyToClipboard(copilotGuideContent, "Copilot guide")}
                className="gap-2"
              >
                <Copy className="h-4 w-4" />
                Copy Guide
              </Button>
              <Button 
                onClick={() => downloadFile(copilotGuideContent, "copilot-guide.txt")}
                className="gap-2"
              >
                <Download className="h-4 w-4" />
                Download Guide
              </Button>
            </div>
          </CardContent>
        </Card>
      </Card>
    </div>
  );
}
