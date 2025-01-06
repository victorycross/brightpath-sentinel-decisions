import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Guidance from "./pages/Guidance";
import Dashboard from "./pages/Dashboard";
import RiskDashboard from "./pages/RiskDashboard";
import { Toaster } from "@/components/ui/toaster";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Link, useLocation } from "react-router-dom";
import { Home, Grid, PlusCircle, BookOpen, BarChart, UserCheck } from "lucide-react";

const NavigationBar = () => {
  const location = useLocation();
  
  return (
    <div className="w-full border-b mb-8">
      <NavigationMenu className="max-w-7xl mx-auto my-2">
        <NavigationMenuList className="gap-6">
          <NavigationMenuItem>
            <Link to="/">
              <NavigationMenuLink 
                className={`${navigationMenuTriggerStyle()} ${location.pathname === "/" ? "bg-accent" : ""}`}
              >
                <Home className="mr-2 h-4 w-4" />
                Home
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/dashboard">
              <NavigationMenuLink 
                className={`${navigationMenuTriggerStyle()} ${location.pathname === "/dashboard" ? "bg-accent" : ""}`}
              >
                <Grid className="mr-2 h-4 w-4" />
                Dashboard
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/approver-dashboard">
              <NavigationMenuLink 
                className={`${navigationMenuTriggerStyle()} ${location.pathname === "/approver-dashboard" ? "bg-accent" : ""}`}
              >
                <UserCheck className="mr-2 h-4 w-4" />
                Approver Dashboard
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/risk-dashboard">
              <NavigationMenuLink 
                className={`${navigationMenuTriggerStyle()} ${location.pathname === "/risk-dashboard" ? "bg-accent" : ""}`}
              >
                <BarChart className="mr-2 h-4 w-4" />
                Risk Dashboard
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/" state={{ showForm: true }}>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <PlusCircle className="mr-2 h-4 w-4" />
                New Request
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/guidance">
              <NavigationMenuLink 
                className={`${navigationMenuTriggerStyle()} ${location.pathname === "/guidance" ? "bg-accent" : ""}`}
              >
                <BookOpen className="mr-2 h-4 w-4" />
                Guidance
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/approver-dashboard" element={<ApproverDashboard />} />
          <Route path="/risk-dashboard" element={<RiskDashboard />} />
          <Route path="/guidance" element={<Guidance />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;