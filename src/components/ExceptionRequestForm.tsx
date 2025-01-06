import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { X } from "lucide-react";
import { FormKeyInformation } from "./form/FormKeyInformation";
import { ApproversTable } from "./form/ApproversTable";
import { FormActions } from "./form/FormActions";
import { RequestTypeSelect } from "./form/RequestTypeSelect";
import { PreparedBySection } from "./form/PreparedBySection";
import { supabase } from "@/integrations/supabase/client";

interface ExceptionRequestFormProps {
  onClose: () => void;
  initialData?: any;
  isEditing?: boolean;
}

interface Approver {
  title: string;
  name: string;
}

export const ExceptionRequestForm = ({ 
  onClose, 
  initialData, 
  isEditing = false 
}: ExceptionRequestFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    type: initialData?.type || "",
    title: initialData?.title || "",
    request: initialData?.request || "",
    reason: initialData?.reason || "",
    impact: initialData?.impact || "",
    mitigatingFactors: initialData?.mitigating_factors || "",
    residualRisk: initialData?.residual_risk || "medium",
    approvers: initialData?.approvers || [] as Approver[],
    preparedBy: initialData?.preparedBy || {
      name: "",
      title: "",
      email: "",
    },
    incidentReference: initialData?.incidentReference || "",
  });

  const handleTypeChange = (value: string) => {
    const approversByType: Record<string, Approver[]> = {
      cyber: [
        { title: "Chief Information Security Officer", name: "CISO Name" },
        { title: "Chief Information Officer", name: "CIO Name" },
        { title: "Chief Risk & Resilience Officer", name: "CRRO Name" },
      ],
      legal: [
        { title: "Chief Privacy Officer", name: "CPO Name" },
        { title: "Chief Risk & Resilience Officer", name: "CRRO Name" },
      ],
      independence: [
        { title: "Partner Responsible for Independence", name: "Independence Partner Name" },
        { title: "Chief Risk & Resilience Officer", name: "CRRO Name" },
      ],
      qmr: [
        { title: "Assurance Partner", name: "Assurance Partner Name" },
        { title: "Chief Risk & Resilience Officer", name: "CRRO Name" },
      ],
      clientAcceptance: [
        { title: "Client Acceptance Risk Partner", name: "Risk Partner Name" },
        { title: "Chief Risk & Resilience Officer", name: "CRRO Name" },
      ],
      engagementRisk: [
        { title: "Engagement Risk Partner", name: "Risk Partner Name" },
        { title: "Chief Risk & Resilience Officer", name: "CRRO Name" },
      ],
      auditFinding: [
        { title: "Internal Audit Leader", name: "Audit Leader Name" },
        { title: "Chief Risk & Resilience Officer", name: "CRRO Name" },
      ],
      data: [
        { title: "Chief Privacy Officer", name: "CPO Name" },
        { title: "Chief Data and Analytics Officer", name: "CDAO Name" },
        { title: "Chief Risk & Resilience Officer", name: "CRRO Name" },
      ],
      ai: [
        { title: "Partner Innovation", name: "Innovation Partner Name" },
        { title: "Chief Information Officer", name: "CIO Name" },
        { title: "Chief Risk & Resilience Officer", name: "CRRO Name" },
      ],
    };

    setFormData({
      ...formData,
      type: value,
      approvers: approversByType[value] || [],
      incidentReference: value !== 'cyber' ? '' : formData.incidentReference,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.type || !formData.request || !formData.reason) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      if (isEditing) {
        const { error } = await supabase
          .from('exception_requests')
          .update({
            title: formData.title,
            type: formData.type,
            request: formData.request,
            reason: formData.reason,
            impact: formData.impact,
            mitigating_factors: formData.mitigatingFactors,
            residual_risk: formData.residualRisk,
          })
          .eq('id', initialData.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('exception_requests')
          .insert({
            title: formData.title,
            type: formData.type,
            request: formData.request,
            reason: formData.reason,
            impact: formData.impact,
            mitigating_factors: formData.mitigatingFactors,
            residual_risk: formData.residualRisk,
          });

        if (error) throw error;
      }

      console.log(`[${new Date().toISOString()}] ${isEditing ? 'Updated' : 'Submitted'} request:`, formData);
      
      toast({
        title: isEditing ? "Changes Saved" : "Request Submitted",
        description: isEditing 
          ? "Your changes have been saved successfully."
          : "Your exception request has been submitted successfully.",
      });
      
      onClose();
    } catch (error) {
      console.error('Error saving request:', error);
      toast({
        title: "Error",
        description: "Failed to save the request. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async () => {
    try {
      const { error } = await supabase
        .from('exception_requests')
        .delete()
        .eq('id', initialData.id);

      if (error) throw error;

      console.log(`[${new Date().toISOString()}] Deleted request:`, formData);
      
      toast({
        title: "Request Deleted",
        description: "The exception request has been deleted successfully.",
      });
      
      onClose();
    } catch (error) {
      console.error('Error deleting request:', error);
      toast({
        title: "Error",
        description: "Failed to delete the request. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {isEditing ? "Edit Exception Request" : "Memo: Decision and Rationale for Exception Request"}
        </h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <RequestTypeSelect 
          value={formData.type}
          onChange={handleTypeChange}
          disabled={isEditing}
        />

        {formData.type === 'cyber' && (
          <div className="space-y-2">
            <Input
              placeholder="Global Incident Reference (optional)"
              value={formData.incidentReference}
              onChange={(e) =>
                setFormData({ ...formData, incidentReference: e.target.value })
              }
              className="bg-white border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
        )}

        <div className="space-y-4">
          <FormKeyInformation formData={formData} setFormData={setFormData} />

          {formData.approvers.length > 0 && (
            <div>
              <ApproversTable approvers={formData.approvers} />
            </div>
          )}

          <PreparedBySection
            data={formData.preparedBy}
            onChange={(preparedBy) => setFormData({ ...formData, preparedBy })}
          />
        </div>

        <FormActions
          isEditing={isEditing}
          onSave={handleSubmit}
          onDelete={handleDelete}
          onCancel={onClose}
        />
      </form>
    </div>
  );
};