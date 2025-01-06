import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "@/integrations/supabase/client"
import { DashboardHeader } from "@/components/dashboard/DashboardHeader"
import { RequestManager } from "@/components/dashboard/RequestManager"
import { DashboardActivityLog } from "@/components/dashboard/DashboardActivityLog"
import { SidebarProvider } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar"

const Dashboard = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        navigate('/')
      }
    }

    checkAuth()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        navigate('/')
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [navigate])

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar />
        <main className="flex-1 p-8 bg-gray-50">
          <DashboardHeader />
          <div className="mt-8">
            <RequestManager />
            <DashboardActivityLog />
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}

export default Dashboard