
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export interface FieldDefinition {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

interface ListFieldTableProps {
  fields: FieldDefinition[];
}

export function ListFieldTable({ fields }: ListFieldTableProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Field Name</TableHead>
            <TableHead>Field Type</TableHead>
            <TableHead>Required</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fields.map((field, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{field.name}</TableCell>
              <TableCell>{field.type}</TableCell>
              <TableCell>{field.required ? "Yes" : "No"}</TableCell>
              <TableCell>{field.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
