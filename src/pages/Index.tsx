import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ExceptionRequestForm } from "@/components/ExceptionRequestForm";
import { RequestList } from "@/components/RequestList";
import { PlusCircle } from "lucide-react";

const Index = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
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
    </div>
  );
};

export default Index;