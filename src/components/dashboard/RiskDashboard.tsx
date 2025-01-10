import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { Skeleton } from "@/components/ui/skeleton"
import { ExceptionTypeChart } from "./charts/ExceptionTypeChart"
import { StatusDistributionChart } from "./charts/StatusDistributionChart"
import { RiskLevelChart } from "./charts/RiskLevelChart"
import { RejectedExceptionsChart } from "./charts/RejectedExceptionsChart"
import { ExpiryStatusChart } from "./charts/ExpiryStatusChart"

export const RiskDashboard = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["exception-stats"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("exception_requests")
        .select("type, status, residual_risk, expiry_date, expired")

      if (error) throw error

      // Calculate stats
      const byType: Record<string, number> = {}
      const byStatus: Record<string, number> = {}
      const byRisk: Record<string, number> = {}
      const rejectedByType: Record<string, number> = {}
      const byExpiry: Record<string, number> = {
        'Expired': 0,
        'Expiring Soon (30 days)': 0,
        'Active': 0
      }

      const now = new Date()

      data?.forEach((item) => {
        byType[item.type] = (byType[item.type] || 0) + 1
        byStatus[item.status] = (byStatus[item.status] || 0) + 1
        
        if (item.status === 'rejected') {
          rejectedByType[item.type] = (rejectedByType[item.type] || 0) + 1
        }
        
        // Calculate expiry status for approved exceptions
        if (item.status === 'approved') {
          if (item.expired) {
            byExpiry['Expired']++
          } else if (item.expiry_date) {
            const daysUntilExpiry = Math.ceil(
              (new Date(item.expiry_date).getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
            )
            if (daysUntilExpiry <= 30) {
              byExpiry['Expiring Soon (30 days)']++
            } else {
              byExpiry['Active']++
            }
          }
        }
        
        // Categorize residual risk
        const riskText = item.residual_risk?.toLowerCase() || ''
        let riskLevel = "medium"
        if (riskText.includes("low") || riskText.includes("minimal")) {
          riskLevel = "low"
        } else if (riskText.includes("high") || riskText.includes("severe")) {
          riskLevel = "high"
        }
        byRisk[riskLevel] = (byRisk[riskLevel] || 0) + 1
      })

      return {
        byType: Object.entries(byType).map(([name, value]) => ({ name, value })),
        byStatus: Object.entries(byStatus).map(([name, value]) => ({ name, value })),
        byRisk: Object.entries(byRisk).map(([name, value]) => ({ name, value })),
        rejectedByType: Object.entries(rejectedByType).map(([name, value]) => ({ name, value })),
        byExpiry: Object.entries(byExpiry).map(([name, value]) => ({ name, value }))
      }
    }
  })

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-[300px] w-full" />
        ))}
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
      <ExceptionTypeChart data={stats?.byType || []} />
      <StatusDistributionChart data={stats?.byStatus || []} />
      <RiskLevelChart data={stats?.byRisk || []} />
      <RejectedExceptionsChart data={stats?.rejectedByType || []} />
      <ExpiryStatusChart data={stats?.byExpiry || []} />
    </div>
  )
}