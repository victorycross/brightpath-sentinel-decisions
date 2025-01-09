import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "@/integrations/supabase/client"
import { ApproverDashboard as ApproverDashboardComponent } from "@/components/dashboard/ApproverDashboard"

const ApproverDashboard = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        navigate('/auth')
      }
    }

    checkAuth()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        navigate('/auth')
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [navigate])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <ApproverDashboardComponent />
      </div>
    </div>
  )
}

export default ApproverDashboard