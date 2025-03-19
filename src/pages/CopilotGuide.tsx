
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Download, Info, ArrowRight, CheckCircle, HelpCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { getRequirementsMarkdown } from "@/utils/requirementsExport";

export const CopilotGuide = () => {
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

  // Agent Instructions content
  const agentInstructions = `
You are an Exception Management System assistant designed to help users submit, track, and manage exception requests within the organization. Your primary roles are:

1. Assist users in creating and submitting exception requests for various categories including Cyber/Technology, Legal/Privacy, Independence, Quality Management Review, Client Acceptance, Engagement Risk, Audit Findings, Data-Related, and AI/Emerging Technology issues.

2. Guide approvers through the review and approval process for exception requests.

3. Help administrators manage the system, track metrics, and oversee the exception management process.

4. Provide information about policies, requirements, and best practices related to exception management.

When interacting with users:
- Be professional, courteous, and focused on helping them complete their task efficiently.
- Ask clarifying questions to ensure you understand their needs correctly.
- Provide step-by-step guidance for completing forms and processes.
- Respect data privacy and security protocols at all times.
- Inform users about required approvals and expected timelines.
- Help track the status of existing requests.

For exception creation:
- Guide users through selecting the appropriate exception type.
- Help users articulate their request clearly, including the reason, impact, and mitigating factors.
- Assist in identifying appropriate approvers based on the exception type.
- Ensure all required fields are completed before submission.

For exception approval:
- Help approvers find pending requests that require their attention.
- Facilitate review of request details and supporting documentation.
- Assist with providing feedback and decisions.
- Explain the implications of approval or rejection.

For system administration:
- Assist with reporting and metrics tracking.
- Help manage user roles and permissions.
- Support the configuration of approval workflows.
- Provide insights into system usage and common exception patterns.

Always maintain confidentiality of sensitive information and ensure compliance with organizational policies regarding data handling and privacy.
`;

  // Example API Actions
  const apiSchema = `
{
  "openapi": "3.0.0",
  "info": {
    "title": "Exception Management API",
    "description": "API for managing exception requests, approvals, and tracking",
    "version": "1.0.0"
  },
  "servers": [
    {
      "url": "https://api.exceptionmanagement.company.com/v1"
    }
  ],
  "paths": {
    "/exceptions": {
      "get": {
        "summary": "List exception requests",
        "description": "Returns a list of exception requests filtered by various criteria",
        "operationId": "listExceptions",
        "parameters": [
          {
            "name": "status",
            "in": "query",
            "description": "Filter by request status",
            "schema": {
              "type": "string",
              "enum": ["pending", "approved", "rejected", "expired"]
            }
          },
          {
            "name": "type",
            "in": "query",
            "description": "Filter by exception type",
            "schema": {
              "type": "string",
              "enum": ["cyber", "legal", "independence", "qmr", "clientAcceptance", "engagementRisk", "auditFinding", "data", "ai"]
            }
          },
          {
            "name": "submittedBy",
            "in": "query",
            "description": "Filter by submitter email",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "A list of exception requests",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/ExceptionRequest"
                  }
                }
              }
            }
          }
        }
      },
      "post": {
        "summary": "Create exception request",
        "description": "Creates a new exception request",
        "operationId": "createException",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ExceptionRequestInput"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Exception request created",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ExceptionRequest"
                }
              }
            }
          }
        }
      }
    }
  }
}`;

  // Sample Topics
  const sampleTopics = `
[
  {
    "name": "Creating Exception Requests",
    "description": "Guide users through creating new exception requests",
    "triggerPhrases": [
      "I need to create an exception",
      "How do I submit an exception request",
      "I need approval for a policy exception",
      "New exception request",
      "Submit a cyber exception",
      "Create legal exception",
      "Request policy deviation"
    ],
    "subtopics": [
      {
        "name": "Selecting Exception Type",
        "description": "Help users choose the correct exception type",
        "examples": [
          "User: What type of exception should I choose for a data privacy issue?",
          "Bot: For data privacy issues, you should select either 'Legal/Privacy' or 'Data-Related' exception type."
        ]
      }
    ]
  }
]`;

  // Sample triggers
  const sampleTriggers = `
[
  {
    "name": "New Request Button Click",
    "description": "Triggers when a user clicks 'New Request' button",
    "implementation": "Monitor button click event on 'New Request' button in Teams/SharePoint interface"
  },
  {
    "name": "Approaching Expiry",
    "description": "Triggers when exceptions are approaching expiry date",
    "implementation": "Power Automate flow checking for exceptions within 7 days of expiry, sending notification"
  }
]`;

  // Starter prompts
  const starterPrompts = `
[
  {
    "title": "Create a new exception request",
    "description": "Start the process of submitting a new exception request",
    "text": "I need to create a new exception request."
  },
  {
    "title": "Find my pending requests",
    "description": "Locate exception requests awaiting your attention",
    "text": "Show me my pending exception requests."
  }
]`;

  // Step-by-Step Implementation Guides
  const agentSetupGuide = `
# Beginner's Guide: Setting Up Your Copilot Studio Agent

## Prerequisites
1. Make sure you have a Microsoft 365 account with admin access
2. Check that you have a Copilot Studio license (contact your IT admin if unsure)

## Step 1: Access Copilot Studio
1. Open your web browser
2. Go to https://copilotstudio.microsoft.com/
3. Sign in with your Microsoft 365 account
4. If this is your first time, you might need to accept terms and conditions

## Step 2: Create a New Copilot
1. On the Copilot Studio home page, click the "Create" button
2. Select "New Copilot" from the dropdown menu
3. Enter "Exception Management Assistant" as the name
4. Choose "English" as the primary language (add more languages later if needed)
5. Click "Create" to continue

## Step 3: Basic Configuration
1. In the Copilot settings page, find the "Name" field
2. Enter "Exception Management Assistant" if it's not already there
3. Add a short description: "AI assistant for managing exception requests"
4. Upload a icon/avatar for your bot (optional but recommended)
5. Click "Save" at the bottom of the page

## Step 4: Test Your Bot Basics
1. Click on "Test your bot" in the left navigation
2. Type "Hello" to see if your bot responds
3. If it works, you've successfully created the basic bot!
4. Click "Close" to exit the testing panel

## Step 5: Where to Go Next
1. After basic setup, proceed to the "Instructions" tab
2. Copy the instructions provided in this guide
3. Follow the step-by-step process for each section
`;

  const instructionsGuide = `
# Beginner's Guide: Setting Up Copilot Instructions

## What Are Instructions?
Instructions tell your Copilot how to behave - think of it as the "personality" and "job description" for your AI assistant.

## Step 1: Access Instructions Section
1. In your Copilot Studio project, click on "Configuration" in the left menu
2. Select "Instructions" from the submenu
3. You'll see a large text box where you can enter instructions

## Step 2: Copy and Paste the Instructions
1. Copy the entire instructions text from this guide
2. Paste it into the "System message" field in Copilot Studio
3. DO NOT remove any parts of the instructions - every section is important!

## Step 3: Customize (Optional)
1. If needed, add company-specific details
2. You can mention specific policies or procedures your organization follows
3. Add any special terminology used in your organization
4. Don't modify the core functionality description unless you're certain

## Step 4: Save Your Changes
1. Click the "Save" button at the bottom of the page
2. Wait for the confirmation message that changes were saved

## Step 5: Test Your Instructions
1. Click "Test" in the left navigation
2. Ask questions like "What can you help me with?" or "How do I submit an exception?"
3. Verify the bot responds according to the instructions
4. If responses aren't correct, go back and review your instructions

## Step 6: Publish Instructions
1. After testing, click "Publish" in the left menu
2. Review your changes
3. Click "Publish" to make your instructions live
4. Your instructions are now active!
`;

  const topicsGuide = `
# Beginner's Guide: Creating Copilot Topics

## What Are Topics?
Topics are specific conversation paths your Copilot can handle. Think of them as "skills" that your bot learns.

## Step 1: Access Topics Section
1. In your Copilot Studio project, click on "Create" in the left menu
2. Select "Topics" from the submenu
3. You'll see your existing topics and an option to create new ones

## Step 2: Create Your First Topic
1. Click the "+ New topic" button
2. Give your topic a name (e.g., "Creating Exception Requests")
3. Add a description (e.g., "Helps users create new exception requests")
4. Click "Create" to make your new topic

## Step 3: Add Trigger Phrases
1. In your new topic, find the "Trigger phrases" section
2. Click "Add" to add new phrases
3. Enter phrases users might say to start this conversation:
   - "I need to create an exception"
   - "How do I submit an exception request"
   - "Submit a cyber exception"
   - Add at least 5-10 different variations
4. Click "Save" when done adding phrases

## Step 4: Design the Conversation Flow
1. Click on "Message" in the authoring canvas
2. Type the first response the bot should give (e.g., "I can help you create an exception request. What type of exception do you need?")
3. Click the "+" below this message to add the next step
4. Select "Ask a question" if you want user input
5. For each user response, create branching paths:
   - Click on the line connecting nodes
   - Add conditions for different response types
6. Continue building until you have a complete conversation flow

## Step 5: Test Your Topic
1. Click "Test" in the top navigation
2. Try one of your trigger phrases
3. Follow the conversation flow to make sure it works
4. Fix any issues by going back to the topic editor

## Step 6: Save and Publish
1. Click "Save" to store your changes
2. Click "Publish" to make your topic live
3. Your new topic is now active!

## Step 7: Repeat for Additional Topics
1. Go back to Topics list
2. Create more topics for different exception management tasks
3. Build a complete set of skills for your Copilot
`;

  const actionsGuide = `
# Beginner's Guide: Implementing Copilot Actions

## What Are Actions?
Actions allow your Copilot to connect to real data and perform real tasks - like fetching exception requests or creating new ones.

## Step 1: Access Actions Section
1. In your Copilot Studio project, click on "Create" in the left menu
2. Select "Actions" from the submenu
3. You'll see a list of existing actions (if any) and an option to create new ones

## Step 2: Create a New Action
1. Click the "+ New action" button
2. Select "Power Automate Flow" as the type
   - This is easiest for beginners without coding experience
3. Give your action a name (e.g., "GetExceptionRequests")
4. Provide a description (e.g., "Retrieves a user's exception requests")
5. Click "Create" to continue

## Step 3: Create the Power Automate Flow
1. You'll be redirected to Power Automate
2. Start with the "PowerApps" trigger (automatically selected)
3. Click "+ New step" to add an action
4. Search for "SharePoint" and select "Get items" from SharePoint actions
5. Configure it:
   - Site Address: (select your SharePoint site)
   - List Name: "ExceptionRequests"
   - Filter Query: Status eq 'Pending'
6. Add another step to format the response
7. Save your flow

## Step 4: Configure Input Parameters (Optional)
1. Back in Copilot Studio, under your action, find "Input parameters"
2. Click "Add input"
3. Define parameters your bot will collect from users:
   - Name: "userEmail"  
   - Type: "String"
   - Required: Yes
4. Click "Save"

## Step 5: Configure Output Format
1. Under "Response", define what data returns from your action
2. Map fields from your SharePoint list to the response
3. Include fields like:
   - RequestID
   - Title
   - Type
   - Status
   - SubmittedDate
4. Click "Save"

## Step 6: Test Your Action
1. Click "Test" at the top
2. Enter test values for any input parameters
3. Click "Run test"
4. Check the results match what you expect
5. Fix any issues in your Power Automate flow if needed

## Step 7: Save and Use in Topics
1. Click "Save" to finalize your action
2. Now go to any Topic where you need this data
3. Add an "Action" step to your conversation
4. Select your newly created action
5. Map conversation variables to action inputs
`;

  const promptsGuide = `
# Beginner's Guide: Creating Starter Prompts

## What Are Starter Prompts?
Starter prompts are suggested conversation starters that users see when they first interact with your Copilot.

## Step 1: Access Starter Prompts Section
1. In your Copilot Studio project, click on "Configure" in the left menu
2. Select "Starter prompts" from the submenu
3. You'll see a page where you can add suggested phrases for users

## Step 2: Add Your First Prompt
1. Click the "+ Add" button
2. Enter a title (e.g., "Create a new exception request")
3. Add a short description (e.g., "Start the process of submitting a new exception request")
4. Enter the actual text users will see and can click (e.g., "I need to create a new exception request")
5. Click "Save" to add this prompt

## Step 3: Add More Prompts
1. Add at least 3-5 different starter prompts
2. Make sure they cover different common tasks:
   - Creating requests
   - Checking request status
   - Finding pending approvals
   - Getting help with policies
3. Keep prompts short and clear - they should be easy to understand

## Step 4: Order Your Prompts
1. Use the drag handles to rearrange prompts
2. Put the most common or important tasks at the top
3. Group similar functions together

## Step 5: Preview Your Prompts
1. Click "Test" in the left navigation
2. Look at how your starter prompts appear in the test chat
3. Make sure they look clear and inviting to users

## Step 6: Publish Your Changes
1. Click "Publish" in the left navigation
2. Review your changes
3. Click "Publish" to make your starter prompts live
4. Users will now see these prompts when they start chatting with your Copilot

## Step 7: Monitor and Update
1. After launch, check which prompts users actually click
2. Replace unused prompts with alternatives
3. Update prompts based on common user questions
`;

  const deploymentGuide = `
# Beginner's Guide: Deploying Your Copilot

## Step 1: Prepare for Deployment
1. Make sure you've completed and tested all sections:
   - Instructions
   - Topics
   - Actions
   - Starter prompts
2. Test your complete Copilot with various scenarios
3. Fix any issues before proceeding

## Step 2: Access Publishing Section
1. In your Copilot Studio project, click on "Publish" in the left menu
2. You'll see options for publishing your Copilot

## Step 3: Choose Deployment Channels
1. Under "Channels", you'll see available options
2. For Microsoft Teams (recommended first channel):
   - Click on "Teams"
   - Toggle the switch to "On"
   - Click "Apply"
3. For SharePoint:
   - Click on "SharePoint"
   - Toggle the switch to "On" 
   - Select which sites should have access
   - Click "Apply"

## Step 4: Configure Teams Settings
1. Under Teams settings, choose:
   - Make available to: "Everyone in your organization" (or select specific teams)
   - Install for users: Toggle on if you want automatic installation
   - Default open state: "Welcome message"
2. Click "Save" when done

## Step 5: Final Publish
1. Review all your settings one last time
2. Click the main "Publish" button
3. Wait for confirmation that publishing completed successfully
4. Your Copilot is now live!

## Step 6: Share with Users
1. Send an email to your users introducing the new Copilot
2. Include instructions on how to find it in Teams
3. Mention starter questions they can ask
4. Consider creating a quick 2-minute video demo

## Step 7: Monitor and Improve
1. Check usage statistics regularly
2. Look for failed conversations
3. Add new topics based on common questions
4. Update your Copilot regularly based on feedback
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
              Building an Exception Management System in Microsoft 365
            </p>
          </div>
          <Button 
            onClick={() => downloadFile("# Copilot Studio Implementation Guide\n\nBuilding an Exception Management System in Microsoft 365\n\nThis guide provides all the elements needed to build a Copilot Studio agent that replicates the functionality of the Exception Management System.", "copilot-guide-overview.txt")}
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
                This guide provides all the elements needed to build a Copilot Studio agent that replicates
                the functionality of the Exception Management System.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Microsoft Copilot Studio allows you to create custom AI agents that can be deployed across Microsoft 365,
                including Teams, SharePoint, and other Microsoft products. The following guide outlines how to recreate
                the exception management functionality using Copilot Studio.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <Card className="bg-primary/5 p-4 border border-primary/20">
                  <h3 className="font-semibold text-primary mb-2 flex items-center">
                    <Info className="w-4 h-4 mr-2" /> Prerequisites
                  </h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Microsoft 365 subscription with Copilot Studio license</li>
                    <li>SharePoint Online site for storing exception data</li>
                    <li>Power Automate for workflow automation</li>
                    <li>Power Apps for custom forms (optional)</li>
                    <li>Admin permissions to create and configure Copilot Studio agents</li>
                  </ul>
                </Card>
                <Card className="bg-secondary/5 p-4 border border-secondary/20">
                  <h3 className="font-semibold text-secondary mb-2 flex items-center">
                    <Info className="w-4 h-4 mr-2" /> Implementation Approach
                  </h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>SharePoint lists for data storage instead of Supabase</li>
                    <li>Power Automate flows for business logic and approvals</li>
                    <li>Copilot Studio for the conversational interface</li>
                    <li>Power BI for metrics and reporting</li>
                    <li>Teams integration for notifications and approvals</li>
                  </ul>
                </Card>
              </div>
              <div className="flex justify-end mt-4">
                <Button 
                  variant="outline" 
                  onClick={() => downloadFile("# Implementation Overview\n\n## Prerequisites\n- Microsoft 365 subscription with Copilot Studio license\n- SharePoint Online site for storing exception data\n- Power Automate for workflow automation\n- Power Apps for custom forms (optional)\n- Admin permissions to create and configure Copilot Studio agents\n\n## Implementation Approach\n- SharePoint lists for data storage instead of Supabase\n- Power Automate flows for business logic and approvals\n- Copilot Studio for the conversational interface\n- Power BI for metrics and reporting\n- Teams integration for notifications and approvals", "implementation-overview.txt")}
                  className="gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download Implementation Details
                </Button>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="agent" className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-6 w-full mb-6">
              <TabsTrigger value="agent">Agent Setup</TabsTrigger>
              <TabsTrigger value="instructions">Instructions</TabsTrigger>
              <TabsTrigger value="topics">Topics</TabsTrigger>
              <TabsTrigger value="actions">Actions</TabsTrigger>
              <TabsTrigger value="prompts">Starter Prompts</TabsTrigger>
              <TabsTrigger value="deployment">Deployment</TabsTrigger>
            </TabsList>

            <TabsContent value="agent" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Agent Configuration</CardTitle>
                  <CardDescription>
                    Essential configuration settings for your Copilot Studio agent
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">Basic Settings</h3>
                      <div className="bg-muted p-4 rounded-md">
                        <p className="font-medium mb-1">Agent Name:</p>
                        <div className="flex items-center gap-2">
                          <p>Exception Management Assistant</p>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="h-7 text-xs"
                            onClick={() => copyToClipboard("Exception Management Assistant", "Agent name")}
                          >
                            <Copy className="h-3 w-3 mr-1" />
                            Copy
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">Deployment Options</h3>
                      <div className="bg-muted p-4 rounded-md">
                        <p className="font-medium mb-1">Recommended Channels:</p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Microsoft Teams</li>
                          <li>SharePoint site for Exception Management</li>
                          <li>Microsoft 365 Chat</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <Card className="border border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-900">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center text-green-700 dark:text-green-400">
                        <HelpCircle className="h-5 w-5 mr-2" />
                        Step-by-Step Guide for Beginners
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="guide">
                          <AccordionTrigger className="text-green-700 dark:text-green-400">
                            Show detailed instructions
                          </AccordionTrigger>
                          <AccordionContent className="bg-white dark:bg-black p-4 rounded-md my-2 text-foreground">
                            <pre className="whitespace-pre-wrap text-sm">{agentSetupGuide}</pre>
                            <div className="flex justify-end mt-4">
                              <Button 
                                variant="outline" 
                                onClick={() => downloadFile(agentSetupGuide, "copilot-agent-setup-guide.txt")}
                                className="gap-2"
                              >
                                <Download className="h-4 w-4" />
                                Download Setup Guide
                              </Button>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </CardContent>
                  </Card>
                  
                  <div className="flex justify-end">
                    <Button 
                      onClick={() => downloadFile("# Agent Configuration\n\n## Basic Settings\nAgent Name: Exception Management Assistant\n\n## Deployment Options\nRecommended Channels:\n- Microsoft Teams\n- SharePoint site for Exception Management\n- Microsoft 365 Chat", "agent-configuration.txt")}
                      className="gap-2"
                    >
                      <Download className="h-4 w-4" />
                      Download Configuration
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="instructions" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Agent Instructions</CardTitle>
                  <CardDescription>
                    The core instructions that define your agent's behavior and capabilities
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted p-4 rounded-md mb-4 max-h-96 overflow-y-auto">
                    <pre className="whitespace-pre-wrap text-sm">{agentInstructions}</pre>
                  </div>
                  
                  <Card className="border border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-900 mb-4">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center text-green-700 dark:text-green-400">
                        <HelpCircle className="h-5 w-5 mr-2" />
                        Step-by-Step Guide for Beginners
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="guide">
                          <AccordionTrigger className="text-green-700 dark:text-green-400">
                            Show detailed instructions
                          </AccordionTrigger>
                          <AccordionContent className="bg-white dark:bg-black p-4 rounded-md my-2 text-foreground">
                            <pre className="whitespace-pre-wrap text-sm">{instructionsGuide}</pre>
                            <div className="flex justify-end mt-4">
                              <Button 
                                variant="outline" 
                                onClick={() => downloadFile(instructionsGuide, "copilot-instructions-guide.txt")}
                                className="gap-2"
                              >
                                <Download className="h-4 w-4" />
                                Download Instructions Guide
                              </Button>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </CardContent>
                  </Card>
                  
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="outline" 
                      onClick={() => copyToClipboard(agentInstructions, "Agent instructions")}
                      className="gap-2"
                    >
                      <Copy className="h-4 w-4" />
                      Copy Instructions
                    </Button>
                    <Button 
                      onClick={() => downloadFile(agentInstructions, "exception-agent-instructions.txt")}
                      className="gap-2"
                    >
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="topics" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Copilot Topics</CardTitle>
                  <CardDescription>
                    Conversational topics for your Copilot Studio agent
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted p-4 rounded-md mb-4 max-h-96 overflow-y-auto">
                    <pre className="whitespace-pre-wrap text-sm">{sampleTopics}</pre>
                  </div>
                  
                  <Card className="border border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-900 mb-4">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center text-green-700 dark:text-green-400">
                        <HelpCircle className="h-5 w-5 mr-2" />
                        Step-by-Step Guide for Beginners
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="guide">
                          <AccordionTrigger className="text-green-700 dark:text-green-400">
                            Show detailed instructions
                          </AccordionTrigger>
                          <AccordionContent className="bg-white dark:bg-black p-4 rounded-md my-2 text-foreground">
                            <pre className="whitespace-pre-wrap text-sm">{topicsGuide}</pre>
                            <div className="flex justify-end mt-4">
                              <Button 
                                variant="outline" 
                                onClick={() => downloadFile(topicsGuide, "copilot-topics-guide.txt")}
                                className="gap-2"
                              >
                                <Download className="h-4 w-4" />
                                Download Topics Guide
                              </Button>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </CardContent>
                  </Card>
                  
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="outline" 
                      onClick={() => copyToClipboard(sampleTopics, "Sample topics")}
                      className="gap-2"
                    >
                      <Copy className="h-4 w-4" />
                      Copy Topics
                    </Button>
                    <Button 
                      onClick={() => downloadFile(sampleTopics, "copilot-topics.json")}
                      className="gap-2"
                    >
                      <Download className="h-4 w-4" />
                      Download Topics
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Triggers</CardTitle>
                  <CardDescription>
                    Events that trigger specific Copilot behaviors
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted p-4 rounded-md mb-4 max-h-96 overflow-y-auto">
                    <pre className="whitespace-pre-wrap text-sm">{sampleTriggers}</pre>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="outline" 
                      onClick={() => copyToClipboard(sampleTriggers, "Sample triggers")}
                      className="gap-2"
                    >
                      <Copy className="h-4 w-4" />
                      Copy Triggers
                    </Button>
                    <Button 
                      onClick={() => downloadFile(sampleTriggers, "copilot-triggers.json")}
                      className="gap-2"
                    >
                      <Download className="h-4 w-4" />
                      Download Triggers
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="actions" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>API Schema</CardTitle>
                  <CardDescription>
                    OpenAPI schema for Copilot to interact with the Exception Management API
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted p-4 rounded-md mb-4 max-h-96 overflow-y-auto">
                    <pre className="whitespace-pre-wrap text-sm">{apiSchema}</pre>
                  </div>
                  
                  <Card className="border border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-900 mb-4">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center text-green-700 dark:text-green-400">
                        <HelpCircle className="h-5 w-5 mr-2" />
                        Step-by-Step Guide for Beginners
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="guide">
                          <AccordionTrigger className="text-green-700 dark:text-green-400">
                            Show detailed instructions
                          </AccordionTrigger>
                          <AccordionContent className="bg-white dark:bg-black p-4 rounded-md my-2 text-foreground">
                            <pre className="whitespace-pre-wrap text-sm">{actionsGuide}</pre>
                            <div className="flex justify-end mt-4">
                              <Button 
                                variant="outline" 
                                onClick={() => downloadFile(actionsGuide, "copilot-actions-guide.txt")}
                                className="gap-2"
                              >
                                <Download className="h-4 w-4" />
                                Download Actions Guide
                              </Button>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </CardContent>
                  </Card>
                  
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="outline" 
                      onClick={() => copyToClipboard(apiSchema, "API schema")}
                      className="gap-2"
                    >
                      <Copy className="h-4 w-4" />
                      Copy Schema
                    </Button>
                    <Button 
                      onClick={() => downloadFile(apiSchema, "exception-api-schema.json")}
                      className="gap-2"
                    >
                      <Download className="h-4 w-4" />
                      Download Schema
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="prompts" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Starter Prompts</CardTitle>
                  <CardDescription>
                    Suggested starter prompts for users to interact with your Copilot
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted p-4 rounded-md mb-4 max-h-96 overflow-y-auto">
                    <pre className="whitespace-pre-wrap text-sm">{starterPrompts}</pre>
                  </div>
                  
                  <Card className="border border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-900 mb-4">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center text-green-700 dark:text-green-400">
                        <HelpCircle className="h-5 w-5 mr-2" />
                        Step-by-Step Guide for Beginners
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="guide">
                          <AccordionTrigger className="text-green-700 dark:text-green-400">
                            Show detailed instructions
                          </AccordionTrigger>
                          <AccordionContent className="bg-white dark:bg-black p-4 rounded-md my-2 text-foreground">
                            <pre className="whitespace-pre-wrap text-sm">{promptsGuide}</pre>
                            <div className="flex justify-end mt-4">
                              <Button 
                                variant="outline" 
                                onClick={() => downloadFile(promptsGuide, "copilot-prompts-guide.txt")}
                                className="gap-2"
                              >
                                <Download className="h-4 w-4" />
                                Download Prompts Guide
                              </Button>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </CardContent>
                  </Card>
                  
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="outline" 
                      onClick={() => copyToClipboard(starterPrompts, "Starter prompts")}
                      className="gap-2"
                    >
                      <Copy className="h-4 w-4" />
                      Copy Prompts
                    </Button>
                    <Button 
                      onClick={() => downloadFile(starterPrompts, "starter-prompts.json")}
                      className="gap-2"
                    >
                      <Download className="h-4 w-4" />
                      Download Prompts
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="deployment" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Deployment Guide</CardTitle>
                  <CardDescription>
                    How to deploy your Copilot Studio agent to Microsoft Teams and SharePoint
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Card className="border border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-900 mb-4">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center text-green-700 dark:text-green-400">
                        <HelpCircle className="h-5 w-5 mr-2" />
                        Step-by-Step Guide for Beginners
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <pre className="whitespace-pre-wrap text-sm p-4 bg-white dark:bg-black rounded-md">{deploymentGuide}</pre>
                      <div className="flex justify-end mt-4">
                        <Button 
                          onClick={() => downloadFile(deploymentGuide, "copilot-deployment-guide.txt")}
                          className="gap-2"
                        >
                          <Download className="h-4 w-4" />
                          Download Deployment Guide
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <Card className="p-4 border border-primary/20">
                      <h3 className="font-semibold mb-2 flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2 text-green-500" /> Deployment Checklist
                      </h3>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Complete and test all agent components</li>
                        <li>Configure Teams channel settings</li>
                        <li>Configure SharePoint integration</li>
                        <li>Set up welcome message and starter prompts</li>
                        <li>Create user documentation for end users</li>
                        <li>Test on multiple devices and browsers</li>
                      </ul>
                    </Card>
                    <Card className="p-4 border border-secondary/20">
                      <h3 className="font-semibold mb-2 flex items-center">
                        <ArrowRight className="w-4 h-4 mr-2 text-blue-500" /> Post-Deployment Tasks
                      </h3>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Monitor usage statistics via Copilot Studio analytics</li>
                        <li>Collect user feedback for improvements</li>
                        <li>Set up regular maintenance schedule</li>
                        <li>Plan for future topic additions</li>
                        <li>Consider integration with additional systems</li>
                        <li>Regular backup of configurations</li>
                      </ul>
                    </Card>
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

