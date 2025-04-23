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
      className="min-h-[800px] max-w-7xl mx-auto rounded-lg border"
    >
      {/* First Row */}
      <ResizablePanel defaultSize={50}>
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={30}>
            <TotalMetricsCard
              title="Total Deployments"
              value="45,231"
              subtitle="↗️ +20.1% from last month"
            />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={70}>
            <ChartCard title="Deployment Trends">
              <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                Chart placeholder
              </div>
            </ChartCard>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>

      <ResizableHandle />

      {/* Second Row */}
      <ResizablePanel defaultSize={50}>
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={70}>
            <ChartCard title="Volume Analysis">
              <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                Volume chart placeholder
              </div>
            </ChartCard>
          </ResizablePanel>
          <ResizableHandle />
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