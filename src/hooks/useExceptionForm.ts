import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { FormData, RequestType } from "@/types/exceptionForm";
import { getApproversByType } from "@/utils/approverMapping";

export const useExceptionForm = (initialData?: any, isEditing = false) => {
  const { toast } = useToast();
  const [userId, setUserId] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    type: (initialData?.type as RequestType) || "cyber",
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
      return false;
    }

    if (!userId) {
      toast({
        title: "Authentication Error",
        description: "You must be logged in to submit a request",
        variant: "destructive",
      });
      return false;
    }

    try {
      const requestData = {
        title: formData.title,
        type: formData.type,
        request: formData.request,
        reason: formData.reason,
        impact: formData.impact,
        mitigating_factors: formData.mitigatingFactors,
        residual_risk: formData.residualRisk,
        submitted_by: userId,
      };

      if (isEditing) {
        const { error } = await supabase
          .from('exception_requests')
          .update(requestData)
          .eq('id', initialData.id)
          .eq('submitted_by', userId);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('exception_requests')
          .insert(requestData);

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

  const handleTypeChange = (value: RequestType) => {
    setFormData({
      ...formData,
      type: value,
      approvers: getApproversByType(value),
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