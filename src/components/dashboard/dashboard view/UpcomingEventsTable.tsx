"use client"

import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Card,
} from "@mui/material"

interface UpcomingEvent {
  id: string
  eventName: string
  date: string
  client: string
  vehiclesRequired: number
  paymentStatus: "Paid" | "Pending" | "Overdue"
}

const upcomingEvents: UpcomingEvent[] = [
  {
    id: "1",
    eventName: "Corporate Summit 2024",
    date: "2024-01-15",
    client: "Tech Solutions Inc",
    vehiclesRequired: 5,
    paymentStatus: "Paid",
  },
  {
    id: "2",
    eventName: "Wedding Ceremony",
    date: "2024-01-18",
    client: "Sarah Johnson",
    vehiclesRequired: 3,
    paymentStatus: "Pending",
  },
  {
    id: "3",
    eventName: "Music Festival",
    date: "2024-01-20",
    client: "Event Productions",
    vehiclesRequired: 8,
    paymentStatus: "Overdue",
  },
  {
    id: "4",
    eventName: "Diplomatic Visit",
    date: "2024-01-25",
    client: "Embassy Services",
    vehiclesRequired: 4,
    paymentStatus: "Paid",
  },
]

export function UpcomingEventsTable() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return { backgroundColor: "#B7EB8F", color: "#52C41A" }
      case "Pending":
        return { backgroundColor: "#FFE58F", color: "#FAAD14" }
      case "Overdue":
        return { backgroundColor: "#FFCCC7", color: "#FF4D4F" }
      default:
        return { backgroundColor: "#F5F5F5", color: "#666" }
    }
  }

  return (
    <Card
      sx={{
        borderRadius: "12px",
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#E0E0E0",
        backgroundColor: "white",
        overflow: "hidden",
      }}
    >
      <Box sx={{ padding: "20px 24px 16px" }}>
        <Typography
          variant="h6"
          sx={{
            color: "#333",
            fontSize: "18px",
            fontWeight: 600,
          }}
        >
          Upcoming Events
        </Typography>
      </Box>
      <Box sx={{ height: "1px", width: "100%", backgroundColor: "#C2C2C2", marginBottom: "8px" }} />


      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#F8F9FA" }}>
              <TableCell
                sx={{
                  color: "#666",
                  fontSize: "14px",
                  fontWeight: 600,
                  padding: "12px 24px",
                  borderBottom: "1px solid #E0E0E0",
                }}
              >
                Event Name
              </TableCell>
              <TableCell
                sx={{
                  color: "#666",
                  fontSize: "14px",
                  fontWeight: 600,
                  padding: "12px 24px",
                  borderBottom: "1px solid #E0E0E0",
                }}
              >
                Date
              </TableCell>
              <TableCell
                sx={{
                  color: "#666",
                  fontSize: "14px",
                  fontWeight: 600,
                  padding: "12px 24px",
                  borderBottom: "1px solid #E0E0E0",
                }}
              >
                Client
              </TableCell>
              <TableCell
                sx={{
                  color: "#666",
                  fontSize: "14px",
                  fontWeight: 600,
                  padding: "12px 24px",
                  borderBottom: "1px solid #E0E0E0",
                }}
              >
                Vehicles Required
              </TableCell>
              <TableCell
                sx={{
                  color: "#666",
                  fontSize: "14px",
                  fontWeight: 600,
                  padding: "12px 24px",
                  borderBottom: "1px solid #E0E0E0",
                }}
              >
                Payment Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {upcomingEvents.map((event) => (
              <TableRow
                key={event.id}
                sx={{
                  "&:hover": {
                    backgroundColor: "#F8F9FA",
                  },
                }}
              >
                <TableCell sx={{ padding: "16px 24px", borderBottom: "1px solid #F0F0F0" }}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#333",
                      fontSize: "14px",
                      fontWeight: 500,
                    }}
                  >
                    {event.eventName}
                  </Typography>
                </TableCell>
                <TableCell sx={{ padding: "16px 24px", borderBottom: "1px solid #F0F0F0" }}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#666",
                      fontSize: "14px",
                    }}
                  >
                    {event.date}
                  </Typography>
                </TableCell>
                <TableCell sx={{ padding: "16px 24px", borderBottom: "1px solid #F0F0F0" }}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#666",
                      fontSize: "14px",
                    }}
                  >
                    {event.client}
                  </Typography>
                </TableCell>
                <TableCell sx={{ padding: "16px 24px", borderBottom: "1px solid #F0F0F0" }}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#333",
                      fontSize: "14px",
                      fontWeight: 500,
                    }}
                  >
                    {event.vehiclesRequired}
                  </Typography>
                </TableCell>
                <TableCell sx={{ padding: "16px 24px", borderBottom: "1px solid #F0F0F0" }}>
                  <Chip
                    label={event.paymentStatus}
                    size="small"
                    sx={{
                      ...getStatusColor(event.paymentStatus),
                      fontSize: "12px",
                      fontWeight: 500,
                      height: "24px",
                      borderRadius:"0px"
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}
