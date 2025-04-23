import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

interface ChartCardProps {
  title: string
  children: React.ReactNode
}

export function ChartCard({ title, children }: ChartCardProps) {
  return (
    <Card className="h-full bg-black/10 border-none text-black">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-black/80">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {children}
      </CardContent>
    </Card>
  )
} 