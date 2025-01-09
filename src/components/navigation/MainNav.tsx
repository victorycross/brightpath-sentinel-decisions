import { Link, useNavigate } from "react-router-dom"
import { Users } from "lucide-react"
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
    title: "Admin",
    href: "/admin/roles",
  },
]

export function MainNav() {
  const { toast } = useToast()
  const navigate = useNavigate()

  const handleSwitchUser = async () => {
    try {
      await supabase.auth.signOut()
      toast({
        title: "Signed out successfully",
        description: "You can now sign in as a different user",
      })
      navigate('/auth')
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
        <NavigationMenu>
          <NavigationMenuList>
            {items.map((item) => (
              <NavigationMenuItem key={item.title}>
                <Link to={item.href}>
                  <NavigationMenuLink className={cn(navigationMenuTriggerStyle())}>
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