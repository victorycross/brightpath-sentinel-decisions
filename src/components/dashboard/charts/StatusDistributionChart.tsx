import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent 
} from "@/components/ui/chart"
import { PieChart, Pie, Cell } from "recharts"

const COLORS = {
  pending: "#FDB022",
  in_process: "#6366F1",
  approved: "#10B981",
  rejected: "#EF4444"
}

type StatusDistributionChartProps = {
  data: Array<{ name: string; value: number; }>;
}

export const StatusDistributionChart = ({ data }: StatusDistributionChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Status Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer className="h-[200px]" config={{}}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={80}
            >
              {data.map((entry, index) => (
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
  );
};