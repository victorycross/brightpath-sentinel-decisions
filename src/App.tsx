import { BrowserRouter } from "react-router-dom"
import { Routes, Route } from "react-router-dom"
import { Toaster } from "@/components/ui/toaster"
import { MainNav } from "@/components/navigation/MainNav"
import { Home } from "@/pages/Home"
import { About } from "@/pages/About"
import { Contact } from "@/pages/Contact"
import { Dashboard } from "@/pages/Dashboard"
import { RiskDashboard } from "@/pages/RiskDashboard"
import { AdminRoles } from "@/pages/AdminRoles"
import { Guidance } from "@/pages/Guidance"
import { ResetPassword } from "@/pages/ResetPassword"
import { ApproverDashboard } from "@/pages/ApproverDashboard"

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background">
        <MainNav />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/risk-dashboard" element={<RiskDashboard />} />
            <Route path="/admin/roles" element={<AdminRoles />} />
            <Route path="/guidance" element={<Guidance />} />
            <Route path="/auth" element={<ResetPassword />} />
            <Route path="/approver-dashboard" element={<ApproverDashboard />} />
          </Routes>
        </main>
        <Toaster />
      </div>
    </BrowserRouter>
  )
}

export default App