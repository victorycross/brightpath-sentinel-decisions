import { useState, useEffect } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ApproverRoleCheck } from "./approver/ApproverRoleCheck";
import { ApproverTabs } from "./approver/ApproverTabs";
import { useApproverRoles } from "./approver/useApproverRoles";
import { ExceptionRequestView } from "./ExceptionRequestView";

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
        <Routes>
          <Route path="/" element={<ApproverTabs approverRoles={approverRoles} />} />
          <Route path="/requests/:id" element={<ExceptionRequestView />} />
        </Routes>
      </ApproverRoleCheck>
    </div>
  );
};