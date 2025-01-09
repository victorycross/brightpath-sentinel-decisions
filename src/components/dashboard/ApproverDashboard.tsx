import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ApproverRoleCheck } from "./approver/ApproverRoleCheck";
import { ApproverTabs } from "./approver/ApproverTabs";
import { useApproverRoles } from "./approver/useApproverRoles";

export const ApproverDashboard = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/auth');
        return;
      }
      setUserId(user.id);
    };
    
    checkUser();
  }, [navigate]);

  const { data: approverRoles = [], isLoading: rolesLoading } = useApproverRoles(userId);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold tracking-tight">Approver Dashboard</h2>
      
      <ApproverRoleCheck 
        userId={userId}
        approverRoles={approverRoles}
        isLoading={rolesLoading}
      >
        <ApproverTabs approverRoles={approverRoles} />
      </ApproverRoleCheck>
    </div>
  );
};