import { Link } from "react-router-dom";
import { Shield, LayoutDashboard, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Home = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-primary mb-4">Exception Management Portal</h1>
          <p className="text-lg text-muted-foreground">
            Manage exception requests, user roles, and monitor risk assessments
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
          <Link to="/admin/roles" className="group">
            <Card className="transition-all duration-300 hover:shadow-lg hover:border-primary/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-primary">
                  <Shield className="h-6 w-6" />
                  User Role Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Configure and manage user roles and permissions for the exception management system.
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/dashboard" className="group">
            <Card className="transition-all duration-300 hover:shadow-lg hover:border-primary/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-primary">
                  <LayoutDashboard className="h-6 w-6" />
                  Main Dashboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  View and manage all exception requests in a centralized dashboard.
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/risk-dashboard" className="group">
            <Card className="transition-all duration-300 hover:shadow-lg hover:border-primary/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-primary">
                  <AlertTriangle className="h-6 w-6" />
                  Risk Dashboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Monitor and analyze risk metrics across all exception requests.
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/approver-dashboard" className="group">
            <Card className="transition-all duration-300 hover:shadow-lg hover:border-primary/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-primary">
                  <CheckCircle2 className="h-6 w-6" />
                  Approver Dashboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Review and process pending exception requests requiring approval.
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
};