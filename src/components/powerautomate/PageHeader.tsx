
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function PageHeader() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Getting Started with Power Automate</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">
          Microsoft Power Automate (formerly Microsoft Flow) is a powerful automation tool that helps you create automated workflows between your favorite apps and services.
          This guide will help you set up the necessary flows for the Exception Management System.
        </p>
        <p>
          The flows we'll create will automate critical processes such as approval notifications, request updates, and expiration reminders. 
          By the end of this guide, you'll have a fully automated workflow that integrates with SharePoint and Power Apps.
        </p>
      </CardContent>
    </Card>
  );
}
