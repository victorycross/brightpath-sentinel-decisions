
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ListFieldTable, type FieldDefinition } from "./ListFieldTable";
import { ChoiceFieldOptions } from "./ChoiceFieldOptions";

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
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <h3 className="text-lg font-semibold mb-4">List Configuration</h3>
        <ol className="list-decimal pl-6 mb-6 space-y-2">
          <li>Navigate to your SharePoint site</li>
          <li>Click on "New" and select "List"</li>
          <li>Name the list "{listName}"</li>
          <li>Add a description: "{listDescription}"</li>
          <li>Click "Create"</li>
        </ol>

        <h3 className="text-lg font-semibold mb-4">Required Fields</h3>
        <ListFieldTable fields={fields} />

        {choices && choices.length > 0 && (
          <>
            <h3 className="text-lg font-semibold mt-6 mb-4">Choice Field Values</h3>
            <ChoiceFieldOptions choices={choices} />
          </>
        )}
      </CardContent>
    </Card>
  );
}
