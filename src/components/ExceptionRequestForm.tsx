import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { X } from "lucide-react";

interface ExceptionRequestFormProps {
  onClose: () => void;
}

export const ExceptionRequestForm = ({ onClose }: ExceptionRequestFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    type: "",
    title: "",
    rationale: "",
    impact: "",
    mitigation: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.type || !formData.title || !formData.rationale) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Here we would typically submit to a backend
    console.log("Form submitted:", formData);
    
    toast({
      title: "Request Submitted",
      description: "Your exception request has been submitted successfully.",
    });
    
    onClose();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">New Exception Request</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="type">Request Type</Label>
          <Select
            onValueChange={(value) =>
              setFormData({ ...formData, type: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select request type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="technology">Technology</SelectItem>
              <SelectItem value="legal">Legal</SelectItem>
              <SelectItem value="independence">Independence</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="title">Request Title</Label>
          <Input
            id="title"
            placeholder="Enter a descriptive title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="rationale">Rationale</Label>
          <Textarea
            id="rationale"
            placeholder="Explain why this exception is needed"
            value={formData.rationale}
            onChange={(e) =>
              setFormData({ ...formData, rationale: e.target.value })
            }
            className="min-h-[100px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="impact">Business Impact</Label>
          <Textarea
            id="impact"
            placeholder="Describe the business impact"
            value={formData.impact}
            onChange={(e) =>
              setFormData({ ...formData, impact: e.target.value })
            }
            className="min-h-[100px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="mitigation">Risk Mitigation</Label>
          <Textarea
            id="mitigation"
            placeholder="Describe how risks will be mitigated"
            value={formData.mitigation}
            onChange={(e) =>
              setFormData({ ...formData, mitigation: e.target.value })
            }
            className="min-h-[100px]"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Submit Request</Button>
        </div>
      </form>
    </div>
  );
};