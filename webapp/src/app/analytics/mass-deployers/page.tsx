import { PumpFunAnalyticsDashboard } from "@/components/analytics/PumpFunAnalyticsDashboard"

export default function MassDeployersPage() {
  return (
    <div className="min-h-screen ">
      <div className="px-6 py-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">Mass Deployers Analysis</h1>
          <p className="text-white/80">
            Comprehensive analytics dashboard tracking mass deployment patterns and metrics
          </p>
        </div>
        
        <PumpFunAnalyticsDashboard />
      </div>
    </div>
  )
} 