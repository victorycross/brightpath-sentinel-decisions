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
  | "ai_approver"
  | "cro_approver"
  | "admin_approver";

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
  cro_approver: "Chief Risk Officer",
  admin_approver: "Admin",
};

export const UserRoleSelect = ({ onRoleChange }: UserRoleSelectProps) => {
  return (
    <Select onValueChange={(value: ApproverRole) => onRoleChange(value)}>
      <SelectTrigger className="w-full bg-background border-primary/20 hover:bg-primary/5 transition-colors">
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-primary/70" />
          <SelectValue placeholder="Select a role" />
        </div>
      </SelectTrigger>
      <SelectContent className="bg-background">
        {(Object.entries(roleLabels) as [ApproverRole, string][]).map(([value, label]) => (
          <SelectItem 
            key={value} 
            value={value}
            className="cursor-pointer hover:bg-primary/5 focus:bg-primary/10"
          >
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary/70" />
              {label}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};