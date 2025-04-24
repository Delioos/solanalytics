import { Card,  CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollText } from "lucide-react"

interface SummaryCardProps {
  title: string
}

export function SummaryCard({ title }: SummaryCardProps) {
  return (
    <Card className="h-full bg-blue-blue/10  hover:bg-blue-blue/20 text-black">
      <CardHeader>
        <CardTitle className="text-2xl font-grotesk text-black/80 flex items-center gap-6">
        <div className="flex items-center gap-2 rounded-full border-2 border-black/10 p-4">
        <ScrollText className="w-5 h-5 text-black/80 stroke-2" strokeWidth={1.5} fill="none" />
        </div>
        {title} 
        </CardTitle>
      </CardHeader>

      <div className="px-6 pb-6 space-y-4">
        <div className="space-y-2">
          <h3 className="font-bold text-lg">Serial Deployers Dominate</h3>
          <p className="text-sm text-black/70">
            85.3% of prolific token deployers (151,893/178,109) are profitable, driving 85.5% of all launches (3.07M/3.59M).
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="font-bold text-lg">Hyper-Automation</h3>
          <p className="text-sm text-black/70">
            Top deployers launch tokens every ~4 mins; fastest sell within 1–3 seconds.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="font-bold text-lg">Two Models</h3>
          <ul className="list-disc list-inside text-sm text-black/70 space-y-1">
            <li><span className="font-medium">Persistent:</span> Long-term campaigns (150+ days), ~74–98% profit.</li>
            <li><span className="font-medium">Burst:</span> Short sprints (25–50 days), 300+ tokens/day, 100% profit peaks.</li>
          </ul>
        </div>

        <div className="space-y-2">
          <h3 className="font-bold text-lg">Network Risks</h3>
          <p className="text-sm text-black/70">
            Contributes to congestion/outages; exploits include rapid rug pulls and liquidity manipulation.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="font-bold text-lg">Mitigation</h3>
          <p className="text-sm text-black/70">
            Platform rate-limiting, wallet clustering, and Solana protocol upgrades (QUIC, priority fees).
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="font-bold text-lg">Key Metric</h3>
          <p className="text-sm text-black/70">
            Top deployers earn 431 SOL/year (annualized), outpacing median by 3–4x.
          </p>
        </div>
      </div>

    </Card>
  )
} 