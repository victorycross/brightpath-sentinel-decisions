import { Input } from "@/components/ui/input";

interface TitleSectionProps {
  value: string;
  onChange: (value: string) => void;
}

export const TitleSection = ({ value, onChange }: TitleSectionProps) => {
  return (
    <div className="space-y-2">
      <Input
        placeholder="Request Title"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-white border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary"
      />
    </div>
  );
};