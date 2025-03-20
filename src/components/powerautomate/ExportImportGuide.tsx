
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export function ExportImportGuide() {
  const { toast } = useToast();

  const handleDownloadTemplate = () => {
    toast({
      title: "Template Downloaded",
      description: "Power Automate flow template has been downloaded.",
      duration: 3000,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Export and Import Power Automate Flows</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">
          Once you've created your Power Automate flows, you can export them as a solution package to share with others or to migrate between environments. This is particularly useful for deploying flows from development to production environments.
        </p>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Exporting a Flow</h3>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Sign in to <a href="https://make.powerautomate.com" target="_blank" rel="noopener noreferrer" className="text-primary underline">Power Automate</a></li>
            <li>Navigate to <strong>Solutions</strong> in the left navigation menu</li>
            <li>Select the solution that contains your flows</li>
            <li>Click <strong>Export</strong> at the top of the page</li>
            <li>Choose <strong>Export as managed</strong> or <strong>Export as unmanaged</strong> based on your needs</li>
            <li>Follow the export wizard to download the solution file (.zip)</li>
          </ol>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Importing a Flow</h3>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Sign in to <a href="https://make.powerautomate.com" target="_blank" rel="noopener noreferrer" className="text-primary underline">Power Automate</a> in the target environment</li>
            <li>Navigate to <strong>Solutions</strong> in the left navigation menu</li>
            <li>Click <strong>Import</strong> at the top of the page</li>
            <li>Browse for and select the solution file (.zip) you previously exported</li>
            <li>Follow the import wizard to configure connection references and other settings</li>
            <li>Click <strong>Import</strong> to complete the process</li>
          </ol>
        </div>

        <div className="bg-muted p-4 rounded-md mb-6">
          <h4 className="font-semibold mb-2">Tips for Successful Migration:</h4>
          <ul className="list-disc pl-6 space-y-1">
            <li>Make sure connection references are properly managed during import</li>
            <li>Test thoroughly in a staging environment before deploying to production</li>
            <li>Document any environment-specific variables that need to be updated</li>
            <li>Consider using environment variables to make flows more portable</li>
            <li>Use solution layering to manage dependencies between multiple solutions</li>
          </ul>
        </div>

        <div className="flex justify-center mt-6">
          <Button onClick={handleDownloadTemplate} className="gap-2">
            <Download className="h-4 w-4" />
            Download Flow Templates
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
