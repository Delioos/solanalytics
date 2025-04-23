import { PumpFunAnalyticsDashboard } from "@/components/analytics/PumpFunAnalyticsDashboard"

export default function MassDeployersPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Mass Deployers Analysis</h1>
        <p className="text-gray-600">
          Comprehensive analytics dashboard tracking mass deployment patterns and metrics
        </p>
      </div>
      
      <PumpFunAnalyticsDashboard />
    </div>
  )
} 