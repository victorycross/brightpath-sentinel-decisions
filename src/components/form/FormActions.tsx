import { Button } from "@/components/ui/button";
import { Save, Trash2 } from "lucide-react";

interface FormActionsProps {
  isEditing: boolean;
  onSave: (e: React.FormEvent) => void;
  onDelete: () => void;
  onCancel: () => void;
}

export const FormActions = ({ isEditing, onSave, onDelete, onCancel }: FormActionsProps) => {
  return (
    <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
      {isEditing ? (
        <>
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
            className="hover:bg-gray-50"
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            onClick={(e) => onSave(e)}
            className="bg-primary hover:bg-primary/90 gap-2"
          >
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </>
      ) : (
        <>
          <Button 
            type="button" 
            variant="destructive" 
            onClick={onDelete}
            className="gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Delete Request
          </Button>
          <Button 
            type="submit"
            className="bg-primary hover:bg-primary/90"
          >
            Submit Request
          </Button>
        </>
      )}
    </div>
  );
};