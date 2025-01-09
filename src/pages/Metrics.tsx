import { RiskDashboard } from "@/components/dashboard/RiskDashboard"

export const Metrics = () => {
  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-8">Risk Metrics Overview</h1>
      <RiskDashboard />
    </div>
  )
}