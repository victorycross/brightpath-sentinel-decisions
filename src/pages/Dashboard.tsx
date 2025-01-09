import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "@/integrations/supabase/client"
import { DashboardHeader } from "@/components/dashboard/DashboardHeader"
import { RequestManager } from "@/components/dashboard/RequestManager"
import { DashboardActivityLog } from "@/components/dashboard/DashboardActivityLog"

const Dashboard = () => {
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
    <div className="w-full">
      <DashboardHeader />
      <div className="mt-8">
        <RequestManager />
        <DashboardActivityLog />
      </div>
    </div>
  )
}

export default Dashboard