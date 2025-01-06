import { Home, ListTodo, ShieldCheck, BarChart3, Users } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useNavigate } from "react-router-dom"

const menuItems = [
  {
    title: "Overview",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "My Requests",
    url: "/dashboard/my-requests",
    icon: ListTodo,
  },
  {
    title: "Approver View",
    url: "/approver-dashboard",
    icon: ShieldCheck,
  },
  {
    title: "Risk Dashboard",
    url: "/risk-dashboard",
    icon: BarChart3,
  },
  {
    title: "Admin",
    url: "/admin/roles",
    icon: Users,
  },
]

export function DashboardSidebar() {
  const navigate = useNavigate()

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton onClick={() => navigate(item.url)}>
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}