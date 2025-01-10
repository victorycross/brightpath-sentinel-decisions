import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent 
} from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts"

type ExpiryStatusChartProps = {
  data: Array<{ name: string; value: number; }>;
}

export const ExpiryStatusChart = ({ data }: ExpiryStatusChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Exception Expiry Status</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer className="h-[200px]" config={{}}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Bar 
                dataKey="value" 
                fill="#FFA500" 
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