
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Dashboard } from "./pages/Dashboard";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { RequirementsDoc } from "./pages/RequirementsDoc";
import { RiskDashboard } from "./pages/RiskDashboard";
import { Metrics } from "./pages/Metrics";
import { SharePointSetup } from "./pages/SharePointSetup";
import { PowerApp } from "./pages/PowerApp";
import { CopilotGuide } from "./pages/CopilotGuide";
import { PowerBIIntegration } from "./pages/PowerBIIntegration";
import { Toaster } from "./components/ui/toaster";
import { MainNav } from "./components/navigation/MainNav";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <MainNav />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/requirements" element={<RequirementsDoc />} />
            <Route path="/risk-dashboard" element={<RiskDashboard />} />
            <Route path="/metrics" element={<Metrics />} />
            <Route path="/sharepoint-setup" element={<SharePointSetup />} />
            <Route path="/powerapp" element={<PowerApp />} />
            <Route path="/copilot-guide" element={<CopilotGuide />} />
            <Route path="/power-bi" element={<PowerBIIntegration />} />
          </Routes>
        </div>
        <Toaster />
      </div>
    </BrowserRouter>
  );
}

export default App;
