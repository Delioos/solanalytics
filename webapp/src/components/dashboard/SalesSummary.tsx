'use client'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const SalesSummary: React.FC = () => {
  return (
    <Card className="bg-white rounded-2xl shadow-lg">
      <CardHeader className="p-6">
        <CardTitle className="text-xl font-display">Sales Summary</CardTitle>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-3">
            <p className="text-sm font-medium text-muted-foreground">30-45 age</p>
            <div className="bg-gradient-to-br from-purple-soft/10 to-purple-blue/5 p-6 rounded-2xl">
              <p className="text-3xl font-bold text-purple-hard">34,200</p>
              <p className="text-sm text-muted-foreground mt-1">Sales</p>
              <div className="mt-3 text-xs bg-purple-soft text-white px-3 py-1 rounded-full inline-block">
                3% Growth
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-sm font-medium text-muted-foreground">18-30 age</p>
            <div className="bg-gradient-to-br from-deep-blue/10 to-azur-deep/5 p-6 rounded-2xl">
              <p className="text-3xl font-bold text-deep-blue">28,322</p>
              <p className="text-sm text-muted-foreground mt-1">Sales</p>
              <div className="mt-3 text-xs bg-deep-blue text-white px-3 py-1 rounded-full inline-block">
                8% Growth
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default SalesSummary 