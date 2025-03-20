
import { FieldDefinition } from "../ListFieldTable";

export const approversFields: FieldDefinition[] = [
  {
    name: "Title",
    type: "Single line of text",
    required: true,
    description: "Display name for the approver role"
  },
  {
    name: "User",
    type: "Person or Group",
    required: true,
    description: "The user assigned to this approver role"
  },
  {
    name: "ApproverRole",
    type: "Choice",
    required: true,
    description: "Type of approval role (Cyber, Legal, Independence, QMR, Client, Risk, Audit, Data, AI)"
  },
  {
    name: "IsActive",
    type: "Yes/No",
    required: true,
    description: "Whether this approver is currently active"
  },
  {
    name: "Department",
    type: "Single line of text",
    required: false,
    description: "Department the approver belongs to"
  }
];

export const approverRoleChoices = [
  {
    title: "ApproverRole Options",
    options: [
      "Cyber Approver",
      "Legal Approver",
      "Independence Approver",
      "QMR Approver",
      "Client Acceptance Approver",
      "Risk Approver",
      "Audit Approver",
      "Data Approver",
      "AI Approver",
      "Admin Approver"
    ]
  }
];
