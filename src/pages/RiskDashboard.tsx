import { RiskDashboard as RiskDashboardComponent } from "@/components/dashboard/RiskDashboard";

const RiskDashboard = () => {
  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-8">Risk Dashboard</h1>
      <RiskDashboardComponent />
    </div>
  );
};

export default RiskDashboard;