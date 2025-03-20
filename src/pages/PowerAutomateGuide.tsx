
import { PageHeader } from "@/components/powerautomate/PageHeader";
import { AutomationOverview } from "@/components/powerautomate/AutomationOverview";
import { FlowConfiguration } from "@/components/powerautomate/FlowConfiguration";
import { TriggerTypes } from "@/components/powerautomate/TriggerTypes";
import { ExportImportGuide } from "@/components/powerautomate/ExportImportGuide";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { downloadAllPowerAutomateGuides } from "@/components/powerautomate/utils/downloadUtils";

export function PowerAutomateGuide() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Power Automate Setup Guide</h1>
        <Button onClick={downloadAllPowerAutomateGuides} className="gap-2">
          <Download className="h-4 w-4" />
          Download All Files
        </Button>
      </div>
      
      <div className="space-y-8">
        <PageHeader />
        <AutomationOverview />
        <TriggerTypes />
        <FlowConfiguration />
        <ExportImportGuide />
      </div>
    </div>
  );
}
