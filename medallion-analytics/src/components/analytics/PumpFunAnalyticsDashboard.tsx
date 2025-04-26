import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { TotalMetricsCard } from "./TotalMetricsCard"
import { ChartCard } from "./ChartCard"
import { SummaryCard } from "./SummaryCard"
import HeatmapChart from "./HeatmapChart"
import { UsersIcon, CoinsIcon } from "lucide-react"

export function PumpFunAnalyticsDashboard() {
  return (
    <ResizablePanelGroup direction="horizontal" className="min-h-[800px] w-full gap-2">
      {/* Left Column - Two Rows */}
      <ResizablePanel defaultSize={20}>
        <ResizablePanelGroup direction="horizontal" className="h-full gap-2">
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
          <ResizablePanel defaultSize={33}>
            <ResizablePanelGroup direction="horizontal" className="gap-2">
              <ResizablePanel defaultSize={30}>
                <TotalMetricsCard
                  title="Prolific Deployers"
                  titleIcon={
                    <div className="flex items-center gap-2 rounded-full border-2 border-black/10 p-4">
                      <UsersIcon className="w-5 h-5 text-black/80 stroke-2" strokeWidth={1.5} fill="none" />
                    </div>
                  }
                  value={
                    <>
                      <span className="text-purple-blue font-extrabold">178k </span>
                      <br />
                      <span className="text-azur-blue font-extrabold text-xl">️ unique deployers</span>
                    </>
                  }
                />
              </ResizablePanel>
              <ResizableHandle className="invisible" />
              <ResizablePanel defaultSize={70}>
                <HeatmapChart />
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>

          <ResizableHandle className="invisible" />

          {/* Second Row */}
          <ResizablePanel defaultSize={33}>
            <ResizablePanelGroup direction="horizontal" className="gap-2">
              <ResizablePanel defaultSize={70}>
                <ChartCard title="New vs Returning Deployers Trend" />
              </ResizablePanel>
              <ResizableHandle className="invisible" />
              <ResizablePanel defaultSize={30}>
                <TotalMetricsCard
                  title="Total SOL Extracted by Deployers"
                  titleIcon={
                    <div className="flex items-center gap-2 rounded-full border-2 border-black/10 p-4">
                      <CoinsIcon className="w-5 h-5 text-black/80 stroke-2" strokeWidth={1.5} fill="none" />
                    </div>
                  }
                  value={
                    <>
                      <span className="text-blue-blue font-extrabold">50,7k</span>
                      <br />
                      <span className="text-purple-hard font-extrabold">$sol</span>
                      </>
                  }
                  subtitle="In 180 days"
                />
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>

          <ResizableHandle className="invisible" />

        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
} 