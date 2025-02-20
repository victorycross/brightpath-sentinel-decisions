
import { Link, useNavigate } from "react-router-dom"
import { Users, FileText } from "lucide-react"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"

const items = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "New Request",
    href: "/new-request",
  },
  {
    title: "Exceptions Dashboard",
    href: "/exceptions",
  },
  {
    title: "Approver Dashboard",
    href: "/approver-dashboard",
  },
  {
    title: "Metrics",
    href: "/metrics",
  },
  {
    title: "Admin",
    href: "/admin/roles",
  },
  {
    title: "Requirements",
    href: "/requirements",
    icon: FileText,
  },
]

export function MainNav() {
  const { toast } = useToast()
  const navigate = useNavigate()

  const handleSwitchUser = async () => {
    try {
      await supabase.auth.signOut()
      navigate('/auth')
      toast({
        title: "Signed out successfully",
        description: "You can now sign in as a different user",
      })
    } catch (error) {
      toast({
        title: "Error signing out",
        description: "Please try again",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="flex items-center mr-8">
          <Link to="/">
            <img 
              src="/lovable-uploads/957716f0-24b5-445b-bb33-8d9671df5ad5.png" 
              alt="Brightpath Sentinel Technologies" 
              className="h-12 w-auto"
            />
          </Link>
        </div>
        
        <NavigationMenu>
          <NavigationMenuList>
            {items.map((item) => (
              <NavigationMenuItem key={item.title}>
                <Link to={item.href}>
                  <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "flex items-center gap-2")}>
                    {item.icon && <item.icon className="h-4 w-4" />}
                    {item.title}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        
        <Button
          variant="outline"
          size="sm"
          onClick={handleSwitchUser}
          className="ml-auto"
        >
          <Users className="mr-2 h-4 w-4" />
          Switch User
        </Button>
      </div>
    </div>
  )
}
