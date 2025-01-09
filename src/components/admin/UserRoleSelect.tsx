import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Shield } from "lucide-react";

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

const roleLabels: Record<ApproverRole, string> = {
  cyber_approver: "Cyber Security",
  legal_approver: "Legal",
  independence_approver: "Independence",
  qmr_approver: "Quality & Risk Management",
  clientAcceptance_approver: "Client Acceptance",
  engagementRisk_approver: "Engagement Risk",
  auditFinding_approver: "Audit Finding",
  data_approver: "Data Protection",
  ai_approver: "AI & Innovation",
};

export const UserRoleSelect = ({ onRoleChange }: UserRoleSelectProps) => {
  return (
    <Select onValueChange={(value: ApproverRole) => onRoleChange(value)}>
      <SelectTrigger className="w-[240px] bg-white dark:bg-gray-800">
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-muted-foreground" />
          <SelectValue placeholder="Select a role" />
        </div>
      </SelectTrigger>
      <SelectContent className="bg-white dark:bg-gray-800">
        {(Object.entries(roleLabels) as [ApproverRole, string][]).map(([value, label]) => (
          <SelectItem 
            key={value} 
            value={value}
            className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};