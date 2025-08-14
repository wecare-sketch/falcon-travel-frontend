"use client";

import { useAdminEvents } from "@/hooks/events/useAdminEvents";
import { Card, Typography, Box } from "@mui/material";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export function PaymentStatusChart() {
  const { data, isLoading, isError } = useAdminEvents();

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

  const paymentCounts = { paid: 0, pending: 0, overdue: 0 };

  data?.events.forEach((event) => {
    if (event.paymentStatus.toLowerCase() === "paid") {
      paymentCounts.paid++;
    } else if (event.paymentStatus.toLowerCase() === "pending") {
      paymentCounts.pending++;
    } else if (event.paymentStatus.toLowerCase() === "overdue") {
      paymentCounts.overdue++;
    }
  });

  const paymentData = [
    { label: "Paid", value: paymentCounts.paid, color: "#4CAF50" },
    { label: "Pending", value: paymentCounts.pending, color: "#FF9800" },
    { label: "Overdue", value: paymentCounts.overdue, color: "#F44336" },
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
                {paymentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
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
          {paymentData.map((item, index) => (
            <Box
              key={index}
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
