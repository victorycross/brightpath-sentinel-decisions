import { Database } from "@/integrations/supabase/types";

export type RequestType = Database["public"]["Enums"]["request_type"];
export type RequestStatus = Database["public"]["Enums"]["request_status"];

export interface RequestProfile {
  email: string | null;
}

export interface ExceptionRequest {
  id: string;
  title: string;
  type: RequestType;
  status: RequestStatus;
  request?: string;
  reason?: string;
  impact?: string;
  mitigating_factors?: string;
  residual_risk?: string;
  submitted_at: string;
  profiles: RequestProfile | null;
}