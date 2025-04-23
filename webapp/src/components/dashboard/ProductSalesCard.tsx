'use client'
import React, { useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DonutChart } from "@tremor/react"
import LineChart from "@/components/charts/LineChart"

interface DataPoint {
  month: string;
  sales: number;
}

interface AgeData {
  name: string;
  value: number;
}

const salesData: DataPoint[] = [
  { month: "Jan", sales: 120 },
  { month: "Feb", sales: 150 },
  { month: "Mar", sales: 180 },
  { month: "Apr", sales: 220 },
  { month: "May", sales: 200 },
  { month: "Jun", sales: 250 },
]

const ageData: AgeData[] = [
  { name: "0-18", value: 10 },
  { name: "18-30", value: 40 },
  { name: "30-45", value: 25 },
  { name: "45-60", value: 15 },
  { name: "60-75", value: 10 },
]

const ProductSalesCard: React.FC = () => {
  const valueFormatter = useCallback((value: number) => `${value}%`, [])

  return (
    <div className="grid gap-4 p-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-3xl font-display font-semibold tracking-tight">Product Sales Performance</h2>
          <p className="text-sm text-muted-foreground">Sales → Tech Products</p>
        </div>
        <div className="flex items-center space-x-2">
          <button className="bg-purple-soft text-white px-4 py-2 rounded-lg">Add Widget</button>
          <button className="border border-purple-soft text-purple-soft px-4 py-2 rounded-lg">Create a Report</button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Total sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <LineChart 
                data={salesData}
                height={400}
                width={800}
                color="#5E60CE"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Age Range</CardTitle>
          </CardHeader>
          <CardContent>
            <DonutChart
              data={ageData}
              category="value"
              index="name"
              valueFormatter={valueFormatter}
              colors={[
                "purple-hard",
                "purple-soft",
                "deep-blue",
                "azur-deep",
                "green-mint"
              ]}
              className="h-[300px]"
            />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sales Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">30-45 age</p>
              <div className="bg-purple-soft/20 p-4 rounded-lg">
                <p className="text-2xl font-bold">34,200</p>
                <p className="text-sm text-muted-foreground">Sales</p>
                <div className="mt-2 text-xs bg-purple-soft/30 inline-block px-2 py-1 rounded">
                  3% Growth
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">18-30 age</p>
              <div className="bg-deep-blue/20 p-4 rounded-lg">
                <p className="text-2xl font-bold">28,322</p>
                <p className="text-sm text-muted-foreground">Sales</p>
                <div className="mt-2 text-xs bg-deep-blue/30 inline-block px-2 py-1 rounded">
                  8% Growth
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ProductSalesCard 