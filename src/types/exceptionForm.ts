import { Database } from "@/integrations/supabase/types";

export type RequestType = Database["public"]["Enums"]["request_type"];
export type RequestStatus = Database["public"]["Enums"]["request_status"];

export interface Approver {
  title: string;
  name: string;
}

export interface PreparedBy {
  name: string;
  title: string;
  email: string;
}

export interface FormData {
  type: RequestType;
  title: string;
  request: string;
  reason: string;
  impact: string;
  mitigatingFactors: string;
  residualRisk: string;
  approvers: Approver[];
  preparedBy: PreparedBy;
  incidentReference: string;
}

export interface ExceptionFormProps {
  onClose: () => void;
  initialData?: any;
  isEditing?: boolean;
}