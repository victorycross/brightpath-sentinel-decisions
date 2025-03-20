
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AlertCircle } from "lucide-react";

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
          <TableRow className="bg-muted/50">
            <TableHead className="font-semibold">Field Name</TableHead>
            <TableHead className="font-semibold">Field Type</TableHead>
            <TableHead className="font-semibold">Required</TableHead>
            <TableHead className="font-semibold">Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fields.map((field, index) => (
            <TableRow key={index} className={index % 2 === 0 ? "bg-white" : "bg-muted/20"}>
              <TableCell className="font-medium">
                {field.name}
                {field.required && (
                  <AlertCircle className="inline-block ml-1 h-4 w-4 text-destructive" />
                )}
              </TableCell>
              <TableCell>{field.type}</TableCell>
              <TableCell>
                {field.required ? (
                  <Badge variant="destructive" className="text-xs">Required</Badge>
                ) : (
                  <Badge variant="outline" className="text-xs bg-muted/30">Optional</Badge>
                )}
              </TableCell>
              <TableCell>{field.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
