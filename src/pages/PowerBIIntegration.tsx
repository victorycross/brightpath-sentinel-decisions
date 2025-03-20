
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Download, Info, ArrowRight, CheckCircle, BarChart, AreaChart, PieChart, LineChart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function PowerBIIntegration() {
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

  const downloadAllPowerBIGuides = () => {
    // Combine all content
    const allContent = `# Power BI Integration Guide

${powerBIOverviewContent}

${powerBISetupGuide}

${powerBIDashboardGuide}

${powerBIEmbeddingGuide}
`;

    // Create and download the file
    const blob = new Blob([allContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "PowerBI_Complete_Guide.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Power BI Overview Guide
  const powerBIOverviewContent = `# Power BI Integration Overview

## What is Power BI?
Power BI is Microsoft's business analytics solution that allows you to visualize your data and share insights across your organization. When integrated with your Exception Management System, it provides powerful reporting and analytics capabilities.

## Benefits of Power BI Integration
- **Comprehensive Analytics**: Create detailed reports on exception trends, approval times, and risk levels
- **Interactive Dashboards**: Build interactive visualizations for stakeholders to explore data
- **Automated Reporting**: Schedule and distribute reports to key stakeholders automatically
- **Data-Driven Decisions**: Enable better decision-making with real-time insights into exception patterns
- **Seamless Microsoft Integration**: Works seamlessly with SharePoint, Power Apps, and Copilot Studio

## Integration Options
1. **Power BI Reports**: Create standalone reports that connect to your SharePoint data
2. **Embedded Analytics**: Embed Power BI visuals directly into your Power Apps
3. **Power BI Dashboards**: Share dashboards with stakeholders via the Power BI service
4. **Power BI Mobile**: Access insights on mobile devices with the Power BI mobile app

## Prerequisites
- Power BI Desktop (free download for report creation)
- Power BI Pro/Premium license (for sharing and collaboration)
- Access to your SharePoint lists data
- Basic understanding of data visualization concepts

## Implementation Approach
This guide will walk you through:
1. Setting up data connections from Power BI to your SharePoint data
2. Creating essential reports and dashboards for exception management
3. Embedding Power BI visuals into your Power App
4. Sharing insights with stakeholders
`;

  // Power BI Setup Guide
  const powerBISetupGuide = `# Getting Started with Power BI for Exception Management

## Step 1: Install Power BI Desktop
1. Go to https://powerbi.microsoft.com/desktop/
2. Download and install Power BI Desktop
3. Sign in with your Microsoft 365 account

## Step 2: Connect to SharePoint Data
1. Open Power BI Desktop
2. Click "Get Data" from the Home ribbon
3. Select "SharePoint Online List"
4. Enter your SharePoint site URL
5. Select the following lists:
   - Exception Requests
   - Exception Approvers
   - Exception Approval History
6. Click "Load" to import the data

## Step 3: Transform the Data
1. Click "Transform Data" to open Power Query Editor
2. Perform these common transformations:
   - Remove unnecessary columns
   - Rename columns for clarity
   - Change data types as needed
   - Create calculated columns for analysis
   - Format dates consistently
3. Create relationships between your tables:
   - Link Exception Requests to Approval History using RequestID
   - Link Approvers to Approval History using ApproverID

## Step 4: Create a Data Model
1. Switch to "Model view" in Power BI Desktop
2. Create these essential measures:
   - Total Exceptions = COUNT(ExceptionRequests[ID])
   - Approved Exceptions = COUNTX(FILTER(ExceptionRequests, ExceptionRequests[Status]="Approved"), ExceptionRequests[ID])
   - Approval Rate = DIVIDE([Approved Exceptions], [Total Exceptions])
   - Average Approval Time (Days) = AVERAGEX(FILTER(ExceptionRequests, ExceptionRequests[Status]="Approved"), DATEDIFF(ExceptionRequests[SubmittedDate], ExceptionRequests[ApprovedDate], DAY))

3. Create these calculated columns:
   - Month = FORMAT(ExceptionRequests[SubmittedDate], "MMMM YYYY")
   - Quarter = "Q" & FORMAT(QUARTER(ExceptionRequests[SubmittedDate]), "0") & " " & YEAR(ExceptionRequests[SubmittedDate])
   - Age (Days) = DATEDIFF(ExceptionRequests[SubmittedDate], TODAY(), DAY)

## Step 5: Save Your Work
1. Save the Power BI Desktop file (.pbix)
2. Use a descriptive name like "Exception Management Analytics"
3. Store in a shared location for team access
`;

  // Power BI Dashboard Guide
  const powerBIDashboardGuide = `# Creating Essential Exception Management Dashboards

## Executive Summary Dashboard
This dashboard provides high-level metrics for leadership.

1. Create a new page named "Executive Summary"
2. Add the following visuals:
   - Card visuals for key metrics:
     - Total Exception Requests
     - Approval Rate
     - Average Processing Time
     - Exceptions Expiring Soon
   - Line chart showing exceptions over time
   - Donut chart showing exceptions by status
   - Bar chart showing exceptions by type
   - Map showing exceptions by location (if applicable)

## Risk Analysis Dashboard
This dashboard helps risk managers identify trends and concerns.

1. Create a new page named "Risk Analysis"
2. Add the following visuals:
   - Heat map of risk levels by department
   - Scatter plot of risk level vs. business impact
   - Column chart of high-risk exceptions over time
   - Table of top 10 high-risk exceptions with details
   - Line chart showing risk level trends by type

## Approver Performance Dashboard
This dashboard helps monitor the approval process efficiency.

1. Create a new page named "Approver Performance"
2. Add the following visuals:
   - Bar chart of average approval time by approver
   - Funnel chart showing approval process stages
   - Card visuals for:
     - Average Approval Time
     - Fastest Approver
     - Slowest Approver
     - Pending Approvals
   - Table of oldest pending approvals

## Exception Compliance Dashboard
This dashboard tracks compliance with exception policies.

1. Create a new page named "Compliance"
2. Add the following visuals:
   - Gauge charts for compliance metrics
   - Column chart of exceptions by expiration status
   - Line chart of expiring exceptions by month
   - Table of expired exceptions
   - Matrix of compliance by department and exception type

## Adding Interactivity
1. Create slicers for common filters:
   - Date range
   - Exception type
   - Department
   - Risk level
   - Status

2. Add drill-through functionality:
   - Create a detail page with exception specifics
   - Enable drill-through from summary visuals to details

3. Configure cross-filtering between visuals
`;

  // Power BI Embedding Guide
  const powerBIEmbeddingGuide = `# Embedding Power BI in Your Exception Management App

## Option 1: Embed in Power Apps
Embed interactive Power BI reports directly in your Power App.

1. **Publish your report**:
   - In Power BI Desktop, click "Publish"
   - Select a workspace (create one if needed)
   - Wait for publication to complete

2. **Get the report details**:
   - In Power BI service, open the published report
   - Copy the report ID from the URL
   - Note the workspace ID as well

3. **Add to Power Apps**:
   - In your Power App, go to the Insert panel
   - Select "Power BI tile"
   - Configure with your workspace and report IDs
   - Set appropriate sizing and position

4. **Configure interactivity**:
   - Add filter parameters to show relevant data
   - Example: Filter(Report, RequestedBy = User().Email)

## Option 2: Embed in SharePoint
Create a Power BI web part in SharePoint for broader access.

1. **Create a SharePoint page**:
   - Go to your SharePoint site
   - Click "New" > "Page"
   - Choose a template

2. **Add Power BI web part**:
   - Click the "+" to add a web part
   - Select "Power BI"
   - Choose your report from the list
   - Configure size and appearance

3. **Set page permissions**:
   - Ensure viewers have access to both SharePoint and the Power BI report
   - Consider creating a specific SharePoint group for report viewers

## Option 3: Using Power BI Embed Tokens (Advanced)
For custom web applications with embedded analytics.

1. **Register an application in Azure AD**
2. **Generate embed tokens using Power BI REST API**
3. **Use the JavaScript embedding SDK**
4. **Handle authentication and authorization**

## Option 4: Power BI Mobile
Enable access to reports on mobile devices.

1. **Optimize reports for mobile**:
   - Create mobile layouts in Power BI Desktop
   - Test on various screen sizes

2. **Set up Power BI Mobile app**:
   - Install from app stores
   - Sign in with Microsoft 365 account
   - Access reports and dashboards on the go
`;

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <Card className="p-6 md:p-8 bg-gradient-to-br from-card to-secondary/10 backdrop-blur-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Power BI Integration Guide
            </h1>
            <p className="text-muted-foreground mt-2">
              Adding powerful analytics and reporting to your Exception Management System
            </p>
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={() => downloadFile(powerBIOverviewContent, "power-bi-overview.txt")}
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              Download Overview
            </Button>
            <Button 
              onClick={downloadAllPowerBIGuides}
              className="gap-2"
              variant="default"
            >
              <Download className="h-4 w-4" />
              Download All Files
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full mb-6">
            <TabsTrigger value="overview">
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4" />
                <span className="hidden sm:inline">Overview</span>
                <span className="sm:hidden">Overview</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="setup">
              <div className="flex items-center gap-2">
                <BarChart className="h-4 w-4" />
                <span className="hidden sm:inline">Setup Guide</span>
                <span className="sm:hidden">Setup</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="dashboards">
              <div className="flex items-center gap-2">
                <PieChart className="h-4 w-4" />
                <span className="hidden sm:inline">Dashboards</span>
                <span className="sm:hidden">Dashboards</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="embedding">
              <div className="flex items-center gap-2">
                <AreaChart className="h-4 w-4" />
                <span className="hidden sm:inline">Embedding</span>
                <span className="sm:hidden">Embed</span>
              </div>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Power BI Integration Overview</CardTitle>
                <CardDescription>
                  Understanding the benefits of adding Power BI to your Exception Management System
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-4 rounded-md mb-4 max-h-96 overflow-y-auto">
                  <pre className="whitespace-pre-wrap text-sm">{powerBIOverviewContent}</pre>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <Card className="p-4 border border-primary/20">
                    <h3 className="font-semibold mb-2 flex items-center">
                      <Info className="w-4 h-4 mr-2 text-blue-500" /> Key Benefits
                    </h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Transform raw data into actionable insights</li>
                      <li>Self-service reporting for stakeholders</li>
                      <li>Automated notifications on key metrics</li>
                      <li>Rich visualizations for complex data</li>
                      <li>Secure sharing within your organization</li>
                    </ul>
                  </Card>
                  <Card className="p-4 border border-secondary/20">
                    <h3 className="font-semibold mb-2 flex items-center">
                      <ArrowRight className="w-4 h-4 mr-2 text-green-500" /> Integration Points
                    </h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>SharePoint lists as data sources</li>
                      <li>Embedded reports in Power Apps</li>
                      <li>Shared dashboards for stakeholders</li>
                      <li>Mobile access for on-the-go insights</li>
                      <li>Automated data refresh schedules</li>
                    </ul>
                  </Card>
                </div>
                
                <div className="flex justify-end gap-2 mt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => copyToClipboard(powerBIOverviewContent, "Power BI overview")}
                    className="gap-2"
                  >
                    <Copy className="h-4 w-4" />
                    Copy Overview
                  </Button>
                  <Button 
                    onClick={() => downloadFile(powerBIOverviewContent, "power-bi-overview.txt")}
                    className="gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download Overview
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="setup" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Power BI Setup Guide</CardTitle>
                <CardDescription>
                  Step-by-step instructions for connecting Power BI to your SharePoint data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-4 rounded-md mb-4 max-h-96 overflow-y-auto">
                  <pre className="whitespace-pre-wrap text-sm">{powerBISetupGuide}</pre>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <Card className="p-4 border border-primary/20">
                    <h3 className="font-semibold mb-2 flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-500" /> Data Model Tips
                    </h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Create star schema for optimal performance</li>
                      <li>Use calculated columns for static calculations</li>
                      <li>Use measures for dynamic aggregations</li>
                      <li>Create date tables for time intelligence</li>
                      <li>Document field descriptions for other users</li>
                    </ul>
                  </Card>
                  <Card className="p-4 border border-secondary/20">
                    <h3 className="font-semibold mb-2 flex items-center">
                      <ArrowRight className="w-4 h-4 mr-2 text-blue-500" /> Data Refresh Strategy
                    </h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Set up automatic refreshes in Power BI service</li>
                      <li>Schedule refreshes during off-peak hours</li>
                      <li>Consider incremental refresh for large datasets</li>
                      <li>Monitor refresh history for failures</li>
                      <li>Set up alerts for refresh failures</li>
                    </ul>
                  </Card>
                </div>
                
                <div className="flex justify-end gap-2 mt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => copyToClipboard(powerBISetupGuide, "Power BI setup guide")}
                    className="gap-2"
                  >
                    <Copy className="h-4 w-4" />
                    Copy Guide
                  </Button>
                  <Button 
                    onClick={() => downloadFile(powerBISetupGuide, "power-bi-setup-guide.txt")}
                    className="gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download Guide
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="dashboards" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Essential Dashboards</CardTitle>
                <CardDescription>
                  Creating powerful visualizations for your Exception Management System
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-4 rounded-md mb-4 max-h-96 overflow-y-auto">
                  <pre className="whitespace-pre-wrap text-sm">{powerBIDashboardGuide}</pre>
                </div>
                
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="executive">
                    <AccordionTrigger>Executive Dashboard Components</AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li><strong>KPI Cards:</strong> Total requests, approval rate, avg. time</li>
                        <li><strong>Trend Analysis:</strong> Line charts showing exception volume over time</li>
                        <li><strong>Status Breakdown:</strong> Donut chart of current statuses</li>
                        <li><strong>Risk Matrix:</strong> Heat map of risk vs. impact</li>
                        <li><strong>Top Departments:</strong> Bar chart of exceptions by department</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="risk">
                    <AccordionTrigger>Risk Analysis Components</AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li><strong>Risk Profile:</strong> Distribution of exceptions by risk level</li>
                        <li><strong>Risk Trends:</strong> How risk levels change over time</li>
                        <li><strong>Department Risk:</strong> Which departments have highest risk requests</li>
                        <li><strong>Risk Drivers:</strong> Common reasons for high-risk exceptions</li>
                        <li><strong>Risk vs. Approval:</strong> Correlation between risk level and approval rates</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="approver">
                    <AccordionTrigger>Approver Dashboard Components</AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li><strong>My Queue:</strong> Current pending approvals with aging</li>
                        <li><strong>Approval Performance:</strong> Average time to approve by approver</li>
                        <li><strong>Bottleneck Analysis:</strong> Identify slowest approval stages</li>
                        <li><strong>Decision Distribution:</strong> Approve vs. reject ratios</li>
                        <li><strong>Workload Distribution:</strong> Volume of requests by approver</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                
                <div className="flex justify-end gap-2 mt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => copyToClipboard(powerBIDashboardGuide, "Power BI dashboard guide")}
                    className="gap-2"
                  >
                    <Copy className="h-4 w-4" />
                    Copy Guide
                  </Button>
                  <Button 
                    onClick={() => downloadFile(powerBIDashboardGuide, "power-bi-dashboard-guide.txt")}
                    className="gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download Guide
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="embedding" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Embedding Power BI</CardTitle>
                <CardDescription>
                  Integrating Power BI reports into your Power Apps and SharePoint
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-4 rounded-md mb-4 max-h-96 overflow-y-auto">
                  <pre className="whitespace-pre-wrap text-sm">{powerBIEmbeddingGuide}</pre>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <Card className="p-4 border border-primary/20">
                    <h3 className="font-semibold mb-2 flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-500" /> Embedding Options
                    </h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li><strong>Power Apps Integration:</strong> Embedded directly in your app</li>
                      <li><strong>SharePoint Web Part:</strong> Embedded in SharePoint pages</li>
                      <li><strong>Teams Tab:</strong> Available in Microsoft Teams</li>
                      <li><strong>Custom Web App:</strong> Using embed tokens and JavaScript</li>
                      <li><strong>Power BI Mobile:</strong> Access on mobile devices</li>
                    </ul>
                  </Card>
                  <Card className="p-4 border border-secondary/20">
                    <h3 className="font-semibold mb-2 flex items-center">
                      <ArrowRight className="w-4 h-4 mr-2 text-blue-500" /> Security Considerations
                    </h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li><strong>Row-Level Security:</strong> Limit data access by user</li>
                      <li><strong>Workspace Permissions:</strong> Control who can edit reports</li>
                      <li><strong>App Permissions:</strong> Manage who can view embedded reports</li>
                      <li><strong>Audit Logging:</strong> Track usage and access patterns</li>
                      <li><strong>Secure Embed:</strong> Proper authentication for embedded scenarios</li>
                    </ul>
                  </Card>
                </div>
                
                <div className="flex justify-end gap-2 mt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => copyToClipboard(powerBIEmbeddingGuide, "Power BI embedding guide")}
                    className="gap-2"
                  >
                    <Copy className="h-4 w-4" />
                    Copy Guide
                  </Button>
                  <Button 
                    onClick={() => downloadFile(powerBIEmbeddingGuide, "power-bi-embedding-guide.txt")}
                    className="gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download Guide
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
