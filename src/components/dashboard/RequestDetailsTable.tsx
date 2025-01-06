import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";

interface RequestDetailsTableProps {
  request: string;
  reason: string;
  impact: string;
  mitigatingFactors: string;
  residualRisk: string;
}

export const RequestDetailsTable = ({
  request,
  reason,
  impact,
  mitigatingFactors,
  residualRisk,
}: RequestDetailsTableProps) => {
  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium w-1/4">Request</TableCell>
          <TableCell>{request || 'N/A'}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Reason</TableCell>
          <TableCell>{reason || 'N/A'}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Impact</TableCell>
          <TableCell>{impact || 'N/A'}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Mitigating Factors</TableCell>
          <TableCell>{mitigatingFactors || 'N/A'}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Residual Risk</TableCell>
          <TableCell className="capitalize">{residualRisk || 'N/A'}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};