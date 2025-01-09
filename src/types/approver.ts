export type ApproverRole = 
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

export type UserRole = {
  id: string;
  email: string | null;
  roles: ApproverRole[];
  first_name: string | null;
  last_name: string | null;
  is_disabled: boolean;
};