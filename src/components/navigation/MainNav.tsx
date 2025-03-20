
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export function MainNav() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();

  const routes = [
    {
      href: "/",
      label: "Home",
      active: location.pathname === "/",
    },
    {
      href: "/dashboard",
      label: "Dashboard",
      active: location.pathname === "/dashboard",
    },
    {
      href: "/risk-dashboard",
      label: "Risk Dashboard",
      active: location.pathname === "/risk-dashboard",
    },
    {
      href: "/metrics",
      label: "Metrics",
      active: location.pathname === "/metrics",
    },
    {
      href: "/sharepoint-setup",
      label: "SharePoint Setup",
      active: location.pathname === "/sharepoint-setup",
    },
    {
      href: "/powerapp",
      label: "Power App",
      active: location.pathname === "/powerapp",
    },
    {
      href: "/power-automate",
      label: "Power Automate",
      active: location.pathname === "/power-automate",
    },
    {
      href: "/copilot-guide",
      label: "Copilot Guide",
      active: location.pathname === "/copilot-guide",
    },
    {
      href: "/power-bi",
      label: "Power BI",
      active: location.pathname === "/power-bi",
    },
    {
      href: "/requirements",
      label: "Requirements",
      active: location.pathname === "/requirements",
    },
    {
      href: "/about",
      label: "About",
      active: location.pathname === "/about",
    },
    {
      href: "/contact",
      label: "Contact",
      active: location.pathname === "/contact",
    },
  ];

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        {isMobile ? (
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
              <ScrollArea className="my-4">
                <div className="flex flex-col space-y-2 px-7">
                  {routes.map((route) => (
                    <Link
                      to={route.href}
                      className={cn(
                        "text-sm font-medium transition-colors hover:text-foreground/80",
                        route.active ? "text-foreground" : "text-foreground/60"
                      )}
                      key={route.href}
                      onClick={() => setOpen(false)}
                    >
                      {route.label}
                    </Link>
                  ))}
                </div>
              </ScrollArea>
            </SheetContent>
          </Sheet>
        ) : (
          <div className="ml-auto flex items-center space-x-6">
            <nav className="flex items-center space-x-6 text-sm font-medium">
              {routes.map((route) => (
                <Link
                  to={route.href}
                  className={cn(
                    "transition-colors hover:text-foreground/80",
                    route.active ? "text-foreground" : "text-foreground/60"
                  )}
                  key={route.href}
                >
                  {route.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </div>
  );
}
