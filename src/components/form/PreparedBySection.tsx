import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PreparedByData {
  name: string;
  title: string;
  email: string;
}

interface PreparedBySectionProps {
  data: PreparedByData;
  onChange: (data: PreparedByData) => void;
}

export const PreparedBySection = ({ data, onChange }: PreparedBySectionProps) => {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">Prepared By</Label>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          placeholder="Name"
          value={data.name}
          onChange={(e) =>
            onChange({ ...data, name: e.target.value })
          }
          className="bg-white border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary"
        />
        <Input
          placeholder="Title"
          value={data.title}
          onChange={(e) =>
            onChange({ ...data, title: e.target.value })
          }
          className="bg-white border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary"
        />
        <Input
          type="email"
          placeholder="Email"
          value={data.email}
          onChange={(e) =>
            onChange({ ...data, email: e.target.value })
          }
          className="bg-white border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary"
        />
      </div>
    </div>
  );
};