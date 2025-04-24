import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { ScrollText, TrendingUpDown } from "lucide-react"

interface SummaryCardProps {
  title: string
}

export function SummaryCard({ title }: SummaryCardProps) {
  return (
    <Card className="h-full bg-green-mint/10  hover:bg-green-mint/20 text-black">
      <CardHeader>
        <CardTitle className="text-2xl font-grotesk text-black/80 flex items-center gap-6">
        <div className="flex items-center gap-2 rounded-full border-2 border-black/10 p-4">
        <ScrollText className="w-5 h-5 text-black/80 stroke-2" strokeWidth={1.5} fill="none" />
        </div>
        {title} 
        </CardTitle>
      </CardHeader>
    </Card>
  )
} 