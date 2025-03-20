
import { FieldDefinition } from "../ListFieldTable";

export const exceptionRequestFields: FieldDefinition[] = [
  {
    name: "Title",
    type: "Single line of text",
    required: true,
    description: "Title of the exception request"
  },
  {
    name: "RequestType",
    type: "Choice",
    required: true,
    description: "Type of exception (Cyber, Legal, Independence, QMR, Client Acceptance, Engagement Risk, Audit Finding, Data, AI)"
  },
  {
    name: "Description",
    type: "Multiple lines of text",
    required: true,
    description: "Detailed description of the exception request"
  },
  {
    name: "Impact",
    type: "Multiple lines of text",
    required: true,
    description: "Description of the impact if exception is approved"
  },
  {
    name: "MitigatingFactors",
    type: "Multiple lines of text",
    required: true,
    description: "Actions taken to reduce risk"
  },
  {
    name: "ResidualRisk",
    type: "Choice",
    required: true,
    description: "Risk level (High, Medium, Low)"
  },
  {
    name: "Status",
    type: "Choice",
    required: true,
    description: "Current status (Pending, Assigned, Approved, Rejected)"
  },
  {
    name: "SubmittedBy",
    type: "Person or Group",
    required: true,
    description: "User who submitted the request"
  },
  {
    name: "SubmittedDate",
    type: "Date and Time",
    required: true,
    description: "Date and time the request was submitted"
  },
  {
    name: "ExpiryDate",
    type: "Date and Time",
    required: false,
    description: "Date when the exception expires"
  },
  {
    name: "ApproverComments",
    type: "Multiple lines of text",
    required: false,
    description: "Feedback from approvers"
  },
  {
    name: "SupportingDocuments",
    type: "Hyperlink or Picture",
    required: false,
    description: "Links to supporting documentation"
  }
];

export const exceptionRequestChoices = [
  {
    title: "RequestType Options",
    options: [
      "Cyber or Technology Issues",
      "Legal/Privacy Issues",
      "Independence Issues",
      "Quality Management Review (QMR)",
      "Client Acceptance and Continuance",
      "Engagement Risk",
      "Audit Finding Exception",
      "Data-Related Issues",
      "AI and Emerging Technology Issues"
    ]
  },
  {
    title: "Status Options",
    options: [
      "Pending",
      "Assigned",
      "Approved",
      "Rejected"
    ]
  },
  {
    title: "ResidualRisk Options",
    options: [
      "High",
      "Medium",
      "Low"
    ]
  }
];
