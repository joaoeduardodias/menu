"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { getSalesData } from "@/lib/admin-actions"
import { useQuery } from "@tanstack/react-query"
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

export function SalesChart() {
  const { data: salesData, isLoading } = useQuery({
    queryKey: ["sales-data"],
    queryFn: getSalesData,
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Vendas dos Últimos 7 Dias</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-75 w-full animate-pulse rounded bg-muted" />
        ) : salesData ? (
          <ChartContainer
            config={{
              sales: {
                label: "Vendas",
                color: "hsl(var(--primary))",
              },
            }}
            className="h-75"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="sales" stroke="var(--color-sales)" strokeWidth={2} name="Vendas" />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        ) : (
          <p className="text-center text-muted-foreground">Sem dados disponíveis</p>
        )}
      </CardContent>
    </Card>
  )
}
