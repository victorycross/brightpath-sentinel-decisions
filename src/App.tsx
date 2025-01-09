import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "@/pages/Home";
import { About } from "@/pages/About";
import { Contact } from "@/pages/Contact";
import Dashboard from "@/pages/Dashboard";
import Guidance from "@/pages/Guidance";
import { AuthForm } from "@/components/auth/AuthForm";
import { AdminRoles } from "@/pages/AdminRoles";
import { ResetPassword } from "@/pages/ResetPassword";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/guidance" element={<Guidance />} />
        <Route path="/auth" element={<AuthForm />} />
        <Route path="/admin/roles" element={<AdminRoles />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
}