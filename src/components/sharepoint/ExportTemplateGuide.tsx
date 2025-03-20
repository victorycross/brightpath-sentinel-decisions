
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, FileDown } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export function ExportTemplateGuide() {
  const { toast } = useToast();

  const generateContent = () => {
    return `# SharePoint Template Export Guide

This guide explains how to export your existing SharePoint lists as templates to reuse in other sites or environments.

## Exporting a List Template

1. Navigate to the SharePoint list you want to export
2. Click on the gear icon (⚙️) in the top right corner
3. Select "List settings"
4. In the list settings page, click on "Save list as template" under Permissions and Management
5. Fill in the following details:
   - File Name: A name for the template file (e.g., ExceptionRequests)
   - Template Name: A descriptive name (e.g., Exception Requests List Template)
   - Template Description: Brief description of the list purpose
6. Choose whether to include content (if you want to include sample data)
7. Click "OK"

The template will be saved to the List Template Gallery of your site.

## Downloading the List Template

1. Go to the Site Settings page
2. Under Web Designer Galleries, click "List templates"
3. Find your template in the gallery
4. Click on the template name
5. When prompted, save the .stp file to your computer

## Importing a List Template

1. Navigate to the destination site
2. Go to Site Settings
3. Under Web Designer Galleries, click "List templates"
4. Click "Upload" and browse to your .stp file
5. Once uploaded, go to the site where you want to create the list
6. Click on the gear icon (⚙️) and select "Add an app"
7. Your template should appear in the apps list - click on it to create a new list

## Considerations

- List templates may include custom columns, views, and forms
- Some list elements might not transfer perfectly to different site collections
- Consider using PnP Provisioning for more complex scenarios
- For best results, keep column names consistent across your organization`;
  };

  const handleCopyContent = () => {
    const content = generateContent();
    navigator.clipboard.writeText(content);
    toast({
      title: "Template Guide Copied",
      description: "SharePoint Template Export Guide has been copied to clipboard.",
      duration: 3000,
    });
  };

  const handleDownloadText = () => {
    const content = generateContent();
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "SharePoint_Template_Export_Guide.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Template Guide Downloaded",
      description: "SharePoint Template Export Guide has been downloaded as a text file.",
      duration: 3000,
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>SharePoint Template Export Guide</CardTitle>
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
        <CardDescription>
          Learn how to export your SharePoint lists as templates to reuse in other sites or environments
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <section>
          <h3 className="text-lg font-semibold mb-2">Exporting a List Template</h3>
          <ol className="list-decimal pl-6 space-y-1">
            <li>Navigate to the SharePoint list you want to export</li>
            <li>Click on the gear icon (⚙️) in the top right corner</li>
            <li>Select "List settings"</li>
            <li>In the list settings page, click on "Save list as template"</li>
            <li>Fill in the template details and choose whether to include content</li>
            <li>Click "OK"</li>
          </ol>
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-2">Downloading the List Template</h3>
          <ol className="list-decimal pl-6 space-y-1">
            <li>Go to the Site Settings page</li>
            <li>Under Web Designer Galleries, click "List templates"</li>
            <li>Find your template in the gallery</li>
            <li>Click on the template name to download the .stp file</li>
          </ol>
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-2">Importing a List Template</h3>
          <ol className="list-decimal pl-6 space-y-1">
            <li>Navigate to the destination site's Site Settings</li>
            <li>Under Web Designer Galleries, click "List templates"</li>
            <li>Click "Upload" and browse to your .stp file</li>
            <li>Once uploaded, go to the site where you want to create the list</li>
            <li>Click on the gear icon and select "Add an app"</li>
            <li>Your template should appear in the apps list</li>
          </ol>
        </section>
      </CardContent>
    </Card>
  );
}
