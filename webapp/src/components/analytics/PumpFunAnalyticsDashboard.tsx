import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { TotalMetricsCard } from "./TotalMetricsCard"
import { ChartCard } from "./ChartCard"

export function PumpFunAnalyticsDashboard() {
  return (
    <ResizablePanelGroup
      direction="vertical"
      className="min-h-[800px] w-full gap-6"
    >
      {/* First Row */}
      <ResizablePanel defaultSize={50}>
        <ResizablePanelGroup direction="horizontal" className="gap-6">
          <ResizablePanel defaultSize={30}>
            <TotalMetricsCard
              title="Total Deployments"
              value="45,231"
              subtitle="↗️ +20.1% from last month"
            />
          </ResizablePanel>
          <ResizableHandle className="invisible" />
          <ResizablePanel defaultSize={70}>
            <ChartCard title="Deployment Trends">
              <div className="h-[300px] flex items-center justify-center text-white/60">
                Chart placeholder
              </div>
            </ChartCard>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>

      <ResizableHandle className="invisible" />

      {/* Second Row */}
      <ResizablePanel defaultSize={50}>
        <ResizablePanelGroup direction="horizontal" className="gap-6">
          <ResizablePanel defaultSize={70}>
            <ChartCard title="Volume Analysis">
              <div className="h-[300px] flex items-center justify-center text-white/60">
                Volume chart placeholder
              </div>
            </ChartCard>
          </ResizablePanel>
          <ResizableHandle className="invisible" />
          <ResizablePanel defaultSize={30}>
            <TotalMetricsCard
              title="Total Volume"
              value="$2.5B"
              subtitle="Past 30 days"
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
} 