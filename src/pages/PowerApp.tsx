
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Download, Info, ArrowRight, CheckCircle, Code, Settings, Puzzle, Database } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { getRequirementsMarkdown } from "@/utils/requirementsExport";

export const PowerApp = () => {
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

  // Power App Setup Guide
  const powerAppSetupGuide = `
# Beginner's Guide: Setting Up Your Power App

## Prerequisites
1. Make sure you have a Microsoft 365 account with appropriate licenses
2. Ensure you have access to Power Apps (check with your IT admin if unsure)
3. Make sure your Copilot Studio agent is already created and published

## Step 1: Access Power Apps
1. Open your web browser
2. Go to https://make.powerapps.com/
3. Sign in with your Microsoft 365 account
4. If this is your first time, you might need to accept terms and conditions

## Step 2: Create a New Canvas App
1. On the Power Apps home page, click "Create" in the left navigation
2. Select "Canvas app from blank"
3. Enter "Exception Management App" as the name
4. Choose "Tablet" format (gives you more screen space to work with)
5. Click "Create" to continue

## Step 3: Set Up Your App Interface
1. In the canvas editor, you'll see a blank screen
2. In the left panel, click on "Insert" to add components
3. Add a header by inserting a rectangle at the top:
   - Click "Rectangle" in the shapes menu
   - Position it at the top of the screen
   - Set its fill color to your brand color
4. Add a title by inserting a label:
   - Click "Text label" in the controls menu
   - Position it in the header
   - Change the text to "Exception Management System"
   - Adjust font size, color, and alignment as needed

## Step 4: Create Navigation
1. Add a navigation panel on the left:
   - Insert another rectangle on the left side of the screen
   - Make it full height but about 1/5 of the screen width
   - Set its fill color slightly different from the header
2. Add navigation buttons:
   - Insert buttons for: "Dashboard", "Create Request", "My Requests", "Approvals"
   - Position them vertically in the navigation panel
   - Customize their appearance
   - For each button, set the OnSelect property to navigate to the respective screen

## Step 5: Add Screens
1. Add new screens for each section:
   - Click "New screen" in the top navigation
   - Create screens for: Dashboard, Create Request, My Requests, Approvals
2. Set up navigation between screens:
   - Go back to your buttons
   - Edit the OnSelect property for each button to use Navigate() function
   - Example: Navigate(Dashboard, ScreenTransition.Fade)

## Step 6: Integrate with SharePoint Lists
1. Connect to your data:
   - Click "Data" in the left sidebar
   - Click "Add data" and search for "SharePoint"
   - Connect to your SharePoint site
   - Select the "ExceptionRequests" list you created for your Copilot
2. Create a gallery to display requests:
   - Insert a "Vertical gallery" control on your My Requests screen
   - In the Properties panel, set the data source to your SharePoint list
   - Customize how each item appears in the gallery

## Step 7: Create Form for New Requests
1. On your Create Request screen:
   - Insert a Form control
   - Connect it to your ExceptionRequests SharePoint list
   - Add the relevant fields for your exception request
2. Add a Submit button:
   - Insert a button below the form
   - Set its OnSelect property to submit the form
   - Example: SubmitForm(RequestForm); Navigate(MyRequests, ScreenTransition.Cover)
`;

  // Copilot Integration Guide
  const copilotIntegrationGuide = `
# Beginner's Guide: Integrating Copilot with Your Power App

## What is Power Apps Integration?
Connecting your Copilot to Power Apps allows users to interact with your Copilot directly within your app.

## Step 1: Prepare Your Copilot
1. Make sure your Copilot is already set up in Copilot Studio
2. Ensure it's published and working correctly
3. Test it independently before integration

## Step 2: Add the Copilot Component
1. In your Power App canvas, click "Insert" in the left menu
2. Scroll down to "AI" section or search for "Copilot"
3. Select "Copilot" from the options
4. Draw the Copilot chat area on your canvas where you want it to appear
5. You may need to resize it to fit your design

## Step 3: Configure the Copilot Connection
1. With the Copilot component selected, look at the Properties panel
2. Find the "CopilotId" property
3. Enter the ID of your Copilot
   - You can find this in Copilot Studio under your Copilot's settings
   - It will look something like "12345678-abcd-1234-efgh-123456789012"
4. Set other properties like:
   - Height and width
   - DefaultOpen (true/false)
   - WelcomeMessage

## Step 4: Add Context Variables
1. To make your Copilot aware of what's happening in your app:
   - Create global variables in your app to track context
   - Example: Set(CurrentView, "Dashboard") when a user navigates to dashboard
2. Pass these variables to Copilot:
   - With the Copilot component selected
   - Add a custom parameter in the advanced properties
   - Name it something like "AppContext"
   - Value: CurrentView

## Step 5: Enable Actions from Copilot
1. Create functions in your app that Copilot can call:
   - Add a new Flow from the Power Automate section
   - Configure the Flow to perform actions like creating a new request
   - Make the Flow callable from Copilot
2. Connect these actions to your Copilot in Copilot Studio:
   - In Copilot Studio, add a new Action
   - Connect it to your Power Automate Flow
   - Configure input/output parameters

## Step 6: Test the Integration
1. Preview your app by clicking the "Play" button in the top right
2. Test the Copilot by:
   - Opening the Copilot interface
   - Asking questions about exceptions
   - Trying to create a new request through Copilot
   - Testing context awareness (does it know which screen you're on?)

## Step 7: Refine and Publish
1. Make adjustments based on testing:
   - Adjust Copilot positioning and size
   - Refine the interactions and context passing
   - Add more actions if needed
2. Publish your app:
   - Click "File" > "Save" to save your changes
   - Click "Publish" to make it available to users
   - Share the app with relevant users in your organization
`;

  // Power Automate Integration Guide
  const powerAutomateGuide = `
# Beginner's Guide: Adding Power Automate Flows to Your App

## What are Power Automate Flows?
Power Automate Flows allow you to automate actions and processes between your app and other services, like approval workflows.

## Step 1: Access Power Automate
1. Open your web browser
2. Go to https://flow.microsoft.com/
3. Sign in with your Microsoft 365 account
4. If this is your first time, you might need to accept terms and conditions

## Step 2: Create an Approval Flow
1. Click "Create" in the left menu
2. Select "Automated cloud flow"
3. Give your flow a name like "Exception Request Approval"
4. For trigger, search and select "When an item is created or modified (SharePoint)"
5. Click "Create"

## Step 3: Configure the Trigger
1. In the flow editor, configure the SharePoint trigger:
   - Site Address: (select your SharePoint site)
   - List Name: "ExceptionRequests"
   - Trigger Condition: Status eq 'Pending'
2. Click "New step" to add the next action

## Step 4: Add an Approval Action
1. Search for "Approvals" in the actions search box
2. Select "Start and wait for an approval"
3. Configure the approval:
   - Approval type: Approve/Reject - First to respond
   - Title: "Exception Request: " & trigger('SharePoint').Title
   - Assigned to: Use the assigned approver's email from your SharePoint item
   - Details: Include relevant details from the exception request

## Step 5: Add Conditional Actions
1. Click "New step" and search for "Condition"
2. Set up the condition to check the approval outcome:
   - Left side: outputs('Start_and_wait_for_an_approval')?['outcome']
   - Operator: is equal to
   - Right side: 'Approve'
3. In the "If yes" branch:
   - Add a "Update item" action for SharePoint
   - Update the Status field to "Approved"
4. In the "If no" branch:
   - Add a "Update item" action for SharePoint
   - Update the Status field to "Rejected"

## Step 6: Add Notification Actions
1. In both branches, add an email notification:
   - Search for "Send an email" action
   - Configure the email with appropriate recipient, subject, and body
   - Include the approval outcome and any comments

## Step 7: Save and Test Your Flow
1. Click "Save" at the bottom or top of the screen
2. Test your flow by creating a new exception request in SharePoint
3. Monitor the flow run to ensure it works as expected
4. Fix any issues that arise during testing

## Step 8: Integrate with Your Power App
1. In your Power App, modify your form submission:
   - The flow will trigger automatically when a new SharePoint item is created
   - No additional configuration needed if using the same SharePoint list
2. To trigger the flow manually from the app:
   - Add a "Power Automate" connection in your app
   - Choose your flow from the list
   - Configure any required inputs
`;

  // SharePoint Setup Guide
  const sharePointSetupGuide = `
# Beginner's Guide: Setting Up SharePoint Lists for Your Exception System

## Prerequisites
1. Access to a SharePoint site with permission to create and modify lists
2. Basic understanding of SharePoint navigation

## Step 1: Access Your SharePoint Site
1. Open your web browser
2. Go to your SharePoint site (typically something like https://yourcompany.sharepoint.com/sites/yoursite)
3. Sign in with your Microsoft 365 account if prompted

## Step 2: Create Exception Requests List
1. On your SharePoint site, click the gear icon (⚙️) in the top right
2. Select "Site contents"
3. Click "New" and select "List"
4. Choose "Blank list"
5. Name it "ExceptionRequests" and click "Create"

## Step 3: Configure List Columns
1. Once your list is created, click on the list to open it
2. Click "Add column" in the top menu
3. Add the following columns (adjust as needed):
   - Title (Text) - Already exists by default
   - RequestType (Choice) - Add choices like "Cyber", "Legal", etc.
   - Description (Multiple lines of text)
   - Impact (Multiple lines of text)
   - RiskLevel (Choice) - Add choices: "High", "Medium", "Low"
   - MitigatingFactors (Multiple lines of text)
   - Status (Choice) - Add choices: "Draft", "Pending", "Approved", "Rejected"
   - RequestedBy (Person or Group)
   - AssignedApprover (Person or Group)
   - ExpiryDate (Date and Time)
   - CreatedDate (Date and Time) - This is automated
   - ModifiedDate (Date and Time) - This is automated

## Step 4: Create Approvers List
1. Go back to "Site contents"
2. Click "New" and select "List"
3. Choose "Blank list"
4. Name it "ExceptionApprovers" and click "Create"
5. Add the following columns:
   - Title (Text) - Already exists by default
   - ApproverName (Person or Group)
   - ApproverRole (Choice) - Add choices like "Cyber", "Legal", etc.
   - IsActive (Yes/No)

## Step 5: Create a Document Library
1. Go back to "Site contents"
2. Click "New" and select "Document Library"
3. Name it "ExceptionDocuments" and click "Create"
4. Add the following columns:
   - RequestID (Text) - To link to the exception request
   - DocumentType (Choice) - Add choices like "Supporting", "Approval", etc.

## Step 6: Set Up List Views
1. Go to your ExceptionRequests list
2. Click on "All Items" view dropdown
3. Select "Create new view"
4. Create views for:
   - All Requests (default)
   - Pending Approval
   - Approved Exceptions
   - Rejected Exceptions
   - Expiring Soon

## Step 7: Set Up Permissions
1. For each list, click the gear icon (⚙️)
2. Select "List settings"
3. Click on "Permissions for this list"
4. Configure permissions based on your requirements:
   - Request creators need contribute permissions
   - Approvers need edit permissions
   - Administrators need full control
   - Everyone else might only need read access

## Step 8: Test Your Lists
1. Create a sample exception request
2. Attach a document
3. Assign an approver
4. Make sure all the data is stored correctly
5. Test different views to ensure they display the correct items
`;

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <Card className="p-6 md:p-8 bg-gradient-to-br from-card to-secondary/10 backdrop-blur-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Power Apps Implementation Guide
            </h1>
            <p className="text-muted-foreground mt-2">
              Building an Exception Management System with Power Apps, Copilot, and SharePoint
            </p>
          </div>
          <Button 
            onClick={() => downloadFile("# Power Apps Implementation Guide\n\nBuilding an Exception Management System with Power Apps, Copilot, and SharePoint\n\nThis guide provides all the elements needed to build a Power App that integrates with Copilot Studio to create a complete Exception Management System.", "power-app-guide-overview.txt")}
            className="gap-2"
          >
            <Download className="h-4 w-4" />
            Download Guide Overview
          </Button>
        </div>

        <div className="space-y-6">
          <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 p-6 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">Overview</CardTitle>
              <CardDescription>
                This guide provides complete instructions for building a Power App that integrates with your
                Copilot Studio agent for exception management.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Microsoft Power Apps allows you to create custom applications without extensive coding. Combined with
                your Copilot Studio agent and SharePoint, you can create a powerful exception management solution
                that provides both traditional interface and conversational AI capabilities.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <Card className="bg-primary/5 p-4 border border-primary/20">
                  <h3 className="font-semibold text-primary mb-2 flex items-center">
                    <Info className="w-4 h-4 mr-2" /> Prerequisites
                  </h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Microsoft 365 subscription with Power Apps license</li>
                    <li>SharePoint Online site for storing exception data</li>
                    <li>Copilot Studio agent (already created using the Copilot Guide)</li>
                    <li>Power Automate for workflow automation</li>
                    <li>Admin permissions to create and configure Power Apps</li>
                  </ul>
                </Card>
                <Card className="bg-secondary/5 p-4 border border-secondary/20">
                  <h3 className="font-semibold text-secondary mb-2 flex items-center">
                    <Info className="w-4 h-4 mr-2" /> Implementation Approach
                  </h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Canvas app for custom user interface</li>
                    <li>SharePoint lists for data storage</li>
                    <li>Power Automate for approval workflows</li>
                    <li>Copilot integration for AI assistance</li>
                    <li>Document library for attachments</li>
                    <li>Model-driven views for reporting (optional)</li>
                  </ul>
                </Card>
              </div>
              <div className="flex justify-end mt-4">
                <Button 
                  variant="outline" 
                  onClick={() => downloadFile("# Implementation Overview\n\n## Prerequisites\n- Microsoft 365 subscription with Power Apps license\n- SharePoint Online site for storing exception data\n- Copilot Studio agent (already created using the Copilot Guide)\n- Power Automate for workflow automation\n- Admin permissions to create and configure Power Apps\n\n## Implementation Approach\n- Canvas app for custom user interface\n- SharePoint lists for data storage\n- Power Automate for approval workflows\n- Copilot integration for AI assistance\n- Document library for attachments\n- Model-driven views for reporting (optional)", "power-app-implementation-overview.txt")}
                  className="gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download Implementation Details
                </Button>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="powerapp" className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full mb-6">
              <TabsTrigger value="powerapp">
                <div className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  <span className="hidden sm:inline">Power App Setup</span>
                  <span className="sm:hidden">Setup</span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="copilot">
                <div className="flex items-center gap-2">
                  <Code className="h-4 w-4" />
                  <span className="hidden sm:inline">Copilot Integration</span>
                  <span className="sm:hidden">Copilot</span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="flows">
                <div className="flex items-center gap-2">
                  <Puzzle className="h-4 w-4" />
                  <span className="hidden sm:inline">Power Automate</span>
                  <span className="sm:hidden">Flows</span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="sharepoint">
                <div className="flex items-center gap-2">
                  <Database className="h-4 w-4" />
                  <span className="hidden sm:inline">SharePoint Setup</span>
                  <span className="sm:hidden">SharePoint</span>
                </div>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="powerapp" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Power App Setup</CardTitle>
                  <CardDescription>
                    Step-by-step guide to creating your Exception Management Power App
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted p-4 rounded-md mb-4 max-h-96 overflow-y-auto">
                    <pre className="whitespace-pre-wrap text-sm">{powerAppSetupGuide}</pre>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <Card className="p-4 border border-primary/20">
                      <h3 className="font-semibold mb-2 flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2 text-green-500" /> Key Components
                      </h3>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Main dashboard with key metrics</li>
                        <li>Exception request creation form</li>
                        <li>My requests view for tracking</li>
                        <li>Approvals section for reviewers</li>
                        <li>Settings page for user preferences</li>
                      </ul>
                    </Card>
                    <Card className="p-4 border border-secondary/20">
                      <h3 className="font-semibold mb-2 flex items-center">
                        <ArrowRight className="w-4 h-4 mr-2 text-blue-500" /> Design Tips
                      </h3>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Use consistent colors from your brand</li>
                        <li>Add clear labels and instructions</li>
                        <li>Include progress indicators</li>
                        <li>Test on different screen sizes</li>
                        <li>Include error handling for forms</li>
                      </ul>
                    </Card>
                  </div>
                  
                  <div className="flex justify-end gap-2 mt-4">
                    <Button 
                      variant="outline" 
                      onClick={() => copyToClipboard(powerAppSetupGuide, "Power App setup guide")}
                      className="gap-2"
                    >
                      <Copy className="h-4 w-4" />
                      Copy Guide
                    </Button>
                    <Button 
                      onClick={() => downloadFile(powerAppSetupGuide, "power-app-setup-guide.txt")}
                      className="gap-2"
                    >
                      <Download className="h-4 w-4" />
                      Download Guide
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="copilot" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Copilot Integration</CardTitle>
                  <CardDescription>
                    How to integrate your Copilot Studio agent with Power Apps
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted p-4 rounded-md mb-4 max-h-96 overflow-y-auto">
                    <pre className="whitespace-pre-wrap text-sm">{copilotIntegrationGuide}</pre>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <Card className="p-4 border border-primary/20">
                      <h3 className="font-semibold mb-2 flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2 text-green-500" /> Integration Benefits
                      </h3>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Contextual assistance based on current screen</li>
                        <li>Natural language interface for complex tasks</li>
                        <li>Ability to perform actions directly from chat</li>
                        <li>Guided help for new users</li>
                        <li>Reduced training requirements</li>
                      </ul>
                    </Card>
                    <Card className="p-4 border border-secondary/20">
                      <h3 className="font-semibold mb-2 flex items-center">
                        <ArrowRight className="w-4 h-4 mr-2 text-blue-500" /> Customization Options
                      </h3>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Adjust Copilot appearance and position</li>
                        <li>Customize welcome message per screen</li>
                        <li>Add screen-specific suggestions</li>
                        <li>Control when Copilot appears automatically</li>
                        <li>Configure fallback behaviors</li>
                      </ul>
                    </Card>
                  </div>
                  
                  <div className="flex justify-end gap-2 mt-4">
                    <Button 
                      variant="outline" 
                      onClick={() => copyToClipboard(copilotIntegrationGuide, "Copilot integration guide")}
                      className="gap-2"
                    >
                      <Copy className="h-4 w-4" />
                      Copy Guide
                    </Button>
                    <Button 
                      onClick={() => downloadFile(copilotIntegrationGuide, "copilot-integration-guide.txt")}
                      className="gap-2"
                    >
                      <Download className="h-4 w-4" />
                      Download Guide
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="flows" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Power Automate Integration</CardTitle>
                  <CardDescription>
                    Creating automated workflows for your Exception Management app
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted p-4 rounded-md mb-4 max-h-96 overflow-y-auto">
                    <pre className="whitespace-pre-wrap text-sm">{powerAutomateGuide}</pre>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <Card className="p-4 border border-primary/20">
                      <h3 className="font-semibold mb-2 flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2 text-green-500" /> Essential Flows
                      </h3>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Approval workflow for new requests</li>
                        <li>Notification system for status changes</li>
                        <li>Expiration reminder flow</li>
                        <li>Document management automation</li>
                        <li>Reporting and analytics generation</li>
                      </ul>
                    </Card>
                    <Card className="p-4 border border-secondary/20">
                      <h3 className="font-semibold mb-2 flex items-center">
                        <ArrowRight className="w-4 h-4 mr-2 text-blue-500" /> Advanced Flow Options
                      </h3>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Multi-stage approval process</li>
                        <li>Conditional approvers based on request type</li>
                        <li>Dynamic form generation</li>
                        <li>Integration with Teams for approvals</li>
                        <li>Automated documentation creation</li>
                      </ul>
                    </Card>
                  </div>
                  
                  <div className="flex justify-end gap-2 mt-4">
                    <Button 
                      variant="outline" 
                      onClick={() => copyToClipboard(powerAutomateGuide, "Power Automate guide")}
                      className="gap-2"
                    >
                      <Copy className="h-4 w-4" />
                      Copy Guide
                    </Button>
                    <Button 
                      onClick={() => downloadFile(powerAutomateGuide, "power-automate-guide.txt")}
                      className="gap-2"
                    >
                      <Download className="h-4 w-4" />
                      Download Guide
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sharepoint" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>SharePoint Setup</CardTitle>
                  <CardDescription>
                    Setting up SharePoint lists and libraries for your Exception Management system
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted p-4 rounded-md mb-4 max-h-96 overflow-y-auto">
                    <pre className="whitespace-pre-wrap text-sm">{sharePointSetupGuide}</pre>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <Card className="p-4 border border-primary/20">
                      <h3 className="font-semibold mb-2 flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2 text-green-500" /> Data Structure
                      </h3>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>ExceptionRequests - Main list for all requests</li>
                        <li>ExceptionApprovers - List of approval roles</li>
                        <li>ExceptionDocuments - File storage library</li>
                        <li>ExceptionHistory - Audit trail of changes</li>
                        <li>ExceptionSettings - System configuration</li>
                      </ul>
                    </Card>
                    <Card className="p-4 border border-secondary/20">
                      <h3 className="font-semibold mb-2 flex items-center">
                        <ArrowRight className="w-4 h-4 mr-2 text-blue-500" /> Best Practices
                      </h3>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Use consistent naming conventions</li>
                        <li>Create appropriate views for different roles</li>
                        <li>Set up proper permissions at the list level</li>
                        <li>Enable versioning for important lists</li>
                        <li>Add indexed columns for large lists</li>
                      </ul>
                    </Card>
                  </div>
                  
                  <div className="flex justify-end gap-2 mt-4">
                    <Button 
                      variant="outline" 
                      onClick={() => copyToClipboard(sharePointSetupGuide, "SharePoint setup guide")}
                      className="gap-2"
                    >
                      <Copy className="h-4 w-4" />
                      Copy Guide
                    </Button>
                    <Button 
                      onClick={() => downloadFile(sharePointSetupGuide, "sharepoint-setup-guide.txt")}
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
        </div>
      </Card>
    </div>
  );
};
