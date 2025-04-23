'use client'
import React, { useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DonutChart } from "@tremor/react"

interface AgeData {
  name: string;
  value: number;
}

const ageData: AgeData[] = [
  { name: "0-18", value: 10 },
  { name: "18-30", value: 40 },
  { name: "30-45", value: 25 },
  { name: "45-60", value: 15 },
  { name: "60-75", value: 10 },
]

const AgeDistribution: React.FC = () => {
  const valueFormatter = useCallback((value: number) => `${value}%`, [])

  return (
    <Card className="bg-white rounded-2xl shadow-lg">
      <CardHeader className="p-6">
        <CardTitle className="text-xl font-display">Age Range</CardTitle>
      </CardHeader>
      <CardContent className="p-6 pt-0">
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
  )
}

export default AgeDistribution 