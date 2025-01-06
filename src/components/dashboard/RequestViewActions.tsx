import { Button } from "@/components/ui/button";
import { Check, Edit2, Trash2, X } from "lucide-react";

interface RequestViewActionsProps {
  canApprove: boolean;
  onClose: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onApprove?: () => void;
  onReject?: () => void;
}

export const RequestViewActions = ({
  canApprove,
  onClose,
  onEdit,
  onDelete,
  onApprove,
  onReject,
}: RequestViewActionsProps) => {
  return (
    <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
      <Button
        variant="outline"
        onClick={onClose}
        className="hover:bg-gray-50"
      >
        Close
      </Button>
      {canApprove ? (
        <>
          <Button
            variant="outline"
            onClick={onReject}
            className="gap-2 bg-destructive/10 hover:bg-destructive/20 text-destructive"
          >
            <X className="h-4 w-4" />
            Reject
          </Button>
          <Button
            onClick={onApprove}
            className="gap-2 bg-success hover:bg-success/90"
          >
            <Check className="h-4 w-4" />
            Approve
          </Button>
        </>
      ) : (
        <>
          <Button
            variant="outline"
            onClick={onEdit}
            className="gap-2"
          >
            <Edit2 className="h-4 w-4" />
            Edit
          </Button>
          <Button
            variant="destructive"
            onClick={onDelete}
            className="gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        </>
      )}
    </div>
  );
};