
import { FieldDefinition } from "../ListFieldTable";

export const approvalHistoryFields: FieldDefinition[] = [
  {
    name: "Title",
    type: "Single line of text",
    required: true,
    description: "Auto-generated title (Request ID + timestamp)"
  },
  {
    name: "RequestID",
    type: "Lookup",
    required: true,
    description: "Link to the Exception Request item"
  },
  {
    name: "Approver",
    type: "Person or Group",
    required: true,
    description: "User who performed the approval action"
  },
  {
    name: "Action",
    type: "Choice",
    required: true,
    description: "Action taken (Approved, Rejected, Returned for Info)"
  },
  {
    name: "Comments",
    type: "Multiple lines of text",
    required: false,
    description: "Approver's comments"
  },
  {
    name: "ActionDate",
    type: "Date and Time",
    required: true,
    description: "When the approval action was taken"
  },
  {
    name: "ApproverRole",
    type: "Choice",
    required: true,
    description: "Role of the approver who took action"
  }
];
