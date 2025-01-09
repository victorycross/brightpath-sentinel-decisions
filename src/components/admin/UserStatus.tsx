import { Switch } from "@/components/ui/switch";

interface UserStatusProps {
  isEnabled: boolean;
  onStatusChange: (enabled: boolean) => void;
}

export const UserStatus = ({ isEnabled, onStatusChange }: UserStatusProps) => {
  return (
    <Switch
      checked={isEnabled}
      onCheckedChange={onStatusChange}
      className="data-[state=checked]:bg-success data-[state=unchecked]:bg-destructive"
    />
  );
};