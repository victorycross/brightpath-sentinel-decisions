import { Link } from "react-router-dom";
import { ProcessSteps } from "@/components/home/ProcessSteps";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const Home = () => {
  return (
    <div className="container mx-auto py-12 space-y-8">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Exception Management System</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Streamline your exception request process with our comprehensive management system.
        </p>
      </div>

      <ProcessSteps />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Dashboard</CardTitle>
            <CardDescription>View and manage your exception requests</CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/dashboard">
              <Button className="w-full">Access Dashboard</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Risk Overview</CardTitle>
            <CardDescription>Monitor and analyze risk metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/risk-dashboard">
              <Button className="w-full" variant="secondary">View Risk Dashboard</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Approver View</CardTitle>
            <CardDescription>Review and manage pending approvals</CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/approver-dashboard">
              <Button className="w-full" variant="secondary">Open Approver Dashboard</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};