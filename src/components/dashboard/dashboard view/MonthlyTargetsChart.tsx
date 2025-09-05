"use client"

import { Card, Typography, Box, CircularProgress } from "@mui/material"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { useDashboardMonthlyTargets } from "@/hooks/dashboard"

export function MonthlyTargetsChart() {
  const { data: monthlyData, isLoading, isError } = useDashboardMonthlyTargets();

  if (isLoading) {
    return (
      <Card
        sx={{
          borderRadius: "12px",
          border: "1px solid #E0E0E0",
          backgroundColor: "#fff",
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.05)",
          padding: 0,
          width: '100%',
          height: 370,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress />
      </Card>
    );
  }

  if (isError) {
    return (
      <Card
        sx={{
          borderRadius: "12px",
          border: "1px solid #E0E0E0",
          backgroundColor: "#fff",
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.05)",
          padding: 0,
          width: '100%',
          height: 370,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography color="error">Error loading monthly targets data</Typography>
      </Card>
    );
  }

  // Transform the API data to chart format - fallback to sample data if empty
  const chartData = monthlyData && monthlyData.length > 0 
    ? monthlyData.map(target => ({
        month: target.month,
        value: target.percentage,
      }))
    : [
        { month: "Jan", value: 0 },
        { month: "Feb", value: 0 },
        { month: "Mar", value: 0 },
        { month: "Apr", value: 0 },
        { month: "May", value: 0 },
        { month: "Jun", value: 0 },
      ];
  return (
    <Card
      sx={{
        borderRadius: "12px",
        border: "1px solid #E0E0E0",
        backgroundColor: "#fff",
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.05)",
        padding: 0,
        width: '100%',
        height: 370,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography
        variant="h6"
        sx={{
          color: "#222",
          fontSize: "20px",
          fontWeight: 500,
          padding: "20px 24px 12px 24px",
        }}
      >
        Monthly Targets
      </Typography>
      <Box sx={{ height: "1px", width: "100%", backgroundColor: "#C2C2C2", marginBottom: "8px" }} />
      <Box sx={{ padding: "0 16px 16px 16px", flex: 1, display: 'flex', flexDirection: 'column' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" stroke="#666" fontSize={12} />
            <YAxis
              ticks={[0, 25, 50, 75, 100]}
              domain={[0, 100]}
              stroke="#666"
              fontSize={12}
            />
            <Tooltip />
            <Bar dataKey="value" fill="#4A5F8A" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Card>
  )
}
