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
          <Label htmlFor="type">Request Type</Label>
          <Select onValueChange={handleTypeChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select request type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cyber">Cyber or Technology Issues</SelectItem>
              <SelectItem value="legal">Legal/Privacy Issues</SelectItem>
              <SelectItem value="independence">Independence Issues</SelectItem>
              <SelectItem value="qmr">Quality Management Review (QMR)</SelectItem>
              <SelectItem value="clientAcceptance">Client Acceptance and Continuance</SelectItem>
              <SelectItem value="engagementRisk">Engagement Risk</SelectItem>
              <SelectItem value="auditFinding">Audit Finding Exception</SelectItem>
              <SelectItem value="data">Data-Related Issues</SelectItem>
              <SelectItem value="ai">AI and Emerging Technology Issues</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <div>
            <Label>Key Information</Label>
            <FormKeyInformation formData={formData} setFormData={setFormData} />
          </div>

          {formData.approvers.length > 0 && (
            <div>
              <Label>Required Approvers</Label>
              <ApproversTable approvers={formData.approvers} />
            </div>
          )}

          <div className="space-y-2">
            <Label>Prepared By</Label>
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
              />
            </div>
          </div>
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