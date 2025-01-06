import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FormContainerProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

export const FormContainer = ({ title, onClose, children }: FormContainerProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      {children}
    </div>
  );
};