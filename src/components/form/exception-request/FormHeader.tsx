import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FormHeaderProps {
  title: string;
  onClose: () => void;
}

export const FormHeader = ({ title, onClose }: FormHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      <Button variant="ghost" size="icon" onClick={onClose}>
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};