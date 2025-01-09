import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, Trash2 } from "lucide-react";
import { ApproverRole } from "@/types/approver";

interface UserRoleBadgeProps {
  role: ApproverRole;
  label: string;
  onRemove: () => void;
}

export const UserRoleBadge = ({ role, label, onRemove }: UserRoleBadgeProps) => {
  return (
    <div className="flex items-center gap-1">
      <Badge 
        variant="secondary"
        className="text-xs py-1.5 px-3 bg-primary/10 text-primary hover:bg-primary/20 transition-colors group/badge"
      >
        <Shield className="w-3 h-3 mr-1 opacity-70" />
        {label}
        <Button
          variant="ghost"
          size="icon"
          className="h-5 w-5 ml-1 opacity-0 group-hover/badge:opacity-100 transition-opacity"
          onClick={onRemove}
        >
          <Trash2 className="h-3 w-3 text-primary hover:text-destructive transition-colors" />
        </Button>
      </Badge>
    </div>
  );
};