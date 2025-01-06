import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent 
} from "@/components/ui/chart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { Skeleton } from "@/components/ui/skeleton"

const COLORS = {
  pending: "#FDB022",
  in_process: "#6366F1",
  approved: "#10B981",
  rejected: "#EF4444",
  low: "#10B981",
  medium: "#FDB022",
  high: "#EF4444",
}

export const RiskDashboard = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["exception-stats"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("exception_requests")
        .select("type, status, residual_risk")

      if (error) throw error

      // Calculate stats
      const byType: Record<string, number> = {}
      const byStatus: Record<string, number> = {}
      const byRisk: Record<string, number> = {}

      data?.forEach((item) => {
        byType[item.type] = (byType[item.type] || 0) + 1
        byStatus[item.status] = (byStatus[item.status] || 0) + 1
        
        // Categorize residual risk into low/medium/high based on text analysis
        const riskText = item.residual_risk.toLowerCase()
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
        byRisk: Object.entries(byRisk).map(([name, value]) => ({ name, value }))
      }
    }
  })

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <CardTitle><Skeleton className="h-4 w-[150px]" /></CardTitle>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-[200px] w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Exceptions by Type</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer className="h-[200px]" config={{}}>
            <BarChart data={stats?.byType}>
              <XAxis dataKey="name" />
              <YAxis />
              <Bar dataKey="value" fill="#6366F1" />
              <ChartTooltip content={<ChartTooltipContent />} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Status Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer className="h-[200px]" config={{}}>
            <PieChart>
              <Pie
                data={stats?.byStatus}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
              >
                {stats?.byStatus.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[entry.name as keyof typeof COLORS] || "#6366F1"} 
                  />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend>
                <ChartLegendContent />
              </ChartLegend>
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Residual Risk Levels</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer className="h-[200px]" config={{}}>
            <PieChart>
              <Pie
                data={stats?.byRisk}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
              >
                {stats?.byRisk.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[entry.name as keyof typeof COLORS] || "#6366F1"} 
                  />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend>
                <ChartLegendContent />
              </ChartLegend>
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}