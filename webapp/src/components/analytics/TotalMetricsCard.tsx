import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

interface TotalMetricsCardProps {
  title: string
  value: string
  subtitle?: string
}

export function TotalMetricsCard({ title, value, subtitle }: TotalMetricsCardProps) {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
      </CardContent>
    </Card>
  )
} 