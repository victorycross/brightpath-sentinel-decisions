import { ClipboardCheck, Shield, Clock } from "lucide-react";
import { ProcessStep } from "./ProcessStep";

export const ProcessSteps = () => (
  <div className="mb-16 animate-fade-in">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
      <ProcessStep 
        icon={ClipboardCheck}
        title="Submit Request"
        description="Fill out the exception request form with detailed information about your case, including rationale and risk assessment."
      />
      <ProcessStep 
        icon={Shield}
        title="Review Process"
        description="Your request will be reviewed by relevant discipline approvers based on the type of exception and policies impacted."
      />
      <ProcessStep 
        icon={Clock}
        title="Track Progress"
        description="Monitor the status of your request through our dashboard and receive notifications at each step of the approval process."
      />
    </div>
  </div>
);