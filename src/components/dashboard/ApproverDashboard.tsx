import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ApproverRoleCheck } from "./approver/ApproverRoleCheck";
import { ApproverTabs } from "./approver/ApproverTabs";
import { useApproverRoles } from "./approver/useApproverRoles";
import { usePendingRequests } from "./approver/usePendingRequests";

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
  const { data: pendingRequests = [], isLoading: requestsLoading } = usePendingRequests(approverRoles);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold tracking-tight">Approver Dashboard</h2>
      
      <ApproverRoleCheck 
        userId={userId}
        approverRoles={approverRoles}
        isLoading={rolesLoading}
      >
        <ApproverTabs 
          pendingRequests={pendingRequests}
          requestsLoading={requestsLoading}
        />
      </ApproverRoleCheck>
    </div>
  );
};