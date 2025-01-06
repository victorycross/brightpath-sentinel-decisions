import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis } from "recharts"

type ExceptionTypeChartProps = {
  data: Array<{ name: string; value: number; }>;
}

export const ExceptionTypeChart = ({ data }: ExceptionTypeChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Exceptions by Type</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer className="h-[200px]" config={{}}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Bar dataKey="value" fill="#6366F1" />
            <ChartTooltip content={<ChartTooltipContent />} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};