import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

interface ChartCardProps {
  title: string
  children: React.ReactNode
}

export function ChartCard({ title, children }: ChartCardProps) {
  return (
    <Card className="h-full bg-white/10 border-none text-white">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-white/80">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {children}
      </CardContent>
    </Card>
  )
} 