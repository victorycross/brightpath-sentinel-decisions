
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function ArchitectureOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>SharePoint List Architecture Overview</CardTitle>
        <CardDescription>
          The Exception Management System requires several SharePoint lists to store and manage data effectively. This guide will walk you through setting up each list with the correct fields and configurations.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mb-4">
          For optimal performance and integration with Power Apps and Copilot, we recommend creating these lists in a dedicated SharePoint site. This approach helps organize your data and simplifies permissions management.
        </p>

        <h3 className="text-lg font-semibold mb-2">Prerequisites</h3>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>SharePoint Online site with admin or owner permissions</li>
          <li>Basic understanding of SharePoint list creation</li>
          <li>Microsoft 365 account with appropriate licenses</li>
        </ul>
      </CardContent>
    </Card>
  );
}
