import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ExceptionRequestForm } from "@/components/ExceptionRequestForm";
import { RequestList } from "@/components/RequestList";
import { PlusCircle } from "lucide-react";
import { useLocation } from "react-router-dom";

const Index = () => {
  const [showForm, setShowForm] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.state?.showForm) {
      setShowForm(true);
      // Clear the state after using it
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Exception Request Management
        </h1>
        <p className="text-lg text-gray-600">
          Submit and track policy exception requests
        </p>
      </div>

      <div className="mb-8 text-right">
        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-primary hover:bg-primary/90"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          New Request
        </Button>
      </div>

      {showForm ? (
        <div className="animate-fade-in">
          <ExceptionRequestForm onClose={() => setShowForm(false)} />
        </div>
      ) : (
        <RequestList />
      )}
    </div>
  );
};

export default Index;