
import { PageHeader } from "@/components/sharepoint/PageHeader";
import { ArchitectureOverview } from "@/components/sharepoint/ArchitectureOverview";
import { ListConfiguration } from "@/components/sharepoint/ListConfiguration";
import { AdditionalConfigTips } from "@/components/sharepoint/AdditionalConfigTips";
import { ExportTemplateGuide } from "@/components/sharepoint/ExportTemplateGuide";
import { exceptionRequestFields, exceptionRequestChoices } from "@/components/sharepoint/data/exceptionRequestFields";
import { approversFields, approverRoleChoices } from "@/components/sharepoint/data/approversFields";
import { approvalHistoryFields } from "@/components/sharepoint/data/approvalHistoryFields";

export function SharePointSetup() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="space-y-8">
        <PageHeader />
        <ArchitectureOverview />
        
        <ListConfiguration 
          title="Exception Requests List"
          description="The primary list that stores all exception requests and their details"
          listName="Exception Requests"
          listDescription="Stores all exception requests and their details"
          fields={exceptionRequestFields}
          choices={exceptionRequestChoices}
        />
        
        <ListConfiguration 
          title="Approvers List"
          description="Stores information about users who can approve exception requests"
          listName="Exception Approvers"
          listDescription="Users who can approve exception requests"
          fields={approversFields}
          choices={approverRoleChoices}
        />
        
        <ListConfiguration 
          title="Exception Approval History List"
          description="Tracks the approval flow and history for each exception request"
          listName="Exception Approval History"
          listDescription="Tracks the approval flow and history"
          fields={approvalHistoryFields}
        />
        
        <AdditionalConfigTips />
        
        <ExportTemplateGuide />
      </div>
    </div>
  );
}
