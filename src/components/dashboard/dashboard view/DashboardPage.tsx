"use client"

import { Box } from "@mui/material"
import { DashboardStatsCard } from "./DashboardStatsCard"
import { UpcomingEventsTable } from "./UpcomingEventsTable"
import { MonthlyTargetsChart } from "./MonthlyTargetsChart"
import { PaymentStatusChart } from "./PaymentStatusChart"
import { RecentActivities } from "./RecentActivities"

export function DashboardPage() {
  return (
    <Box>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 mb-8">
        <DashboardStatsCard title="Active Events" value="24" icon="chart" trend="+15%"/>
        <DashboardStatsCard title="Pending Events" value="12" icon="calendar" />
        <DashboardStatsCard title="Monthly Revenue" value="45,280.00" icon="dollar" />
        <DashboardStatsCard title="Outstanding Payments" value="12,350.00" icon="warning" />
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
