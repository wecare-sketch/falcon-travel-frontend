"use client"

import { Box, Typography, Card } from "@mui/material"
import { TrendingUp, Calendar, DollarSign, AlertTriangle } from "lucide-react"

interface DashboardStatsCardProps {
  title: string
  value: string | number
  icon: "chart" | "calendar" | "dollar" | "warning"
  trend?: string
}

export function DashboardStatsCard({ title, value, icon, trend }: DashboardStatsCardProps) {
  const getIcon = () => {
    switch (icon) {
      case "chart":
        return <TrendingUp style={{ width: 22, height: 22, color: "#2196F3" }} />;
      case "calendar":
        return <Calendar style={{ width: 22, height: 22, color: "#FF9800" }} />;
      case "dollar":
        return <DollarSign style={{ width: 22, height: 22, color: "#000000" }} />;
      case "warning":
        return <AlertTriangle style={{ width: 22, height: 22, color: "#F44336" }} />;
      default:
        return <TrendingUp style={{ width: 22, height: 22, color: "#2196F3" }} />;
    }
  }


  return (
    <Card
      sx={{
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#E0E0E0",
        backgroundColor: "#F7F7F7",
        height: "114px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Typography
        sx={{
          color: "#979797",
          fontSize: "15px",
          fontWeight: 400,
          mb: 1,
        }}
      >
        {title}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {/* Icon */}
        <Box sx={{ mr: 1 }}>{getIcon()}</Box>
        {/* Value */}
        <Typography
          sx={{
            color: "#000000",
            fontSize: "25px",
            fontWeight: 500,
            lineHeight: 1,
            mr: 1,
          }}
        >
          {value}
        </Typography>
        {/* Trend */}
        {trend && (
          <Typography
            sx={{
              color: "#22c55e",
              fontSize: "15px",
              fontWeight: 600,
              ml: 0.5,
            }}
          >
            {trend}
          </Typography>
        )}
      </Box>
    </Card>
  )
}
