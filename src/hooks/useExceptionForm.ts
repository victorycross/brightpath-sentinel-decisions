import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Approver {
  title: string;
  name: string;
}

interface FormData {
  type: string;
  title: string;
  request: string;
  reason: string;
  impact: string;
  mitigatingFactors: string;
  residualRisk: string;
  approvers: Approver[];
  preparedBy: {
    name: string;
    title: string;
    email: string;
  };
  incidentReference: string;
}

export const useExceptionForm = (initialData?: any, isEditing = false) => {
  const { toast } = useToast();
  const [userId, setUserId] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    type: initialData?.type || "",
    title: initialData?.title || "",
    request: initialData?.request || "",
    reason: initialData?.reason || "",
    impact: initialData?.impact || "",
    mitigatingFactors: initialData?.mitigating_factors || "",
    residualRisk: initialData?.residual_risk || "medium",
    approvers: initialData?.approvers || [],
    preparedBy: initialData?.preparedBy || {
      name: "",
      title: "",
      email: "",
    },
    incidentReference: initialData?.incidentReference || "",
  });

  useEffect(() => {
    const getCurrentUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
      }
    };
    getCurrentUser();
  }, []);

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

    if (!userId) {
      toast({
        title: "Authentication Error",
        description: "You must be logged in to submit a request",
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
          .eq('id', initialData.id)
          .eq('submitted_by', userId);

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
            submitted_by: userId,
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
      
      return true;
    } catch (error) {
      console.error('Error saving request:', error);
      toast({
        title: "Error",
        description: "Failed to save the request. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  const handleDelete = async () => {
    if (!userId) {
      toast({
        title: "Authentication Error",
        description: "You must be logged in to delete a request",
        variant: "destructive",
      });
      return false;
    }

    try {
      const { error } = await supabase
        .from('exception_requests')
        .delete()
        .eq('id', initialData.id)
        .eq('submitted_by', userId);

      if (error) throw error;

      console.log(`[${new Date().toISOString()}] Deleted request:`, formData);
      
      toast({
        title: "Request Deleted",
        description: "The exception request has been deleted successfully.",
      });
      
      return true;
    } catch (error) {
      console.error('Error deleting request:', error);
      toast({
        title: "Error",
        description: "Failed to delete the request. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

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

  return {
    formData,
    setFormData,
    handleSubmit,
    handleDelete,
    handleTypeChange,
  };
};