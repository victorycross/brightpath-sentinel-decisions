import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Home } from "@/pages/Home"
import { About } from "@/pages/About"
import { Contact } from "@/pages/Contact"
import { AdminRoles } from "@/pages/AdminRoles"
import Dashboard from "@/pages/Dashboard"
import Index from "@/pages/Index"
import RiskDashboard from "@/pages/RiskDashboard"
import ApproverDashboard from "@/pages/ApproverDashboard"
import { MyRequestsList } from "@/components/dashboard/MyRequestsList"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin/roles" element={<AdminRoles />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/my-requests" element={<MyRequestsList />} />
        <Route path="/risk-dashboard" element={<RiskDashboard />} />
        <Route path="/approver-dashboard" element={<ApproverDashboard />} />
      </Routes>
    </Router>
  )
}

export default App