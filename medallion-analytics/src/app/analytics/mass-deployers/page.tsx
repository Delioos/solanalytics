'use client';

import { PumpFunAnalyticsDashboard } from "@/components/analytics/PumpFunAnalyticsDashboard"
import { Breadcrumb } from "@/components/ui/breadcrumb"

export default function MassDeployersPage() {
  return (
    <div className="min-h-screen ">
      <div className="px-6 py-6">
        <div className="mb-6">
          <Breadcrumb
            items={[
              { label: 'Analytics', href: '/analytics' },
              { label: 'Mass Deployers', href: '/analytics/mass-deployers' }
            ]}
          />
        </div>
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-black mb-2">Mass Deployers Analysis</h1>
          <p className="text-black/80">
            Comprehensive analytics dashboard tracking mass deployment patterns and metrics
          </p>
        </div>
        
        <PumpFunAnalyticsDashboard />
      </div>
    </div>
  )
} 