import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

interface TotalMetricsCardProps {
  title: string
  titleIcon: React.ReactNode
  value: React.ReactNode
  subtitle?: string
}

export function TotalMetricsCard({ title, titleIcon, value, subtitle }: TotalMetricsCardProps) {
  return (
    <Card className="h-full bg-black/10 border-none text-black">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-black/80 flex items-center gap-2">
          {titleIcon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col justify-center items-center h-full">
        <div className="text-6xl md:text-7xl font-extrabold text-black/90 my-auto text-center">
          {value}
        </div>
        {subtitle && (
          <p className="text-sm text-black/60 mt-4 flex items-center gap-1 text-center">
            {subtitle}
          </p>
        )}
      </CardContent>
    </Card>
  )
} 