import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { TotalMetricsCard } from "./TotalMetricsCard"
import { ChartCard } from "./ChartCard"
import { SummaryCard } from "./SummaryCard"

export function PumpFunAnalyticsDashboard() {
  return (
    <ResizablePanelGroup direction="horizontal" className="min-h-[800px] w-full gap-2">
      {/* Left Column - Two Rows */}
      <ResizablePanel defaultSize={30}>
        <ResizablePanelGroup direction="vertical" className="h-full gap-2">
          <ResizableHandle className="invisible" />
          <ResizablePanel defaultSize={50}>
            <SummaryCard title="Summary" />
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>

      <ResizableHandle className="invisible" />

      {/* Right Column - Main Content */}
      <ResizablePanel defaultSize={70}>
        <ResizablePanelGroup direction="vertical" className="h-full gap-2">
          {/* First Row */}
          <ResizablePanel defaultSize={50}>
            <ResizablePanelGroup direction="horizontal" className="gap-2">
              <ResizablePanel defaultSize={30}>
                <TotalMetricsCard
                  title="Total Deployments"
                  value="45,231"
                  subtitle="↗️ +20.1% from last month"
                />
              </ResizablePanel>
              <ResizableHandle className="invisible" />
              <ResizablePanel defaultSize={70}>
                <ChartCard title="Deployments trend" />
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>

          <ResizableHandle className="invisible" />

          {/* Second Row */}
          <ResizablePanel defaultSize={50}>
            <ResizablePanelGroup direction="horizontal" className="gap-2">
              <ResizablePanel defaultSize={70}>
                <ChartCard title="Volume Analysis" />
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
      </ResizablePanel>
    </ResizablePanelGroup>
  )
} 