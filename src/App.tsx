import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Guidance from "./pages/Guidance";
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/guidance" element={<Guidance />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;