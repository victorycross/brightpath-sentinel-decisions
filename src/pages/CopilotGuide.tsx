
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, FileDown, Download, Info, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

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
            </TabsContent>

            <TabsContent value="topics" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Conversation Topics</CardTitle>
                  <CardDescription>
                    Define focused conversation topics to guide how your agent responds
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted p-4 rounded-md mb-4 max-h-96 overflow-y-auto">
                    <pre className="whitespace-pre-wrap text-sm">{sampleTopics}</pre>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="outline" 
                      onClick={() => copyToClipboard(sampleTopics, "Topics configuration")}
                      className="gap-2"
                    >
                      <Copy className="h-4 w-4" />
                      Copy Topics
                    </Button>
                    <Button 
                      onClick={() => downloadFile(sampleTopics, "exception-agent-topics.json")}
                      className="gap-2"
                    >
                      <Download className="h-4 w-4" />
                      Download JSON
                    </Button>
                  </div>

                  <div className="mt-6">
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="creating-topics">
                        <AccordionTrigger>Creating Effective Topics</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-4 text-sm">
                            <p>
                              Creating effective topics is crucial for your Copilot Studio agent to understand and respond appropriately to user requests. 
                              Each topic should focus on a specific task or information need related to exception management.
                            </p>
                            <div className="bg-muted p-3 rounded-md">
                              <h4 className="font-medium">Topic Structure</h4>
                              <ul className="list-disc pl-5 mt-2 space-y-1">
                                <li><span className="font-medium">Name:</span> Clear, descriptive name for the topic</li>
                                <li><span className="font-medium">Description:</span> What this topic addresses</li>
                                <li><span className="font-medium">Trigger Phrases:</span> 5-10 different ways users might ask about this topic</li>
                                <li><span className="font-medium">Subtopics:</span> More specific aspects within the main topic</li>
                                <li><span className="font-medium">Examples:</span> Sample conversations for training</li>
                              </ul>
                            </div>
                            <p>
                              Within Copilot Studio, you can create these topics in the "Topics" section. For each topic, you can define the conversation flow,
                              including when to ask clarifying questions, when to call actions, and how to format responses.
                            </p>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="copilot-structure">
                        <AccordionTrigger>Topic Implementation Structure</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-4 text-sm">
                            <p>When implementing topics in Copilot Studio, follow this structure:</p>
                            <ol className="list-decimal pl-5 space-y-2">
                              <li>
                                <span className="font-medium">Create main category topics first</span> - These broad topics cover major functional areas like "Creating Requests" or "Managing Approvals".
                              </li>
                              <li>
                                <span className="font-medium">Add subtopics for specific tasks</span> - Under each main topic, add more focused topics that handle specific user needs or questions.
                              </li>
                              <li>
                                <span className="font-medium">Define conversation nodes</span> - For each topic, create a logical flow of conversation nodes that:
                                <ul className="list-disc pl-5 mt-1 space-y-1">
                                  <li>Acknowledge the user's request</li>
                                  <li>Ask for any missing information</li>
                                  <li>Call appropriate actions if needed</li>
                                  <li>Provide clear responses or next steps</li>
                                </ul>
                              </li>
                              <li>
                                <span className="font-medium">Add conditions and branching</span> - Use conditions to create different response paths based on user inputs or context.
                              </li>
                              <li>
                                <span className="font-medium">Test with sample conversations</span> - Use the test canvas to validate that your topic responds correctly to different phrasings and scenarios.
                              </li>
                            </ol>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="actions" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Custom Actions</CardTitle>
                  <CardDescription>
                    API actions that empower your agent to interact with exception management data
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
                      onClick={() => downloadFile(apiSchema, "exception-management-api.json")}
                      className="gap-2"
                    >
                      <Download className="h-4 w-4" />
                      Download Schema
                    </Button>
                  </div>

                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-primary/5 p-4 rounded-md border border-primary/20">
                      <h3 className="text-lg font-semibold mb-2">SharePoint Implementation</h3>
                      <p className="text-sm mb-3">
                        Instead of direct API calls, implement these actions using SharePoint lists and Power Automate:
                      </p>
                      <ul className="list-disc pl-5 space-y-2 text-sm">
                        <li>
                          <span className="font-medium">GET /exceptions:</span> Create a Power Automate flow that queries the Exception Requests SharePoint list with filters
                        </li>
                        <li>
                          <span className="font-medium">POST /exceptions:</span> Create a flow that adds a new item to the Exception Requests list
                        </li>
                        <li>
                          <span className="font-medium">PUT /exceptions/{"{id}"}:</span> Update an existing item in the list
                        </li>
                        <li>
                          <span className="font-medium">POST /exceptions/{"{id}"}/approve:</span> Update status field and create an audit log entry
                        </li>
                      </ul>
                    </div>
                    <div className="bg-secondary/5 p-4 rounded-md border border-secondary/20">
                      <h3 className="text-lg font-semibold mb-2">Copilot Studio Integration</h3>
                      <p className="text-sm mb-3">
                        Connect your actions to Copilot Studio:
                      </p>
                      <ol className="list-decimal pl-5 space-y-2 text-sm">
                        <li>
                          In Copilot Studio, go to "Actions" and select "Create a new action"
                        </li>
                        <li>
                          Choose "Power Automate flow" as the action type
                        </li>
                        <li>
                          Select or create a flow that implements the required functionality
                        </li>
                        <li>
                          Configure input and output parameters to match your API schema
                        </li>
                        <li>
                          Test the action to ensure it works correctly
                        </li>
                        <li>
                          Use the action in your conversation topics when needed
                        </li>
                      </ol>
                    </div>
                  </div>

                  <div className="mt-4">
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="sharepoint-lists">
                        <AccordionTrigger>SharePoint Lists Structure</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-4 text-sm">
                            <p>
                              Create the following SharePoint lists to store exception management data:
                            </p>
                            <div className="bg-muted p-3 rounded-md">
                              <h4 className="font-medium">Exception Requests</h4>
                              <p className="text-xs text-muted-foreground mb-2">Primary list for storing exception requests</p>
                              <ul className="list-disc pl-5 space-y-1">
                                <li>Title (Single line of text) - Exception title</li>
                                <li>Type (Choice) - Exception type</li>
                                <li>Status (Choice) - Request status</li>
                                <li>Request (Multiple lines of text) - Description</li>
                                <li>Reason (Multiple lines of text) - Justification</li>
                                <li>Impact (Multiple lines of text) - Impact description</li>
                                <li>MitigatingFactors (Multiple lines of text) - Controls</li>
                                <li>ResidualRisk (Choice) - Risk level</li>
                                <li>IncidentReference (Single line of text) - Optional reference</li>
                                <li>ExpiryDate (Date and Time) - When exception expires</li>
                                <li>Expired (Yes/No) - Whether exception has expired</li>
                                <li>SubmittedBy (Person) - Creator of request</li>
                              </ul>
                            </div>
                            <div className="bg-muted p-3 rounded-md">
                              <h4 className="font-medium">Exception Audit Logs</h4>
                              <p className="text-xs text-muted-foreground mb-2">Tracks all actions taken on exception requests</p>
                              <ul className="list-disc pl-5 space-y-1">
                                <li>RequestId (Single line of text) - Link to exception request</li>
                                <li>Action (Choice) - Type of action taken</li>
                                <li>Changes (Multiple lines of text) - JSON of changes</li>
                                <li>PerformedBy (Person) - User who performed action</li>
                                <li>Created (Date and Time) - When action occurred</li>
                              </ul>
                            </div>
                            <div className="bg-muted p-3 rounded-md">
                              <h4 className="font-medium">Approver Roles</h4>
                              <p className="text-xs text-muted-foreground mb-2">Maps users to approver roles</p>
                              <ul className="list-disc pl-5 space-y-1">
                                <li>User (Person) - User account</li>
                                <li>Role (Choice) - Approver role</li>
                              </ul>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="flow-examples">
                        <AccordionTrigger>Power Automate Flow Examples</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-4 text-sm">
                            <p>
                              Create these key Power Automate flows to handle exception management processes:
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div className="bg-muted p-3 rounded-md">
                                <h4 className="font-medium">Create Exception Request Flow</h4>
                                <ol className="list-decimal pl-5 mt-1 space-y-1">
                                  <li>Trigger: When called from Copilot Studio</li>
                                  <li>Get form data from inputs</li>
                                  <li>Create item in Exception Requests list</li>
                                  <li>Create audit log entry</li>
                                  <li>Notify approvers based on request type</li>
                                  <li>Return request ID and confirmation</li>
                                </ol>
                              </div>
                              <div className="bg-muted p-3 rounded-md">
                                <h4 className="font-medium">Approve Exception Flow</h4>
                                <ol className="list-decimal pl-5 mt-1 space-y-1">
                                  <li>Trigger: When called from Copilot Studio</li>
                                  <li>Get request ID and comments</li>
                                  <li>Check user has approver role</li>
                                  <li>Update status to "approved"</li>
                                  <li>Create audit log entry</li>
                                  <li>Notify requester</li>
                                  <li>Return confirmation</li>
                                </ol>
                              </div>
                              <div className="bg-muted p-3 rounded-md">
                                <h4 className="font-medium">Get User Requests Flow</h4>
                                <ol className="list-decimal pl-5 mt-1 space-y-1">
                                  <li>Trigger: When called from Copilot Studio</li>
                                  <li>Get current user email</li>
                                  <li>Query Exception Requests list for user's requests</li>
                                  <li>Format results for display</li>
                                  <li>Return formatted list to Copilot</li>
                                </ol>
                              </div>
                              <div className="bg-muted p-3 rounded-md">
                                <h4 className="font-medium">Exception Expiry Notification Flow</h4>
                                <ol className="list-decimal pl-5 mt-1 space-y-1">
                                  <li>Trigger: Scheduled daily</li>
                                  <li>Query exceptions approaching expiry</li>
                                  <li>Generate notification list</li>
                                  <li>Send email alerts to owners</li>
                                  <li>Update expired flags as needed</li>
                                </ol>
                              </div>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="triggers" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Triggers and Automation</CardTitle>
                  <CardDescription>
                    Event-based triggers that activate your agent for specific scenarios
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted p-4 rounded-md mb-4 max-h-96 overflow-y-auto">
                    <pre className="whitespace-pre-wrap text-sm">{sampleTriggers}</pre>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="outline" 
                      onClick={() => copyToClipboard(sampleTriggers, "Triggers configuration")}
                      className="gap-2"
                    >
                      <Copy className="h-4 w-4" />
                      Copy Triggers
                    </Button>
                    <Button 
                      onClick={() => downloadFile(sampleTriggers, "exception-agent-triggers.json")}
                      className="gap-2"
                    >
                      <Download className="h-4 w-4" />
                      Download JSON
                    </Button>
                  </div>

                  <div className="mt-6 bg-primary/5 p-4 rounded-md border border-primary/20">
                    <h3 className="text-lg font-semibold mb-2">Trigger Implementation Guide</h3>
                    <p className="text-sm mb-4">
                      In Microsoft 365, triggers are implemented through a combination of Power Automate, SharePoint, and Teams integration.
                      Here's how to implement each type:
                    </p>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium">Button/Action Triggers</h4>
                        <p className="text-sm text-muted-foreground">For triggers like "New Request Button Click":</p>
                        <ol className="list-decimal pl-5 mt-1 text-sm space-y-1">
                          <li>Add adaptive cards with action buttons in Teams</li>
                          <li>Configure the button to launch a specific Copilot topic</li>
                          <li>Use Power Automate to connect the button to Copilot Studio</li>
                        </ol>
                      </div>
                      <div>
                        <h4 className="font-medium">Scheduled/Time-based Triggers</h4>
                        <p className="text-sm text-muted-foreground">For triggers like "Approaching Expiry":</p>
                        <ol className="list-decimal pl-5 mt-1 text-sm space-y-1">
                          <li>Create a scheduled Power Automate flow</li>
                          <li>Query SharePoint for exceptions approaching expiry</li>
                          <li>Generate Teams notifications with Copilot deep links</li>
                        </ol>
                      </div>
                      <div>
                        <h4 className="font-medium">Data Change Triggers</h4>
                        <p className="text-sm text-muted-foreground">For triggers like "Request Status Changed":</p>
                        <ol className="list-decimal pl-5 mt-1 text-sm space-y-1">
                          <li>Create a Power Automate flow triggered by list item changes</li>
                          <li>Configure conditions to detect specific status changes</li>
                          <li>Send notifications with Copilot context links</li>
                        </ol>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="proactive-messages">
                        <AccordionTrigger>Proactive Messaging</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-4 text-sm">
                            <p>
                              Proactive messaging allows your Copilot agent to initiate conversations based on triggers without the user first engaging:
                            </p>
                            
                            <div className="bg-muted p-3 rounded-md">
                              <h4 className="font-medium">Teams Proactive Messaging</h4>
                              <p className="text-xs text-muted-foreground mb-2">Send notifications to users in Teams</p>
                              <ol className="list-decimal pl-5 space-y-1">
                                <li>Set up an Azure Bot registration for your Copilot agent</li>
                                <li>Use the Teams Bot API to send proactive messages</li>
                                <li>Include adaptive cards with action buttons that link back to Copilot conversations</li>
                                <li>Store conversation references to enable follow-up messages</li>
                              </ol>
                            </div>
                            
                            <div className="bg-muted p-3 rounded-md">
                              <h4 className="font-medium">Implementation Example: Approval Needed</h4>
                              <p className="text-xs text-muted-foreground mb-2">Send notification when approval is needed</p>
                              <ol className="list-decimal pl-5 space-y-1">
                                <li>Create a Power Automate flow triggered when a new exception request is created</li>
                                <li>Query approver roles list to find appropriate approvers</li>
                                <li>For each approver, send a Teams notification with:
                                  <ul className="list-disc pl-5 mt-1 space-y-1">
                                    <li>Exception request details</li>
                                    <li>"Review" button that opens Copilot with context</li>
                                    <li>Quick approve/reject actions</li>
                                  </ul>
                                </li>
                                <li>Track notification status in a SharePoint list</li>
                              </ol>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="orchestration">
                        <AccordionTrigger>Orchestration Tips</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-4 text-sm">
                            <p>
                              Orchestration involves coordinating the interactions between Copilot Studio, Power Automate, SharePoint, and Teams:
                            </p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div className="bg-muted p-3 rounded-md">
                                <h4 className="font-medium">State Management</h4>
                                <ul className="list-disc pl-5 mt-1 space-y-1">
                                  <li>Store conversation state in Copilot Studio variables</li>
                                  <li>Use SharePoint for persistent data storage</li>
                                  <li>Pass context parameters in deep links</li>
                                  <li>Use adaptive card state for quick actions</li>
                                </ul>
                              </div>
                              
                              <div className="bg-muted p-3 rounded-md">
                                <h4 className="font-medium">Error Handling</h4>
                                <ul className="list-disc pl-5 mt-1 space-y-1">
                                  <li>Add try/catch blocks in Power Automate</li>
                                  <li>Create fallback topics in Copilot Studio</li>
                                  <li>Log errors to a dedicated SharePoint list</li>
                                  <li>Implement retry logic for critical operations</li>
                                </ul>
                              </div>
                              
                              <div className="bg-muted p-3 rounded-md">
                                <h4 className="font-medium">Performance Optimization</h4>
                                <ul className="list-disc pl-5 mt-1 space-y-1">
                                  <li>Use SharePoint indexed columns</li>
                                  <li>Implement caching where appropriate</li>
                                  <li>Limit response sizes in API calls</li>
                                  <li>Use batch operations for multiple updates</li>
                                </ul>
                              </div>
                              
                              <div className="bg-muted p-3 rounded-md">
                                <h4 className="font-medium">Security Considerations</h4>
                                <ul className="list-disc pl-5 mt-1 space-y-1">
                                  <li>Use SharePoint permission inheritance</li>
                                  <li>Implement connection authentication</li>
                                  <li>Validate user permissions in flows</li>
                                  <li>Encrypt sensitive data in transit and at rest</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="knowledge" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Knowledge Base</CardTitle>
                  <CardDescription>
                    Resources to inform and improve AI-generated responses
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Recommended Knowledge Sources</h3>
                      
                      <div className="bg-muted p-4 rounded-md">
                        <h4 className="font-medium mb-2">Primary Documents</h4>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>
                            <span className="font-medium">Exception Management Policy</span>
                            <p className="text-sm text-muted-foreground">Upload your organization's official policy document</p>
                          </li>
                          <li>
                            <span className="font-medium">Requirements Documentation</span>
                            <div className="flex items-center gap-2">
                              <p className="text-sm text-muted-foreground">The system requirements document</p>
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="h-7 text-xs"
                                onClick={() => downloadFile(getRequirementsMarkdown(), "exception-management-requirements.md")}
                              >
                                <Download className="h-3 w-3 mr-1" />
                                Download
                              </Button>
                            </div>
                          </li>
                          <li>
                            <span className="font-medium">Approval Workflow Documentation</span>
                            <p className="text-sm text-muted-foreground">Document describing approval processes</p>
                          </li>
                          <li>
                            <span className="font-medium">Exception Type Descriptions</span>
                            <p className="text-sm text-muted-foreground">Detailed descriptions of each exception type</p>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="bg-muted p-4 rounded-md">
                        <h4 className="font-medium mb-2">FAQs and User Guides</h4>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>
                            <span className="font-medium">Requestor FAQ</span>
                            <p className="text-sm text-muted-foreground">Common questions from users submitting requests</p>
                          </li>
                          <li>
                            <span className="font-medium">Approver Guide</span>
                            <p className="text-sm text-muted-foreground">Instructions for approvers reviewing requests</p>
                          </li>
                          <li>
                            <span className="font-medium">Admin Troubleshooting Guide</span>
                            <p className="text-sm text-muted-foreground">Solutions for common system issues</p>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Knowledge Implementation</h3>
                      
                      <div className="bg-primary/5 p-4 rounded-md border border-primary/20">
                        <h4 className="font-medium mb-2">Adding Knowledge in Copilot Studio</h4>
                        <ol className="list-decimal pl-5 space-y-2 text-sm">
                          <li>
                            <span className="font-medium">Create a Knowledge Base:</span>
                            <p className="text-muted-foreground">In Copilot Studio, navigate to "Knowledge" and click "Add knowledge base"</p>
                          </li>
                          <li>
                            <span className="font-medium">Choose Knowledge Source:</span>
                            <ul className="list-disc pl-5 mt-1 space-y-1">
                              <li>SharePoint: Connect to document libraries containing policy docs</li>
                              <li>Web URLs: Link to internal SharePoint pages with documentation</li>
                              <li>Manual entry: Add FAQs and Q&A pairs directly</li>
                              <li>Files: Upload PDFs, Word docs, and other files</li>
                            </ul>
                          </li>
                          <li>
                            <span className="font-medium">Configure Processing Options:</span>
                            <p className="text-muted-foreground">Set chunking, extraction, and relevance settings</p>
                          </li>
                          <li>
                            <span className="font-medium">Test and Refine:</span>
                            <p className="text-muted-foreground">Use the test interface to verify knowledge retrieval</p>
                          </li>
                          <li>
                            <span className="font-medium">Publish and Monitor:</span>
                            <p className="text-muted-foreground">Publish your knowledge base and monitor usage analytics</p>
                          </li>
                        </ol>
                      </div>
                      
                      <div className="bg-muted p-4 rounded-md">
                        <h4 className="font-medium mb-2">Knowledge Organization Best Practices</h4>
                        <ul className="list-disc pl-5 space-y-2 text-sm">
                          <li>
                            <span className="font-medium">Organize by Topic:</span>
                            <p className="text-muted-foreground">Group related knowledge into topic-specific knowledge bases</p>
                          </li>
                          <li>
                            <span className="font-medium">Include Metadata:</span>
                            <p className="text-muted-foreground">Tag documents with metadata to improve search relevance</p>
                          </li>
                          <li>
                            <span className="font-medium">Regular Updates:</span>
                            <p className="text-muted-foreground">Schedule regular reviews to keep knowledge current</p>
                          </li>
                          <li>
                            <span className="font-medium">User Feedback Loop:</span>
                            <p className="text-muted-foreground">Implement a process to incorporate user feedback into knowledge</p>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="bg-secondary/5 p-4 rounded-md border border-secondary/20">
                        <h4 className="font-medium mb-2">Knowledge Sources Integration</h4>
                        <p className="text-sm mb-2">Connect these knowledge sources to your Copilot agent:</p>
                        <ul className="list-disc pl-5 space-y-1 text-sm">
                          <li>SharePoint document libraries</li>
                          <li>Microsoft Teams wiki pages</li>
                          <li>SharePoint site pages</li>
                          <li>Power BI dashboards (for metrics)</li>
                          <li>OneDrive shared files</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="prompts" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Starter Prompts</CardTitle>
                  <CardDescription>
                    Suggested ways to start conversations with your Copilot agent
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
                      onClick={() => downloadFile(starterPrompts, "exception-agent-starter-prompts.json")}
                      className="gap-2"
                    >
                      <Download className="h-4 w-4" />
                      Download JSON
                    </Button>
                  </div>

                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Implementation Tips</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="list-disc pl-5 space-y-2 text-sm">
                          <li>
                            <span className="font-medium">Add to Teams:</span> Configure these starter prompts in Teams channels where the Copilot is active
                          </li>
                          <li>
                            <span className="font-medium">Group by Audience:</span> Create different prompt sets for requesters, approvers, and administrators
                          </li>
                          <li>
                            <span className="font-medium">Role-based Visibility:</span> Show only relevant prompts based on the user's role
                          </li>
                          <li>
                            <span className="font-medium">Context Awareness:</span> Add prompts that appear based on the user's current context (e.g., when viewing the approvals page)
                          </li>
                          <li>
                            <span className="font-medium">Include Examples:</span> Add example responses to help users understand what to expect
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Configuration in Copilot Studio</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ol className="list-decimal pl-5 space-y-2 text-sm">
                          <li>
                            In Copilot Studio, navigate to "Conversation starters"
                          </li>
                          <li>
                            Click "Add conversation starter" for each prompt
                          </li>
                          <li>
                            Enter the prompt text and description
                          </li>
                          <li>
                            Link each prompt to the appropriate topic
                          </li>
                          <li>
                            Group prompts by category
                          </li>
                          <li>
                            Test each prompt to ensure it triggers the correct response
                          </li>
                          <li>
                            Publish changes to make them available to users
                          </li>
                        </ol>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="mt-4 p-4 bg-primary/5 rounded-md border border-primary/20">
                    <h3 className="text-lg font-semibold mb-2">Sample Copilot Interactions</h3>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="create-request">
                        <AccordionTrigger>Creating a New Exception Request</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2 text-sm">
                            <div className="bg-muted p-3 rounded-md">
                              <p className="font-medium text-primary">User:</p>
                              <p>I need to create a new exception request.</p>
                            </div>
                            <div className="bg-muted p-3 rounded-md">
                              <p className="font-medium text-secondary">Copilot:</p>
                              <p>I'd be happy to help you create a new exception request. To get started, I'll need to know what type of exception you're requesting. Here are the available options:</p>
                              <ul className="list-disc pl-5 mt-2 space-y-1">
                                <li>Cyber or Technology Issues</li>
                                <li>Legal/Privacy Issues</li>
                                <li>Independence Issues</li>
                                <li>Quality Management Review (QMR)</li>
                                <li>Client Acceptance and Continuance</li>
                                <li>Engagement Risk</li>
                                <li>Audit Finding Exception</li>
                                <li>Data-Related Issues</li>
                                <li>AI and Emerging Technology Issues</li>
                              </ul>
                              <p className="mt-2">Which type of exception are you requesting?</p>
                            </div>
                            <div className="bg-muted p-3 rounded-md">
                              <p className="font-medium text-primary">User:</p>
                              <p>I need a cyber exception.</p>
                            </div>
                            <div className="bg-muted p-3 rounded-md">
                              <p className="font-medium text-secondary">Copilot:</p>
                              <p>Great! You're creating a Cyber or Technology exception request. I'll help you through the process step by step.</p>
                              <p className="mt-2">First, please provide a title for your exception request. This should be a brief summary of what you're requesting.</p>
                            </div>
                            <div className="bg-muted p-3 rounded-md">
                              <p className="font-medium text-primary">User:</p>
                              <p>Exception to password rotation policy for legacy system.</p>
                            </div>
                            <div className="bg-muted p-3 rounded-md">
                              <p className="font-medium text-secondary">Copilot:</p>
                              <p>Thanks for providing the title. Now I need more details about your request.</p>
                              <p className="mt-2">Please describe the specific exception you're requesting. What aspect of the password rotation policy needs to be excepted for this legacy system?</p>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="check-status">
                        <AccordionTrigger>Checking Request Status</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2 text-sm">
                            <div className="bg-muted p-3 rounded-md">
                              <p className="font-medium text-primary">User:</p>
                              <p>What's the status of my exception requests?</p>
                            </div>
                            <div className="bg-muted p-3 rounded-md">
                              <p className="font-medium text-secondary">Copilot:</p>
                              <p>I'll check the status of your exception requests. One moment please...</p>
                              <p className="mt-2">I found 3 exception requests you've submitted:</p>
                              <ol className="list-decimal pl-5 mt-2 space-y-1">
                                <li><span className="font-medium">Exception to password rotation policy</span> - Status: <span className="text-amber-500 font-medium">Pending</span>, Submitted: 3 days ago</li>
                                <li><span className="font-medium">Data retention exception for Project X</span> - Status: <span className="text-green-500 font-medium">Approved</span>, Approved on: June 15, 2023</li>
                                <li><span className="font-medium">Client onboarding policy exception</span> - Status: <span className="text-red-500 font-medium">Rejected</span>, Rejected on: May 30, 2023</li>
                              </ol>
                              <p className="mt-2">Would you like more details about any of these requests?</p>
                            </div>
                            <div className="bg-muted p-3 rounded-md">
                              <p className="font-medium text-primary">User:</p>
                              <p>Tell me more about the password rotation policy exception.</p>
                            </div>
                            <div className="bg-muted p-3 rounded-md">
                              <p className="font-medium text-secondary">Copilot:</p>
                              <p>Here are the details for your password rotation policy exception request:</p>
                              <div className="mt-2 space-y-1">
                                <p><span className="font-medium">Title:</span> Exception to password rotation policy for legacy system</p>
                                <p><span className="font-medium">Type:</span> Cyber/Technology</p>
                                <p><span className="font-medium">Status:</span> Pending</p>
                                <p><span className="font-medium">Submitted:</span> June 12, 2023</p>
                                <p><span className="font-medium">Current approvers:</span> Chief Information Security Officer, Chief Information Officer</p>
                                <p><span className="font-medium">Current approval stage:</span> 1 of 2</p>
                                <p><span className="font-medium">Description:</span> Request to exempt the ERP legacy system from the 90-day password rotation requirement due to technical limitations.</p>
                              </div>
                              <p className="mt-2">Your request is currently waiting for approval from the CISO. Would you like me to send a reminder to the approver?</p>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 p-6 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">Additional Resources</CardTitle>
              <CardDescription>
                Helpful links and documentation for building your Copilot Studio agent
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>
                  These resources will help you implement the exception management functionality in Microsoft 365 using Copilot Studio:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <a 
                    href="https://learn.microsoft.com/en-us/microsoft-copilot-studio/fundamentals-what-is-copilot-studio" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-card p-4 rounded-md shadow-sm hover:shadow-md transition-shadow"
                  >
                    <ExternalLink className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Microsoft Copilot Studio Documentation</p>
                      <p className="text-sm text-muted-foreground">Official documentation for Copilot Studio</p>
                    </div>
                  </a>
                  <a 
                    href="https://learn.microsoft.com/en-us/microsoft-copilot-studio/advanced-use-flow" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-card p-4 rounded-md shadow-sm hover:shadow-md transition-shadow"
                  >
                    <ExternalLink className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Power Automate Integration Guide</p>
                      <p className="text-sm text-muted-foreground">Connecting Copilot Studio to Power Automate</p>
                    </div>
                  </a>
                  <a 
                    href="https://learn.microsoft.com/en-us/microsoft-copilot-studio/advanced-use-entities" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-card p-4 rounded-md shadow-sm hover:shadow-md transition-shadow"
                  >
                    <ExternalLink className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Entities and Variables Guide</p>
                      <p className="text-sm text-muted-foreground">Managing data in Copilot Studio</p>
                    </div>
                  </a>
                  <a 
                    href="https://learn.microsoft.com/en-us/sharepoint/create-list-sharepoint" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-card p-4 rounded-md shadow-sm hover:shadow-md transition-shadow"
                  >
                    <ExternalLink className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">SharePoint Lists Documentation</p>
                      <p className="text-sm text-muted-foreground">Creating and configuring SharePoint lists</p>
                    </div>
                  </a>
                  <a 
                    href="https://learn.microsoft.com/en-us/microsoftteams/platform/bots/what-are-bots" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-card p-4 rounded-md shadow-sm hover:shadow-md transition-shadow"
                  >
                    <ExternalLink className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Teams Bot Integration</p>
                      <p className="text-sm text-muted-foreground">Adding bots to Microsoft Teams</p>
                    </div>
                  </a>
                  <a 
                    href="https://learn.microsoft.com/en-us/microsoft-copilot-studio/custom-integrations" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-card p-4 rounded-md shadow-sm hover:shadow-md transition-shadow"
                  >
                    <ExternalLink className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Custom Integrations Guide</p>
                      <p className="text-sm text-muted-foreground">Building custom actions for Copilot Studio</p>
                    </div>
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Card>
    </div>
  );
};
