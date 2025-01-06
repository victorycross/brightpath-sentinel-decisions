import { Button } from "@/components/ui/button";
import { Edit2, Trash2 } from "lucide-react";

interface RequestActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

export const RequestActions = ({ onEdit, onDelete }: RequestActionsProps) => {
  return (
    <div className="space-x-2" onClick={(e) => e.stopPropagation()}>
      <Button
        variant="outline"
        size="sm"
        onClick={onEdit}
        className="gap-2"
      >
        <Edit2 className="h-4 w-4" />
        Edit
      </Button>
      <Button
        variant="destructive"
        size="sm"
        onClick={onDelete}
        className="gap-2"
      >
        <Trash2 className="h-4 w-4" />
        Delete
      </Button>
    </div>
  );
};