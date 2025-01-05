import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Approver {
  title: string;
  name: string;
}

interface ApproversTableProps {
  approvers: Approver[];
}

export const ApproversTable = ({ approvers }: ApproversTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Signature</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {approvers.map((approver, index) => (
          <TableRow key={index}>
            <TableCell>{approver.title}</TableCell>
            <TableCell>{approver.name}</TableCell>
            <TableCell>Pending</TableCell>
            <TableCell>-</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};