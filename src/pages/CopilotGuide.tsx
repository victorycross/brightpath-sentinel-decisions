
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Download, Info } from "lucide-react";
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
            <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 w-full mb-6">
              <TabsTrigger value="agent">Agent Setup</TabsTrigger>
              <TabsTrigger value="instructions">Instructions</TabsTrigger>
              <TabsTrigger value="topics">Topics</TabsTrigger>
              <TabsTrigger value="actions">Actions</TabsTrigger>
              <TabsTrigger value="prompts">Starter Prompts</TabsTrigger>
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
          </Tabs>
        </div>
      </Card>
    </div>
  );
};
