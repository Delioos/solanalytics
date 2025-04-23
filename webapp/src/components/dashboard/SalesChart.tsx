'use client'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import LineChart from "@/components/charts/LineChart"

interface DataPoint {
  month: string;
  sales: number;
}

const salesData: DataPoint[] = [
  { month: "Jan", sales: 120 },
  { month: "Feb", sales: 150 },
  { month: "Mar", sales: 180 },
  { month: "Apr", sales: 220 },
  { month: "May", sales: 200 },
  { month: "Jun", sales: 250 },
]

const SalesChart: React.FC = () => {
  return (
    <Card className="col-span-2 bg-black rounded-2xl shadow-lg">
      <CardHeader className="p-6">
        <CardTitle className="text-xl font-display">Total sales</CardTitle>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <div className="h-[400px]">
          <LineChart 
            data={salesData}
            height={400}
            width={800}
            color="#6930C3"
          />
        </div>
      </CardContent>
    </Card>
  )
}

export default SalesChart 