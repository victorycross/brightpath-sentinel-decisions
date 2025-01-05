import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Guidance from "./pages/Guidance";
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
import { Home, Grid, PlusCircle, BookOpen } from "lucide-react";

const NavigationBar = () => {
  const location = useLocation();
  
  return (
    <div className="w-full border-b mb-8">
      <NavigationMenu className="max-w-7xl mx-auto my-2">
        <NavigationMenuList className="gap-6">
          <NavigationMenuItem>
            <Link to="/">
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <Home className="mr-2 h-4 w-4" />
                Home
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/">
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <Grid className="mr-2 h-4 w-4" />
                Dashboard
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
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
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
          <Route path="/guidance" element={<Guidance />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;