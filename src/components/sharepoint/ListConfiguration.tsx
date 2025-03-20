
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ListFieldTable, type FieldDefinition } from "./ListFieldTable";
import { ChoiceFieldOptions } from "./ChoiceFieldOptions";
import { Info, Database, FileSpreadsheet, CheckSquare, Copy, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

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
  const { toast } = useToast();
  
  const generateContent = () => {
    let content = `# ${title}\n${description}\n\n`;
    content += `## List Configuration Instructions\n`;
    content += `1. Navigate to your SharePoint site\n`;
    content += `2. Click on "New" and select "List"\n`;
    content += `3. Name the list "${listName}"\n`;
    content += `4. Add a description: "${listDescription}"\n`;
    content += `5. Click "Create"\n\n`;
    
    content += `## Required Fields (${requiredFieldsCount} of ${fields.length} fields are required)\n`;
    
    fields.forEach(field => {
      content += `- ${field.name} (${field.type}): ${field.description || 'No description'} ${field.required ? '[REQUIRED]' : ''}\n`;
    });
    
    if (choices && choices.length > 0) {
      content += `\n## Choice Field Values\n`;
      
      choices.forEach(choice => {
        content += `\n### ${choice.title}\n`;
        choice.options.forEach(option => {
          content += `- ${option}\n`;
        });
      });
    }
    
    return content;
  };
  
  const handleCopyContent = () => {
    const content = generateContent();
    navigator.clipboard.writeText(content);
    toast({
      title: "Content Copied",
      description: `${title} configuration has been copied to clipboard.`,
      duration: 3000,
    });
  };
  
  const handleDownloadText = () => {
    const content = generateContent();
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${listName.replace(/\s+/g, '_')}_Configuration.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Text File Downloaded",
      description: `${title} configuration has been downloaded as a text file.`,
      duration: 3000,
    });
  };
  
  return (
    <Card className="border-2 border-border hover:border-primary/20 transition-colors">
      <CardHeader className="bg-muted/30">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-primary">
            <Database className="mr-2 h-5 w-5" />
            {title}
          </CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleCopyContent}>
              <Copy className="mr-2 h-4 w-4" />
              Copy
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownloadText}>
              <FileDown className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>
        </div>
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
              <CheckSquare className="mr-2 h-5 w-5 text-primary" />
              Choice Field Values
            </h3>
            <ChoiceFieldOptions choices={choices} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
