import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

interface TotalMetricsCardProps {
  title: string
  value: string
  subtitle?: string
}

export function TotalMetricsCard({ title, value, subtitle }: TotalMetricsCardProps) {
  return (
    <Card className="h-full bg-white/10 border-none text-white">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-white/80">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold">{value}</div>
        {subtitle && (
          <p className="text-sm text-white/60 mt-2 flex items-center gap-1">
            {subtitle}
          </p>
        )}
      </CardContent>
    </Card>
  )
} 