import { Link } from "react-router-dom"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"

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
    title: "My Requests",
    href: "/dashboard/my-requests",
  },
  {
    title: "Risk Dashboard",
    href: "/risk-dashboard",
  },
  {
    title: "Approver Dashboard",
    href: "/approver-dashboard",
  },
]

export function MainNav() {
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
      </div>
    </div>
  )
}