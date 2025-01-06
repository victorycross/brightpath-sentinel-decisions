import { DashboardHeader } from "@/components/dashboard/DashboardHeader"
import { RequestManager } from "@/components/dashboard/RequestManager"
import { DashboardActivityLog } from "@/components/dashboard/DashboardActivityLog"
import { SidebarProvider } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar"

const Dashboard = () => {
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