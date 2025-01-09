import { Button } from "@/components/ui/button";
import { Edit2 } from "lucide-react";
import { UserPasswordReset } from "./UserPasswordReset";

interface UserActionsProps {
  email: string | null;
  onEdit: () => void;
}

export const UserActions = ({ email, onEdit }: UserActionsProps) => {
  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={onEdit}
        className="hover:bg-primary/10"
      >
        <Edit2 className="h-4 w-4 text-primary/70" />
      </Button>
      <UserPasswordReset email={email} />
    </div>
  );
};