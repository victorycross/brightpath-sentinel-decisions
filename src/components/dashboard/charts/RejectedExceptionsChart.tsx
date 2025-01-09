import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent 
} from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts"

type RejectedExceptionsChartProps = {
  data: Array<{ name: string; value: number; }>;
}

export const RejectedExceptionsChart = ({ data }: RejectedExceptionsChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Rejected Exceptions by Type</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer className="h-[200px]" config={{}}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Bar 
                dataKey="value" 
                fill="#EF4444" 
                radius={[4, 4, 0, 0]}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};