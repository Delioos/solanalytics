'use client'
import React from 'react'

const DashboardHeader: React.FC = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <h2 className="text-3xl font-display font-semibold tracking-tight">Product Sales Performance</h2>
        <p className="text-sm text-muted-foreground">Sales → Tech Products</p>
      </div>
      <div className="flex items-center space-x-4">
        <button className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-soft to-purple-blue text-white font-medium shadow-lg hover:shadow-xl transition-all">
          Add Widget
        </button>
        <button className="px-4 py-2 rounded-full border-2 border-purple-soft text-purple-soft font-medium hover:bg-purple-soft/5 transition-all">
          Create a Report
        </button>
      </div>
    </div>
  )
}

export default DashboardHeader 