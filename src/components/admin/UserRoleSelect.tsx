import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ApproverRole = 
  | "cyber_approver"
  | "legal_approver"
  | "independence_approver"
  | "qmr_approver"
  | "clientAcceptance_approver"
  | "engagementRisk_approver"
  | "auditFinding_approver"
  | "data_approver"
  | "ai_approver";

interface UserRoleSelectProps {
  onRoleChange: (role: ApproverRole) => void;
}

export const UserRoleSelect = ({ onRoleChange }: UserRoleSelectProps) => {
  return (
    <Select onValueChange={(value: ApproverRole) => onRoleChange(value)}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select a role" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="cyber_approver">Cyber Approver</SelectItem>
        <SelectItem value="legal_approver">Legal Approver</SelectItem>
        <SelectItem value="independence_approver">Independence Approver</SelectItem>
        <SelectItem value="qmr_approver">QMR Approver</SelectItem>
        <SelectItem value="clientAcceptance_approver">Client Acceptance Approver</SelectItem>
        <SelectItem value="engagementRisk_approver">Engagement Risk Approver</SelectItem>
        <SelectItem value="auditFinding_approver">Audit Finding Approver</SelectItem>
        <SelectItem value="data_approver">Data Approver</SelectItem>
        <SelectItem value="ai_approver">AI Approver</SelectItem>
      </SelectContent>
    </Select>
  );
};