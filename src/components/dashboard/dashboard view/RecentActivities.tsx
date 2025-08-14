"use client";

import { useState, useEffect } from "react";
import { Box, Typography, Card, Divider } from "@mui/material";
import { ChevronRight } from "lucide-react";
import axiosInstance from "@/lib/axios";

type Notification = {
  id: string | number;
  title: string;
  description: string;
  host: string;
};

export function RecentActivities() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axiosInstance.get<{
          data: {
            notifications: Notification[];
          };
        }>("/admin/notifications");
        const data = res?.data?.data?.notifications;

        if (data) {
          setNotifications(data);
        } else {
          console.error("No data returned from notifications API");
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

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
        {notifications.length === 0 ? (
          <Typography
            sx={{
              textAlign: "center",
              color: "#888",
              fontSize: "14px",
              marginTop: "20px",
            }}
          >
            No notifications available.
          </Typography>
        ) : (
          notifications.map((activity) => (
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
                  {activity.title}
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
                  Host: {activity.host}
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
