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
import { useToast } from "@/hooks/use-toast";
import { X } from "lucide-react";
import { FormKeyInformation } from "./form/FormKeyInformation";
import { ApproversTable } from "./form/ApproversTable";

interface ExceptionRequestFormProps {
  onClose: () => void;
}

interface Approver {
  title: string;
  name: string;
}

export const ExceptionRequestForm = ({ onClose }: ExceptionRequestFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    type: "",
    title: "",
    request: "",
    reason: "",
    impact: "",
    mitigatingFactors: "",
    residualRisk: "medium",
    approvers: [] as Approver[],
    preparedBy: {
      name: "",
      title: "",
      email: "",
    },
  });

  const handleTypeChange = (value: string) => {
    const approversByType: Record<string, Approver[]> = {
      cyber: [
        { title: "Chief Information Security Officer", name: "Sarah Chen" },
        { title: "Chief Information Officer", name: "John Smith" },
        { title: "Chief Risk & Resilience Officer", name: "Michael Paterson" },
      ],
      legal: [
        { title: "Chief Privacy Officer", name: "Emma Thompson" },
        { title: "Chief Risk & Resilience Officer", name: "Michael Paterson" },
      ],
      independence: [
        { title: "Partner Responsible for Independence", name: "David Wilson" },
        { title: "Chief Risk & Resilience Officer", name: "Michael Paterson" },
      ],
      qmr: [
        { title: "Assurance Partner", name: "Rachel Martinez" },
        { title: "Chief Risk & Resilience Officer", name: "Michael Paterson" },
      ],
      clientAcceptance: [
        { title: "Client Acceptance Risk Partner", name: "James Anderson" },
        { title: "Chief Risk & Resilience Officer", name: "Michael Paterson" },
      ],
      engagementRisk: [
        { title: "Engagement Risk Partner", name: "Linda Kumar" },
        { title: "Chief Risk & Resilience Officer", name: "Michael Paterson" },
      ],
      auditFinding: [
        { title: "Internal Audit Leader", name: "Robert Chang" },
        { title: "Chief Risk & Resilience Officer", name: "Michael Paterson" },
      ],
      data: [
        { title: "Chief Privacy Officer", name: "Emma Thompson" },
        { title: "Chief Data and Analytics Officer", name: "Alex Rodriguez" },
        { title: "Chief Risk & Resilience Officer", name: "Michael Paterson" },
      ],
      ai: [
        { title: "Partner Innovation", name: "Maria Sanchez" },
        { title: "Chief Information Officer", name: "John Smith" },
        { title: "Chief Risk & Resilience Officer", name: "Michael Paterson" },
      ],
    };

    setFormData({
      ...formData,
      type: value,
      approvers: approversByType[value] || [],
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.type || !formData.request || !formData.reason) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    console.log("Form submitted:", formData);
    
    toast({
      title: "Request Submitted",
      description: "Your exception request has been submitted successfully.",
    });
    
    onClose();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Memo: Decision and Rationale for Exception Request
        </h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="type" className="text-sm font-medium">Request Type</Label>
          <Select onValueChange={handleTypeChange}>
            <SelectTrigger className="w-full bg-white border border-gray-200 hover:bg-gray-50 transition-colors">
              <SelectValue placeholder="Select request type" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-200 shadow-lg rounded-md">
              <SelectItem value="cyber" className="hover:bg-gray-100 cursor-pointer">Cyber or Technology Issues</SelectItem>
              <SelectItem value="legal" className="hover:bg-gray-100 cursor-pointer">Legal/Privacy Issues</SelectItem>
              <SelectItem value="independence" className="hover:bg-gray-100 cursor-pointer">Independence Issues</SelectItem>
              <SelectItem value="qmr" className="hover:bg-gray-100 cursor-pointer">Quality Management Review (QMR)</SelectItem>
              <SelectItem value="clientAcceptance" className="hover:bg-gray-100 cursor-pointer">Client Acceptance and Continuance</SelectItem>
              <SelectItem value="engagementRisk" className="hover:bg-gray-100 cursor-pointer">Engagement Risk</SelectItem>
              <SelectItem value="auditFinding" className="hover:bg-gray-100 cursor-pointer">Audit Finding Exception</SelectItem>
              <SelectItem value="data" className="hover:bg-gray-100 cursor-pointer">Data-Related Issues</SelectItem>
              <SelectItem value="ai" className="hover:bg-gray-100 cursor-pointer">AI and Emerging Technology Issues</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium">Key Information</Label>
            <FormKeyInformation formData={formData} setFormData={setFormData} />
          </div>

          {formData.approvers.length > 0 && (
            <div>
              <Label className="text-sm font-medium">Required Approvers</Label>
              <ApproversTable approvers={formData.approvers} />
            </div>
          )}

          <div className="space-y-2">
            <Label className="text-sm font-medium">Prepared By</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                placeholder="Name"
                value={formData.preparedBy.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    preparedBy: { ...formData.preparedBy, name: e.target.value },
                  })
                }
                className="bg-white border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary"
              />
              <Input
                placeholder="Title"
                value={formData.preparedBy.title}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    preparedBy: { ...formData.preparedBy, title: e.target.value },
                  })
                }
                className="bg-white border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary"
              />
              <Input
                type="email"
                placeholder="Email"
                value={formData.preparedBy.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    preparedBy: { ...formData.preparedBy, email: e.target.value },
                  })
                }
                className="bg-white border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onClose}
            className="hover:bg-gray-50"
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            className="bg-primary hover:bg-primary/90"
          >
            Submit Request
          </Button>
        </div>
      </form>
    </div>
  );
};