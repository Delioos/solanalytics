import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { DonutChart } from "@tremor/react"

const salesData = [
  { month: 'Feb', sales: 65 },
  { month: 'Mar', sales: 59 },
  { month: 'Apr', sales: 80 },
  { month: 'May', sales: 81 },
  { month: 'Jun', sales: 90 },
  { month: 'Jul', sales: 85 },
  { month: 'Aug', sales: 88 },
]

const ageData = [
  { name: "0-18", value: 10 },
  { name: "18-30", value: 40 },
  { name: "30-45", value: 25 },
  { name: "45-60", value: 15 },
  { name: "60-75", value: 10 },
]

export function ProductSalesCard() {
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
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="sales" 
                    stroke="#5E60CE" 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
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
              valueFormatter={(number: number) => `${number}%`}
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