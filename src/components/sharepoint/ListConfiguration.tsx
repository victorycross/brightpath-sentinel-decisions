
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ListFieldTable, type FieldDefinition } from "./ListFieldTable";
import { ChoiceFieldOptions } from "./ChoiceFieldOptions";
import { Info, Database, FileSpreadsheet } from "lucide-react";

interface ListConfigurationProps {
  title: string;
  description: string;
  listName: string;
  listDescription: string;
  fields: FieldDefinition[];
  choices?: { title: string; options: string[] }[];
}

export function ListConfiguration({
  title,
  description,
  listName,
  listDescription,
  fields,
  choices,
}: ListConfigurationProps) {
  // Count required fields
  const requiredFieldsCount = fields.filter(field => field.required).length;
  
  return (
    <Card className="border-2 border-border hover:border-primary/20 transition-colors">
      <CardHeader className="bg-muted/30">
        <CardTitle className="flex items-center text-primary">
          <Database className="mr-2 h-5 w-5" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>List Configuration Instructions</AlertTitle>
          <AlertDescription>
            <ol className="list-decimal pl-6 mt-2 mb-2 space-y-2">
              <li>Navigate to your SharePoint site</li>
              <li>Click on "New" and select "List"</li>
              <li>Name the list <span className="font-semibold">"{listName}"</span></li>
              <li>Add a description: <span className="italic">"{listDescription}"</span></li>
              <li>Click "Create"</li>
            </ol>
          </AlertDescription>
        </Alert>

        <div>
          <h3 className="text-lg font-semibold mb-3 flex items-center">
            <FileSpreadsheet className="mr-2 h-5 w-5 text-primary" />
            Required Fields 
            <span className="text-sm ml-2 text-muted-foreground">
              ({requiredFieldsCount} of {fields.length} fields are required)
            </span>
          </h3>
          <ListFieldTable fields={fields} />
        </div>

        {choices && choices.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mt-6 mb-4 flex items-center">
              <ListCheck className="mr-2 h-5 w-5 text-primary" />
              Choice Field Values
            </h3>
            <ChoiceFieldOptions choices={choices} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
