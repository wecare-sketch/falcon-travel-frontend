"use client";

import { useDashboardPaymentStatus } from "@/hooks/dashboard";
import { Card, Typography, Box } from "@mui/material";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export function PaymentStatusChart() {
  const { data, isLoading, isError } = useDashboardPaymentStatus();

  if (isLoading) {
    return (
      <Card
        sx={{
          borderRadius: "12px",
          border: "1px solid #E0E0E0",
          backgroundColor: "#fff",
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.05)",
          padding: 0,
          width: "100%",
          height: 370,
          display: "flex",
          flexDirection: "column",
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
          Payment Status
        </Typography>
        <Box
          sx={{
            height: "1px",
            width: "100%",
            backgroundColor: "#C2C2C2",
            marginBottom: "8px",
          }}
        />
        <Box
          sx={{
            padding: "0 16px 16px 16px",
            flex: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography>Loading...</Typography>
        </Box>
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
          width: "100%",
          height: 370,
          display: "flex",
          flexDirection: "column",
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
          Payment Status
        </Typography>
        <Box
          sx={{
            height: "1px",
            width: "100%",
            backgroundColor: "#C2C2C2",
            marginBottom: "8px",
          }}
        />
        <Box
          sx={{
            padding: "0 16px 16px 16px",
            flex: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography>Error loading data.</Typography>
        </Box>
      </Card>
    );
  }

  // Transform API data to chart format
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "#4CAF50";
      case "pending":
        return "#FF9800";
      default:
        return "#F44336";
    }
  };

  const paymentData = data?.map((status, index) => ({
    id: `${status.status}-${index}`,
    label: status.status.charAt(0).toUpperCase() + status.status.slice(1),
    value: status.count,
    color: getStatusColor(status.status)
  })) || [
    { id: "paid-0", label: "Paid", value: 0, color: "#4CAF50" },
    { id: "pending-1", label: "Pending", value: 0, color: "#FF9800" },
    { id: "overdue-2", label: "Overdue", value: 0, color: "#F44336" },
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
        Payment Status
      </Typography>
      <Box sx={{ height: "1px", width: "100%", backgroundColor: "#C2C2C2", marginBottom: "8px" }} />
      <Box sx={{ padding: "0 16px 16px 16px", flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Donut Chart */}
        <Box sx={{ width: "100%", height: 200, flex: 1 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={paymentData}
                dataKey="value"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={3}
                startAngle={90}
                endAngle={-270}
              >
                {paymentData.map((entry) => (
                  <Cell key={entry.id} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </Box>
        {/* Legend */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            width: "100%",
            marginTop: "16px",
          }}
        >
          {paymentData.map((item) => (
            <Box
              key={item.id}
              sx={{ display: "flex", alignItems: "center", gap: "6px" }}
            >
              <Box
                sx={{
                  width: "12px",
                  height: "12px",
                  backgroundColor: item.color,
                  borderRadius: "2px",
                }}
              />
              <Typography
                variant="body2"
                sx={{ fontSize: "12px", color: item.color, fontWeight: 500 }}
              >
                {item.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Card>
  );
}
