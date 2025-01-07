import { useState } from "react"
import { ExceptionRequestForm } from "@/components/ExceptionRequestForm"
import { ProcessSteps } from "@/components/home/ProcessSteps"
import { Button } from "@/components/ui/button"

export const Home = () => {
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="container mx-auto py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Exception Request Portal</h1>
        <p className="text-gray-600 mb-6">
          Submit and manage exception requests across different business areas
        </p>
        <Button 
          onClick={() => setShowForm(true)}
          className="bg-primary hover:bg-primary/90"
        >
          Create New Request
        </Button>
      </div>

      {showForm ? (
        <ExceptionRequestForm onClose={() => setShowForm(false)} />
      ) : (
        <ProcessSteps />
      )}
    </div>
  );
};