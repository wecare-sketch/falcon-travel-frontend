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
  Card
} from "@mui/material"
import { useIsMobile } from "@/hooks/useIsMobile"
import { CustomDivider } from "@/components/shared/CustomDivider"



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

function UpcomingEventMobileCard({ event }: { event: UpcomingEvent }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return { backgroundColor: "#B7EB8F", color: "#52C41A" };
      case "Pending":
        return { backgroundColor: "#FFE58F", color: "#FAAD14" };
      case "Overdue":
        return { backgroundColor: "#FFCCC7", color: "#FF4D4F" };
      default:
        return { backgroundColor: "#F5F5F5", color: "#666" };
    }
  };
  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        borderRadius: "8px",
        border: "1px solid #E0E0E0",
        padding: "0px 15px",
        position: "relative",
        display: "flex",
        alignItems: "flex-start",
        Height: 150,
        marginBottom: "12px",
      }}
    >
      {/* Main Content */}
      <Box sx={{ flex: 1 }}>
        {/* Event Name Row */}
        <Box sx={{ display: "flex", alignItems: "center", marginBottom: "10px",marginTop:"10px" }}>
          <Typography
            sx={{
              color: "#345794",
              fontWeight: 400,
              fontSize: "14px",
              marginRight: "6px",
              whiteSpace: "nowrap",
            }}
          >
            Event Name:
          </Typography>
          <Typography
            sx={{
              color: "#787878",
              fontWeight: 400,
              fontSize: "16px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              flex: 1,
            }}
          >
            {event.eventName}
          </Typography>
        </Box>
        <CustomDivider />

        {/* Client/Amount Row */}
        <Box sx={{ display: "flex", margin: "5px 0"}}>
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ color: "#345794", fontSize: "14px", fontWeight: 400 }}>
              Client:
            </Typography>
            <Typography sx={{ color: "#787878", fontSize: "16px", fontWeight: 400 }}>
              {event.client}
            </Typography>
          </Box>
          <Box sx={{ flex: 1 }}>
          <Chip
            label={event.paymentStatus}
            size="small"
            sx={{
              ...getStatusColor(event.paymentStatus),
              fontSize: "13px",
              fontWeight: 500,
              height: "28px",
              borderRadius: "12px",
              px: 2,
            }}
          />
          </Box>
        </Box>

        {/* Passenger/Date Row */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ color: "#345794", fontSize: "14px", fontWeight: 400 }}>
              Vehicles Required:
            </Typography>
            <Typography sx={{ color: "#787878", fontSize: "13px", fontWeight: 400 }}>
              {event.vehiclesRequired}
            </Typography>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ color: "#345794", fontSize: "14px", fontWeight: 400 }}>
              Date:
            </Typography>
            <Typography sx={{ color: "#787878", fontSize: "13px", fontWeight: 400 }}>
              {event.date}
            </Typography>
          </Box>
          
        </Box>
      </Box>

      {/* Action Icons */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "end",
          justifyContent: "flex-start",
          borderRadius: "8px",
          marginLeft: "8px",
          minWidth: "36px",
          height: "64px",
        }}
      >
       
      </Box>
    </Box>
  );
}

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
  const isMobile=useIsMobile()
  return (
    isMobile ? (
      <Box>
        <Typography
          variant="h6"
          sx={{
            color: "#333",
            fontSize: "18px",
            fontWeight: 600,
            mb: 2,
          }}
        >
          Upcoming Events
        </Typography>
        {upcomingEvents.map((event) => (
          <UpcomingEventMobileCard key={event.id} event={event} />
        ))}
      </Box>
    ) : (
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
  );
}
