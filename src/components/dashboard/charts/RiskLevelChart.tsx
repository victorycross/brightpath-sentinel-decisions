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
  low: "#10B981",
  medium: "#FDB022",
  high: "#EF4444"
}

type RiskLevelChartProps = {
  data: Array<{ name: string; value: number; }>;
}

export const RiskLevelChart = ({ data }: RiskLevelChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Residual Risk Levels</CardTitle>
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