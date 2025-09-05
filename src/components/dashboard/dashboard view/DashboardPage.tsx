"use client"

import { Box, Typography, CircularProgress } from "@mui/material"
import { DashboardStatsCard } from "./DashboardStatsCard"
import { UpcomingEventsTable } from "./UpcomingEventsTable"
import { MonthlyTargetsChart } from "./MonthlyTargetsChart"
import { PaymentStatusChart } from "./PaymentStatusChart"
import { RecentActivities } from "./RecentActivities"
import { useDashboardKpis } from "@/hooks/dashboard"

export function DashboardPage() {
  const { data: kpisData, isLoading: kpisLoading, isError: kpisError } = useDashboardKpis();

  if (kpisLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (kpisError) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="400px">
        <Typography color="error">Failed to load dashboard data</Typography>
      </Box>
    );
  }

  return (
    <Box>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 mb-8">
        <DashboardStatsCard 
          title="Active Events" 
          value={kpisData?.activeEvents || 0} 
          icon="chart" 
          trend="+15%"
        />
        <DashboardStatsCard 
          title="Pending Events" 
          value={kpisData?.pendingEvents || 0} 
          icon="calendar" 
        />
        <DashboardStatsCard 
          title="Monthly Revenue" 
          value={kpisData?.monthlyRevenue || 0} 
          icon="dollar" 
        />
        <DashboardStatsCard 
          title="Outstanding Payments" 
          value={kpisData?.outstandingPayments || 0} 
          icon="warning" 
        />
      </div>

      {/* Upcoming Events Table */}
      <Box sx={{ marginBottom: "32px" }}>
        <UpcomingEventsTable />
      </Box>

      {/* Bottom Analytics Section */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/3">
          <MonthlyTargetsChart />
        </div>
        <div className="w-full md:w-1/3">
          <PaymentStatusChart />
        </div>
        <div className="w-full md:w-1/3">
          <RecentActivities />
        </div>
      </div>
    </Box>
  )
}
