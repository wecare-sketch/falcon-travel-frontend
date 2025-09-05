"use client";

import { Box, Typography, Card, Divider, CircularProgress } from "@mui/material";
import { ChevronRight } from "lucide-react";
import { useDashboardActivities } from "@/hooks/dashboard";

export function RecentActivities() {
  const { data, isLoading, isError } = useDashboardActivities();

  if (isLoading) {
    return (
      <Card
        sx={{
          borderRadius: "12px",
          border: "1px solid #E0E0E0",
          backgroundColor: "#fff",
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.05)",
          padding: "0",
          width: "100%",
          height: 370,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
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
          padding: "0",
          width: "100%",
          height: 370,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography color="error">Error loading recent activities</Typography>
      </Card>
    );
  }

  const activities = data || [];

  return (
    <Card
      sx={{
        borderRadius: "12px",
        border: "1px solid #E0E0E0",
        backgroundColor: "#fff",
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.05)",
        padding: "0",
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
        Recent Activities
      </Typography>
      <Divider sx={{ margin: "0 0 8px 0" }} />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          padding: "0 12px 12px 12px",
          flex: 1,
          maxHeight: "calc(370px - 60px)", // 60px for title + divider
          overflowY: "auto",
        }}
      >
        {activities.length === 0 ? (
          <Typography
            sx={{
              textAlign: "center",
              color: "#888",
              fontSize: "14px",
              marginTop: "20px",
            }}
          >
            No activities available.
          </Typography>
        ) : (
          activities.map((activity) => (
            <Box
              key={activity.id}
              sx={{
                marginTop:"10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: "#F5F6FA",
                borderRadius: "8px",
                padding: "8px 10px",
                marginBottom: "2px",
                boxShadow: "0 1px 2px rgba(0,0,0,0.01)",
                cursor: "pointer",
                transition: "background 0.2s",
                minHeight: 44,
                "&:hover": {
                  background: "#F0F2F8",
                },
              }}
            >
              <Box>
                <Typography
                  sx={{
                    color: "#23407C",
                    fontWeight: 700,
                    fontSize: "14px",
                    marginBottom: "1px",
                  }}
                >
                  {activity.type}
                </Typography>
                <Typography
                  sx={{
                    color: "#222",
                    fontSize: "12px",
                    fontWeight: 400,
                    opacity: 0.8,
                  }}
                >
                  {activity.description}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Typography
                  sx={{
                    color: "#222",
                    fontSize: "12px",
                    fontWeight: 400,
                    opacity: 0.7,
                    marginRight: "2px",
                  }}
                >
                  {new Date(activity.timestamp).toLocaleDateString()}
                </Typography>
                <ChevronRight size={16} style={{ color: "#B0B0B0" }} />
              </Box>
            </Box>
          ))
        )}
      </Box>
    </Card>
  );
}
