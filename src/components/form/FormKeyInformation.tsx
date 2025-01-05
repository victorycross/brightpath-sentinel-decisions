import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FormKeyInformationProps {
  formData: {
    request: string;
    reason: string;
    impact: string;
    mitigatingFactors: string;
    residualRisk: string;
  };
  setFormData: (data: any) => void;
}

export const FormKeyInformation = ({
  formData,
  setFormData,
}: FormKeyInformationProps) => {
  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium w-1/4">Request</TableCell>
          <TableCell>
            <Textarea
              value={formData.request}
              onChange={(e) =>
                setFormData({ ...formData, request: e.target.value })
              }
              placeholder="Describe the specific action/exception requested"
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Reason</TableCell>
          <TableCell>
            <Textarea
              value={formData.reason}
              onChange={(e) =>
                setFormData({ ...formData, reason: e.target.value })
              }
              placeholder="Explain the key reason for this request"
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Impact</TableCell>
          <TableCell>
            <Textarea
              value={formData.impact}
              onChange={(e) =>
                setFormData({ ...formData, impact: e.target.value })
              }
              placeholder="Describe the impact on policy/procedure"
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Mitigating Factors</TableCell>
          <TableCell>
            <Textarea
              value={formData.mitigatingFactors}
              onChange={(e) =>
                setFormData({ ...formData, mitigatingFactors: e.target.value })
              }
              placeholder="Detail mitigations that reduce the inherent risk"
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Residual Risk</TableCell>
          <TableCell>
            <Select
              value={formData.residualRisk}
              onValueChange={(value) =>
                setFormData({ ...formData, residualRisk: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};