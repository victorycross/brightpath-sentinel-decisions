
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Save, FileJson, FilePlus2, Download, Copy, FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export function ExportTemplateGuide() {
  const { toast } = useToast();
  
  const generateExportContent = () => {
    return `# Export & Reuse SharePoint Templates
Save your SharePoint list configurations as templates for reuse across different projects

## Exporting List Templates

### Method 1: Using SharePoint UI (With Data)
1. Navigate to your SharePoint list
2. Click the Settings gear icon
3. Select List settings
4. Under Permissions and Management, click Save list as template
5. Enter a filename, template name, and description
6. Decide whether to include content (checking this will include all list items)
7. Click OK
8. The template will be saved to the List Template Gallery

### Method 2: Using PowerShell (Structure Only)
1. Open PowerShell with SharePoint Online Management Shell
2. Connect to your SharePoint site:
   Connect-PnPOnline -Url "https://yourtenant.sharepoint.com/sites/yoursite" -Interactive
3. Export the list schema:
   Get-PnPListSchema -List "Exception Requests" -OutputFile "C:\\ExceptionRequestsSchema.xml"
4. This exports just the structure without any data
`;
  };
  
  const generateImportContent = () => {
    return `# Import SharePoint Templates
Instructions for importing SharePoint list templates

## Importing List Templates

### Method 1: Using SharePoint UI
1. Navigate to your SharePoint site
2. Go to Site contents
3. Click New → List
4. Select From existing list
5. Choose your template from the gallery
6. Enter a name for your new list
7. Click Create

### Method 2: Using PowerShell
1. Open PowerShell with SharePoint Online Management Shell
2. Connect to your SharePoint site:
   Connect-PnPOnline -Url "https://yourtenant.sharepoint.com/sites/yoursite" -Interactive
3. Import the list schema:
   New-PnPList -Title "New Exception Requests" -Template GenericList -Url Lists/NewExceptionRequests -SchemaXml (Get-Content -Path "C:\\ExceptionRequestsSchema.xml" -Raw)

Important Note: When importing templates with lookup fields, ensure that the referenced lists already exist in the target site. Lookup relationships will need to be updated if the source list IDs are different in the new environment.
`;
  };
  
  const handleCopyExport = () => {
    const content = generateExportContent();
    navigator.clipboard.writeText(content);
    toast({
      title: "Content Copied",
      description: "Export template guide has been copied to clipboard.",
      duration: 3000,
    });
  };
  
  const handleDownloadExport = () => {
    const content = generateExportContent();
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "SharePoint_Export_Templates_Guide.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Text File Downloaded",
      description: "Export template guide has been downloaded as a text file.",
      duration: 3000,
    });
  };
  
  const handleCopyImport = () => {
    const content = generateImportContent();
    navigator.clipboard.writeText(content);
    toast({
      title: "Content Copied",
      description: "Import template guide has been copied to clipboard.",
      duration: 3000,
    });
  };
  
  const handleDownloadImport = () => {
    const content = generateImportContent();
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "SharePoint_Import_Templates_Guide.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Text File Downloaded",
      description: "Import template guide has been downloaded as a text file.",
      duration: 3000,
    });
  };

  return (
    <Card className="border-2 border-border hover:border-primary/20 transition-colors">
      <CardHeader className="bg-muted/30">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-primary">
            <Save className="mr-2 h-5 w-5" />
            Export & Reuse SharePoint Templates
          </CardTitle>
          <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
            Advanced Feature
          </Badge>
        </div>
        <CardDescription>
          Save your SharePoint list configurations as templates for reuse across different projects
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <p className="text-muted-foreground">
          SharePoint list configurations can be exported as templates, allowing you to quickly reproduce
          your list structure in other SharePoint sites or projects without manual recreation.
        </p>

        <Tabs defaultValue="export">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="export" className="flex items-center justify-center">
              <Download className="mr-2 h-4 w-4" />
              Export Templates
            </TabsTrigger>
            <TabsTrigger value="import" className="flex items-center justify-center">
              <FilePlus2 className="mr-2 h-4 w-4" />
              Import Templates
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="export" className="space-y-4 mt-6">
            <div className="flex justify-end gap-2 mb-4">
              <Button variant="outline" size="sm" onClick={handleCopyExport}>
                <Copy className="mr-2 h-4 w-4" />
                Copy Guide
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownloadExport}>
                <FileDown className="mr-2 h-4 w-4" />
                Download Guide
              </Button>
            </div>
            
            <h3 className="text-lg font-semibold">Exporting List Templates</h3>
            
            <div className="rounded-md border p-4 bg-muted/20">
              <h4 className="font-medium mb-2 flex items-center">
                <FileJson className="mr-2 h-4 w-4 text-primary" />
                Method 1: Using SharePoint UI (With Data)
              </h4>
              <ol className="list-decimal space-y-2 ml-6">
                <li>Navigate to your SharePoint list</li>
                <li>Click the <span className="px-2 py-0.5 rounded bg-muted font-mono text-sm">Settings</span> gear icon</li>
                <li>Select <span className="px-2 py-0.5 rounded bg-muted font-mono text-sm">List settings</span></li>
                <li>Under <span className="font-medium">Permissions and Management</span>, click <span className="px-2 py-0.5 rounded bg-muted font-mono text-sm">Save list as template</span></li>
                <li>Enter a filename, template name, and description</li>
                <li>Decide whether to include content (checking this will include all list items)</li>
                <li>Click <span className="px-2 py-0.5 rounded bg-muted font-mono text-sm">OK</span></li>
                <li>The template will be saved to the List Template Gallery</li>
              </ol>
            </div>
            
            <div className="rounded-md border p-4 bg-muted/20">
              <h4 className="font-medium mb-2 flex items-center">
                <FileSpreadsheet className="mr-2 h-4 w-4 text-primary" />
                Method 2: Using PowerShell (Structure Only)
              </h4>
              <ol className="list-decimal space-y-2 ml-6">
                <li>Open PowerShell with SharePoint Online Management Shell</li>
                <li>Connect to your SharePoint site:
                  <pre className="mt-2 mb-2 p-3 bg-slate-900 text-white rounded-md overflow-x-auto">
                    <code>
                      Connect-PnPOnline -Url "https://yourtenant.sharepoint.com/sites/yoursite" -Interactive
                    </code>
                  </pre>
                </li>
                <li>Export the list schema:
                  <pre className="mt-2 mb-2 p-3 bg-slate-900 text-white rounded-md overflow-x-auto">
                    <code>
                      Get-PnPListSchema -List "Exception Requests" -OutputFile "C:\ExceptionRequestsSchema.xml"
                    </code>
                  </pre>
                </li>
                <li>This exports just the structure without any data</li>
              </ol>
            </div>

            <div className="flex justify-end mt-4">
              <Button variant="outline" className="flex items-center">
                <Download className="mr-2 h-4 w-4" />
                Download Sample Template
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="import" className="space-y-4 mt-6">
            <div className="flex justify-end gap-2 mb-4">
              <Button variant="outline" size="sm" onClick={handleCopyImport}>
                <Copy className="mr-2 h-4 w-4" />
                Copy Guide
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownloadImport}>
                <FileDown className="mr-2 h-4 w-4" />
                Download Guide
              </Button>
            </div>
            
            <h3 className="text-lg font-semibold">Importing List Templates</h3>

            <div className="rounded-md border p-4 bg-muted/20">
              <h4 className="font-medium mb-2 flex items-center">
                <FilePlus2 className="mr-2 h-4 w-4 text-primary" />
                Method 1: Using SharePoint UI
              </h4>
              <ol className="list-decimal space-y-2 ml-6">
                <li>Navigate to your SharePoint site</li>
                <li>Go to <span className="px-2 py-0.5 rounded bg-muted font-mono text-sm">Site contents</span></li>
                <li>Click <span className="px-2 py-0.5 rounded bg-muted font-mono text-sm">New</span> → <span className="px-2 py-0.5 rounded bg-muted font-mono text-sm">List</span></li>
                <li>Select <span className="px-2 py-0.5 rounded bg-muted font-mono text-sm">From existing list</span></li>
                <li>Choose your template from the gallery</li>
                <li>Enter a name for your new list</li>
                <li>Click <span className="px-2 py-0.5 rounded bg-muted font-mono text-sm">Create</span></li>
              </ol>
            </div>

            <div className="rounded-md border p-4 bg-muted/20">
              <h4 className="font-medium mb-2 flex items-center">
                <FileJson className="mr-2 h-4 w-4 text-primary" />
                Method 2: Using PowerShell
              </h4>
              <ol className="list-decimal space-y-2 ml-6">
                <li>Open PowerShell with SharePoint Online Management Shell</li>
                <li>Connect to your SharePoint site:
                  <pre className="mt-2 mb-2 p-3 bg-slate-900 text-white rounded-md overflow-x-auto">
                    <code>
                      Connect-PnPOnline -Url "https://yourtenant.sharepoint.com/sites/yoursite" -Interactive
                    </code>
                  </pre>
                </li>
                <li>Import the list schema:
                  <pre className="mt-2 mb-2 p-3 bg-slate-900 text-white rounded-md overflow-x-auto">
                    <code>
                      New-PnPList -Title "New Exception Requests" -Template GenericList -Url Lists/NewExceptionRequests -SchemaXml (Get-Content -Path "C:\ExceptionRequestsSchema.xml" -Raw)
                    </code>
                  </pre>
                </li>
              </ol>
            </div>

            <div className="mt-6 p-4 border border-amber-200 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-900/30 rounded-md">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5 mr-2" />
                <div>
                  <h4 className="font-semibold text-amber-800 dark:text-amber-300">Important Note</h4>
                  <p className="text-amber-700 dark:text-amber-300 text-sm mt-1">
                    When importing templates with lookup fields, ensure that the referenced lists already exist in the target site. 
                    Lookup relationships will need to be updated if the source list IDs are different in the new environment.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md border border-blue-200 dark:border-blue-800">
          <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Pro Tip: Automation with PnP Provisioning</h4>
          <p className="text-blue-700 dark:text-blue-300 text-sm">
            For enterprise scenarios, consider using PnP Provisioning Templates to export and import entire site configurations, 
            including multiple lists, content types, and fields all at once. This approach works well for deploying consistent 
            SharePoint configurations across multiple environments.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
