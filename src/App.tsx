import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Home } from "@/pages/Home"
import { About } from "@/pages/About"
import { Contact } from "@/pages/Contact"
import Dashboard from "@/pages/Dashboard"
import RiskDashboard from "@/pages/RiskDashboard"
import ApproverDashboard from "@/pages/ApproverDashboard"
import { MyRequestsList } from "@/components/dashboard/MyRequestsList"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/my-requests" element={<MyRequestsList />} />
        <Route path="/risk-dashboard" element={<RiskDashboard />} />
        <Route path="/approver-dashboard" element={<ApproverDashboard />} />
      </Routes>
    </Router>
  )
}

export default App