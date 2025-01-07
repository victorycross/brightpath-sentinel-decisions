import { FormKeyInformation } from "./form/FormKeyInformation";
import { ApproversTable } from "./form/ApproversTable";
import { FormActions } from "./form/FormActions";
import { RequestTypeSelect } from "./form/RequestTypeSelect";
import { PreparedBySection } from "./form/PreparedBySection";
import { FormHeader } from "./form/exception-request/FormHeader";
import { TitleSection } from "./form/exception-request/TitleSection";
import { useExceptionForm } from "@/hooks/useExceptionForm";
import { Database } from "@/integrations/supabase/types";
import { Input } from "@/components/ui/input";

type RequestType = Database["public"]["Enums"]["request_type"];
type RequestStatus = Database["public"]["Enums"]["request_status"];

interface ExceptionRequestFormProps {
  onClose: () => void;
  initialData?: {
    id: string;
    title: string;
    type: RequestType;
    status: RequestStatus;
    request: string;
    reason: string;
    impact: string;
    mitigating_factors: string;
    residual_risk: string;
    submitted_at: string;
    submitted_by: string;
    incidentReference?: string;
  };
  isEditing?: boolean;
}

export const ExceptionRequestForm = ({ 
  onClose, 
  initialData, 
  isEditing = false 
}: ExceptionRequestFormProps) => {
  const {
    formData,
    setFormData,
    handleSubmit,
    handleDelete,
    handleTypeChange,
  } = useExceptionForm(initialData, isEditing);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await handleSubmit(e);
    if (success) {
      onClose();
    }
  };

  const onDelete = async () => {
    const success = await handleDelete();
    if (success) {
      onClose();
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
      <FormHeader
        title={isEditing ? "Edit Exception Request" : "Memo: Decision and Rationale for Exception Request"}
        onClose={onClose}
      />
      
      <form onSubmit={onSubmit} className="space-y-6">
        <RequestTypeSelect 
          value={formData.type}
          onChange={(value) => handleTypeChange(value as RequestType)}
          disabled={isEditing}
        />

        <TitleSection
          value={formData.title}
          onChange={(value) => setFormData({ ...formData, title: value })}
        />

        {formData.type === 'cyber' && (
          <div className="space-y-2">
            <Input
              placeholder="Global Incident Reference (optional)"
              value={formData.incidentReference}
              onChange={(e) =>
                setFormData({ ...formData, incidentReference: e.target.value })
              }
              className="bg-white border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
        )}

        <div className="space-y-4">
          <FormKeyInformation formData={formData} setFormData={setFormData} />

          {formData.approvers.length > 0 && (
            <div>
              <ApproversTable approvers={formData.approvers} />
            </div>
          )}

          <PreparedBySection
            data={formData.preparedBy}
            onChange={(preparedBy) => setFormData({ ...formData, preparedBy })}
          />
        </div>

        <FormActions
          isEditing={isEditing}
          onSave={onSubmit}
          onDelete={onDelete}
          onCancel={onClose}
        />
      </form>
    </div>
  );
};