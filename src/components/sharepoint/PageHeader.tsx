
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";

export function PageHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold">SharePoint List Setup Guide</h1>
        <p className="text-muted-foreground mt-2">
          Complete guide to configure SharePoint lists for the Exception Management System
        </p>
      </div>
      <Button className="mt-4 md:mt-0" variant="outline">
        <FileDown className="mr-2 h-4 w-4" />
        Download Complete Guide
      </Button>
    </div>
  );
}
