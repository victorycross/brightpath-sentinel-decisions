import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface RequestTypeSelectProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export const RequestTypeSelect = ({ value, onChange, disabled }: RequestTypeSelectProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="type" className="text-sm font-medium">Request Type</Label>
      <Select 
        onValueChange={onChange} 
        defaultValue={value}
        disabled={disabled}
      >
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
  );
};