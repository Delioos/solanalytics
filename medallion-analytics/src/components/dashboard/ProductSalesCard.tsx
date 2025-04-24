'use client'
import React from 'react'
import DashboardHeader from './DashboardHeader'
import SalesChart from './SalesChart'
import AgeDistribution from './AgeDistribution'
import SalesSummary from './SalesSummary'

const ProductSalesCard: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <DashboardHeader />
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <SalesChart />
        <AgeDistribution />
      </div>

      <SalesSummary />
    </div>
  )
}

export default ProductSalesCard 