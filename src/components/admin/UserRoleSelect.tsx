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
      <SelectTrigger className="w-[200px] bg-white border border-gray-200">
        <SelectValue placeholder="Select a role" />
      </SelectTrigger>
      <SelectContent className="bg-white border border-gray-200 shadow-lg rounded-md">
        <SelectItem value="cyber_approver" className="hover:bg-gray-100 cursor-pointer">Cyber Approver</SelectItem>
        <SelectItem value="legal_approver" className="hover:bg-gray-100 cursor-pointer">Legal Approver</SelectItem>
        <SelectItem value="independence_approver" className="hover:bg-gray-100 cursor-pointer">Independence Approver</SelectItem>
        <SelectItem value="qmr_approver" className="hover:bg-gray-100 cursor-pointer">QMR Approver</SelectItem>
        <SelectItem value="clientAcceptance_approver" className="hover:bg-gray-100 cursor-pointer">Client Acceptance Approver</SelectItem>
        <SelectItem value="engagementRisk_approver" className="hover:bg-gray-100 cursor-pointer">Engagement Risk Approver</SelectItem>
        <SelectItem value="auditFinding_approver" className="hover:bg-gray-100 cursor-pointer">Audit Finding Approver</SelectItem>
        <SelectItem value="data_approver" className="hover:bg-gray-100 cursor-pointer">Data Approver</SelectItem>
        <SelectItem value="ai_approver" className="hover:bg-gray-100 cursor-pointer">AI Approver</SelectItem>
      </SelectContent>
    </Select>
  );
};