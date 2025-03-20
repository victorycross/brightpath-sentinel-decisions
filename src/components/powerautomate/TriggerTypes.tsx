
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function TriggerTypes() {
  const triggerTypes = [
    {
      name: "When an item is created or modified",
      description: "Triggers when a new exception request is created or an existing one is modified in SharePoint.",
      usage: "Use this trigger for the main approval flow to start the process when a new request is submitted."
    },
    {
      name: "Scheduled trigger",
      description: "Runs on a schedule (daily, weekly, etc.) to check for expiring exceptions.",
      usage: "Use this for expiration notification flows that need to run regularly to identify exceptions nearing expiration."
    },
    {
      name: "Manual trigger",
      description: "Starts a flow when a user manually triggers it from Power Apps or SharePoint.",
      usage: "Use this for ad-hoc processes like generating reports or sending custom notifications."
    },
    {
      name: "When an approval is needed",
      description: "Specialized trigger for the Approvals service in Power Automate.",
      usage: "Use this to create a more sophisticated approval process with multiple approvers and stages."
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Power Automate Trigger Types</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">
          Selecting the right trigger for your flow is essential for creating an efficient automation. Here are the main trigger types you'll use in the Exception Management System:
        </p>

        <div className="space-y-4">
          {triggerTypes.map((trigger, index) => (
            <div key={index} className="border rounded-md p-4">
              <h3 className="text-lg font-semibold mb-1">{trigger.name}</h3>
              <p className="text-muted-foreground mb-2">{trigger.description}</p>
              <div className="bg-muted p-2 rounded-md">
                <strong className="text-sm">Recommended usage:</strong> {trigger.usage}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
