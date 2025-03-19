import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, FileDown, Download, Info, ExternalLink } from "lucide-react";
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
    },
    "/exceptions/{id}": {
      "get": {
        "summary": "Get exception request",
        "description": "Returns details of a specific exception request",
        "operationId": "getException",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Exception request details",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ExceptionRequest"
                }
              }
            }
          }
        }
      },
      "put": {
        "summary": "Update exception request",
        "description": "Updates an existing exception request",
        "operationId": "updateException",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
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
          "200": {
            "description": "Exception request updated",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ExceptionRequest"
                }
              }
            }
          }
        }
      },
      "delete": {
        "summary": "Delete exception request",
        "description": "Deletes an exception request",
        "operationId": "deleteException",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "204": {
            "description": "Exception request deleted"
          }
        }
      }
    },
    "/exceptions/{id}/approve": {
      "post": {
        "summary": "Approve exception request",
        "description": "Approves an exception request",
        "operationId": "approveException",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "comments": {
                    "type": "string"
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Exception request approved",
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
    },
    "/exceptions/{id}/reject": {
      "post": {
        "summary": "Reject exception request",
        "description": "Rejects an exception request",
        "operationId": "rejectException",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "reason": {
                    "type": "string"
                  }
                },
                "required": ["reason"]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Exception request rejected",
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
    },
    "/users/roles": {
      "get": {
        "summary": "Get user roles",
        "description": "Returns roles for the current user",
        "operationId": "getUserRoles",
        "responses": {
          "200": {
            "description": "User roles",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "roles": {
                      "type": "array",
                      "items": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  "components": {
    "schemas": {
      "ExceptionRequestInput": {
        "type": "object",
        "properties": {
          "title": {
            "type": "string",
            "description": "Title of the exception request"
          },
          "type": {
            "type": "string",
            "enum": ["cyber", "legal", "independence", "qmr", "clientAcceptance", "engagementRisk", "auditFinding", "data", "ai"],
            "description": "Type of exception"
          },
          "request": {
            "type": "string",
            "description": "Description of the exception request"
          },
          "reason": {
            "type": "string",
            "description": "Reason for the exception"
          },
          "impact": {
            "type": "string",
            "description": "Impact of the exception"
          },
          "mitigatingFactors": {
            "type": "string",
            "description": "Mitigating factors"
          },
          "residualRisk": {
            "type": "string",
            "enum": ["low", "medium", "high"],
            "description": "Residual risk level"
          },
          "incidentReference": {
            "type": "string",
            "description": "Reference to related incident (optional)"
          },
          "expiryDate": {
            "type": "string",
            "format": "date-time",
            "description": "Expiry date of the exception (optional)"
          }
        },
        "required": ["title", "type", "request", "reason", "impact", "mitigatingFactors", "residualRisk"]
      },
      "ExceptionRequest": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid",
            "description": "Unique identifier for the exception request"
          },
          "title": {
            "type": "string",
            "description": "Title of the exception request"
          },
          "type": {
            "type": "string",
            "enum": ["cyber", "legal", "independence", "qmr", "clientAcceptance", "engagementRisk", "auditFinding", "data", "ai"],
            "description": "Type of exception"
          },
          "status": {
            "type": "string",
            "enum": ["pending", "assigned", "approved", "rejected", "expired"],
            "description": "Current status of the exception request"
          },
          "request": {
            "type": "string",
            "description": "Description of the exception request"
          },
          "reason": {
            "type": "string",
            "description": "Reason for the exception"
          },
          "impact": {
            "type": "string",
            "description": "Impact of the exception"
          },
          "mitigatingFactors": {
            "type": "string",
            "description": "Mitigating factors"
          },
          "residualRisk": {
            "type": "string",
            "enum": ["low", "medium", "high"],
            "description": "Residual risk level"
          },
          "submittedBy": {
            "type": "string",
            "description": "Email of the user who submitted the request"
          },
          "submittedAt": {
            "type": "string",
            "format": "date-time",
            "description": "Date and time the request was submitted"
          },
          "expiryDate": {
            "type": "string",
            "format": "date-time",
            "description": "Expiry date of the exception (optional)"
          },
          "expired": {
            "type": "boolean",
            "description": "Whether the exception has expired"
          },
          "incidentReference": {
            "type": "string",
            "description": "Reference to related incident (optional)"
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
          "Bot: For data privacy issues, you should select either 'Legal/Privacy' or 'Data-Related' exception type. 'Legal/Privacy' is more appropriate if it involves compliance with privacy laws or regulations, while 'Data-Related' is better for operational data handling exceptions."
        ]
      },
      {
        "name": "Describing Impact and Risk",
        "description": "Guide users on articulating impact and residual risk",
        "examples": [
          "User: How should I describe the impact?",
          "Bot: When describing the impact, focus on how this exception affects business operations, compliance, or security posture. Be specific about which policies or procedures are being bypassed and what the consequences might be without this exception."
        ]
      },
      {
        "name": "Identifying Mitigating Factors",
        "description": "Help users identify and document mitigating factors",
        "examples": [
          "User: What are good mitigating factors?",
          "Bot: Good mitigating factors are specific compensating controls that reduce the risk of the exception. For example, if you're requesting an exception to a system access policy, mitigating factors might include enhanced monitoring, time-limited access, or specific access restrictions."
        ]
      }
    ]
  },
  {
    "name": "Managing Approvals",
    "description": "Help approvers review and process exception requests",
    "triggerPhrases": [
      "I need to approve an exception",
      "How do I review pending requests",
      "Where can I see requests waiting for my approval",
      "Approve exception request",
      "Reject exception request",
      "Review pending exceptions"
    ],
    "subtopics": [
      {
        "name": "Finding Pending Requests",
        "description": "Guide approvers to their pending requests queue",
        "examples": [
          "User: Where do I find requests I need to approve?",
          "Bot: You can find requests waiting for your approval in the Approver Dashboard. Navigate to 'Approver Dashboard' from the main menu, then select the 'Pending' tab to see all requests waiting for your review."
        ]
      },
      {
        "name": "Approving or Rejecting",
        "description": "Explain the approval and rejection process",
        "examples": [
          "User: How do I approve a request?",
          "Bot: To approve a request, first open it from your pending queue. Review all the details carefully including the request description, reason, impact, and mitigating factors. If everything looks appropriate, click the 'Approve' button at the bottom of the request. You'll have the option to add comments before confirming."
        ]
      }
    ]
  },
  {
    "name": "Tracking Exceptions",
    "description": "Help users track and monitor existing exception requests",
    "triggerPhrases": [
      "Where is my exception request",
      "Track my exceptions",
      "Check exception status",
      "Is my exception approved yet",
      "Track request progress",
      "View my submitted requests"
    ],
    "subtopics": [
      {
        "name": "Request Status",
        "description": "Explain what different request statuses mean",
        "examples": [
          "User: What does 'assigned' status mean?",
          "Bot: The 'Assigned' status means your request has been routed to the appropriate approvers and is waiting for their review. It has moved from the initial 'Pending' state, which means the system is now actively tracking it for approval."
        ]
      },
      {
        "name": "Viewing Request History",
        "description": "Help users view the history of their requests",
        "examples": [
          "User: How can I see who has reviewed my request?",
          "Bot: To see who has reviewed your request, open the request details and scroll down to the 'Activity Log' section. This shows a chronological record of all actions taken on your request, including when it was submitted, assigned, reviewed, and any status changes."
        ]
      }
    ]
  },
  {
    "name": "Exception Reporting",
    "description": "Guide users on generating and interpreting exception reports",
    "triggerPhrases": [
      "I need exception reports",
      "Generate metrics report",
      "Export exception data",
      "Exception dashboard",
      "Risk reports",
      "Compliance reporting"
    ],
    "subtopics": [
      {
        "name": "Dashboard Overview",
        "description": "Explain how to use the metrics dashboard",
        "examples": [
          "User: How do I use the dashboard?",
          "Bot: The Metrics Dashboard provides visual representations of your exception data. You'll see charts for exception types, status distribution, risk levels, and expiry status. You can filter the data using the controls at the top of the page. For specific metrics, click on any chart to see more detailed information."
        ]
      },
      {
        "name": "Exporting Reports",
        "description": "Guide on exporting exception data for reporting",
        "examples": [
          "User: Can I export the exception data?",
          "Bot: Yes, you can export exception data in several formats. From the Metrics page, look for the export buttons at the top-right of each chart or table. You can export as CSV for data analysis, PDF for formal reporting, or specific chart images for presentations."
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
  },
  {
    "name": "New Approval Required",
    "description": "Triggers when a new request requires an approver's attention",
    "implementation": "Power Automate flow triggered by new items in the exception requests list with status 'pending'"
  },
  {
    "name": "Request Status Changed",
    "description": "Triggers when an exception request status changes",
    "implementation": "SharePoint list column change trigger in Power Automate monitoring the status field"
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
  },
  {
    "title": "Check request status",
    "description": "Check the status of a previously submitted request",
    "text": "What's the status of my exception request?"
  },
  {
    "title": "Review approvals needed",
    "description": "Find requests that need your approval",
    "text": "What requests need my approval?"
  },
  {
    "title": "Generate exception report",
    "description": "Create a report of exception requests",
    "text": "Generate a report of all active exceptions."
  },
  {
    "title": "Explain exception policy",
    "description": "Learn about exception policies and procedures",
    "text": "Explain our exception management policy."
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
            </CardContent>
          </Card>

          <Tabs defaultValue="agent" className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 w-full mb-6">
              <TabsTrigger value="agent">Agent Setup</TabsTrigger>
              <TabsTrigger value="instructions">Instructions</TabsTrigger>
              <TabsTrigger value="topics">Topics</TabsTrigger>
              <TabsTrigger value="actions">Actions</TabsTrigger>
              <TabsTrigger value="triggers">Triggers</TabsTrigger>
              <TabsTrigger value="knowledge">Knowledge</TabsTrigger>
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
                      <div className="bg-muted p-4 rounded-md">
                        <p className="font-medium mb-1">Agent Description:</p>
                        <div className="flex items-center gap-2">
                          <p>An AI assistant that helps manage exception requests, approvals, and reporting within the organization.</p>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="h-7 text-xs"
                            onClick={() => copyToClipboard("An AI assistant that helps manage exception requests, approvals, and reporting within the organization.", "Agent description")}
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
                          <li>Custom Canvas for dedicated web experience</li>
                        </ul>
                      </div>
                      <div className="bg-muted p-4 rounded-md">
                        <p className="font-medium mb-1">Security & Access:</p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Restrict to organizational users only</li>
                          <li>Enable user authentication for API calls</li>
                          <li>Configure role-based access for admin features</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-primary/5 p-4 rounded-md border border-primary/20">
                    <h3 className="text-lg font-semibold mb-3">Implementation Steps</h3>
                    <ol className="list-decimal pl-5 space-y-2">
                      <li>
                        <span className="font-medium">Create Copilot Studio Project:</span>
                        <p className="text-sm text-muted-foreground">Navigate to make.powerapps.com, select "Copilot Studio" from the left menu, and create a new copilot.</p>
                      </li>
                      <li>
                        <span className="font-medium">Configure Basic Settings:</span>
                        <p className="text-sm text-muted-foreground">Set the name, description, and language preferences.</p>
                      </li>
                      <li>
                        <span className="font-medium">Add Topics & Trigger Phrases:</span>
                        <p className="text-sm text-muted-foreground">Create topics for each major functionality area with relevant trigger phrases.</p>
                      </li>
                      <li>
                        <span className="font-medium">Configure Actions:</span>
                        <p className="text-sm text-muted-foreground">Set up custom actions to interact with SharePoint lists and perform CRUD operations on exception data.</p>
                      </li>
                      <li>
                        <span className="font-medium">Add Knowledge Base:</span>
                        <p className="text-sm text-muted-foreground">Upload documentation, requirements, and exception policies to inform the agent.</p>
                      </li>
                      <li>
                        <span className="font-medium">Test & Refine:</span>
                        <p className="text-sm text-muted-foreground">Test the agent with various scenarios and refine the topics and responses.</p>
                      </li>
                      <li>
                        <span className="font-medium">Deploy to Channels:</span>
                        <p className="text-sm text-muted-foreground">Publish the agent to Teams, SharePoint, and other selected channels.</p>
                      </li>
                    </ol>
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
                  
                  <div className="mt-6 bg-primary/5 p-4 rounded-md border border-primary/20">
                    <h3 className="text-lg font-semibold mb-2">Instructions Best Practices</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>
                        <span className="font-medium">Be Clear About Roles:</span>
                        <p className="text-sm text-muted-foreground">Clearly define what the agent should do for different user types (requesters, approvers, admins).</p>
                      </li>
                      <li>
                        <span className="font-medium">Include Process Guidance:</span>
                        <p className="text-sm text-muted-foreground">Add specific instructions about guiding users through complex processes like form creation.</p>
                      </li>
                      <li>
                        <span className="font-medium">Define Tone and Style:</span>
                        <p className="text-sm text-muted-foreground">Specify the communication style that matches your organizational culture.</p>
                      </li>
                      <li>
                        <span className="font-medium">Set Boundaries:</span>
                        <p className="text-sm text-muted-foreground">Clearly state what the agent should not do (e.g., bypass approval processes, share sensitive data).</p>
                      </li>
                      <li>
                        <span className="font-medium">Update Regularly:</span>
                        <p className="text-sm text-muted-foreground">Review and update instructions as policies and processes evolve.</p>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
