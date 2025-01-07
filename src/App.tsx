import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Home } from "@/pages/Home"
import Dashboard from "@/pages/Dashboard"
import RiskDashboard from "@/pages/RiskDashboard"
import ApproverDashboard from "@/pages/ApproverDashboard"
import { MainNav } from "@/components/navigation/MainNav"
import { ExceptionRequestForm } from "@/components/ExceptionRequestForm"

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <MainNav />
        <main className="flex-1 p-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new-request" element={<ExceptionRequestForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/exceptions" element={<RiskDashboard />} />
            <Route path="/approver-dashboard" element={<ApproverDashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App