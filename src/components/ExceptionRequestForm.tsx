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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
      technology: [
        { title: "Chief Information Officer", name: "John Smith" },
        { title: "Chief Risk & Resilience Officer", name: "Michael Paterson" },
      ],
      legal: [
        { title: "Chief Legal Counsel", name: "Kai Brown" },
        { title: "Chief Risk & Resilience Officer", name: "Michael Paterson" },
      ],
      independence: [
        { title: "Business Enablement Leader", name: "Josée Ste-Onge" },
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
              <SelectItem value="technology">Technology</SelectItem>
              <SelectItem value="legal">Legal</SelectItem>
              <SelectItem value="independence">Independence</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <div>
            <Label>Key Information</Label>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium w-1/4">Request</TableCell>
                  <TableCell>
                    <Textarea
                      value={formData.request}
                      onChange={(e) =>
                        setFormData({ ...formData, request: e.target.value })
                      }
                      placeholder="Describe the specific action/exception requested"
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Reason</TableCell>
                  <TableCell>
                    <Textarea
                      value={formData.reason}
                      onChange={(e) =>
                        setFormData({ ...formData, reason: e.target.value })
                      }
                      placeholder="Explain the key reason for this request"
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Impact</TableCell>
                  <TableCell>
                    <Textarea
                      value={formData.impact}
                      onChange={(e) =>
                        setFormData({ ...formData, impact: e.target.value })
                      }
                      placeholder="Describe the impact on policy/procedure"
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Mitigating Factors</TableCell>
                  <TableCell>
                    <Textarea
                      value={formData.mitigatingFactors}
                      onChange={(e) =>
                        setFormData({ ...formData, mitigatingFactors: e.target.value })
                      }
                      placeholder="Detail mitigations that reduce the inherent risk"
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Residual Risk</TableCell>
                  <TableCell>
                    <Select
                      value={formData.residualRisk}
                      onValueChange={(value) =>
                        setFormData({ ...formData, residualRisk: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          {formData.approvers.length > 0 && (
            <div>
              <Label>Required Approvers</Label>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Signature</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {formData.approvers.map((approver, index) => (
                    <TableRow key={index}>
                      <TableCell>{approver.title}</TableCell>
                      <TableCell>{approver.name}</TableCell>
                      <TableCell>Pending</TableCell>
                      <TableCell>-</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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