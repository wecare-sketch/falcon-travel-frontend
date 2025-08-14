"use client";

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
import { useIsMobile } from "@/hooks/useIsMobile"
import { CustomDivider } from "@/components/shared/CustomDivider"
import { useAdminEvents } from "@/hooks/events/useAdminEvents";
interface Event {
  id: string;
  name: string;
  clientName: string;
  vehicle: string;
  paymentStatus: string;
  pickupDate: string;
  dropoffDate: string;
  hoursReserved: number;
  totalAmount: number;
  pendingAmount: number;
  equityDivision: number;
  passengerCount: number;
  eventType: string;
  imageUrl: string;
  slug: string;}

function UpcomingEventMobileCard({ event }: { event: Event }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return { backgroundColor: "#B7EB8F", color: "#52C41A" };
      case "pending":
        return { backgroundColor: "#FFE58F", color: "#FAAD14" };
      case "overdue":
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
      <Box sx={{ flex: 1 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
            marginTop: "10px",
          }}
        >
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
            {event.name}
          </Typography>
        </Box>
        <CustomDivider />

        {/* Client/Amount Row */}
        <Box
          sx={{
            display: "flex",
            margin: "5px 0",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography
              sx={{ color: "#345794", fontSize: "14px", fontWeight: 400 }}
            >
              Client:
            </Typography>
            <Typography
              sx={{ color: "#787878", fontSize: "16px", fontWeight: 400 }}
            >
              {event.clientName}
            </Typography>
          </Box>
          <Box>
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
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography
              sx={{ color: "#345794", fontSize: "14px", fontWeight: 400 }}
            >
              Vehicles Required:
            </Typography>
            <Typography
              sx={{ color: "#787878", fontSize: "13px", fontWeight: 400 }}
            >
              {event.vehicle}
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{ color: "#345794", fontSize: "14px", fontWeight: 400 }}
            >
              Pickup Date:
            </Typography>
            <Typography
              sx={{ color: "#787878", fontSize: "13px", fontWeight: 400 }}
            >
              {event.pickupDate}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export function UpcomingEventsTable() {
  const { data, isLoading, isError } = useAdminEvents(); // Use the hook here
  const isMobile = useIsMobile();

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (isError) {
    return <Typography>Error loading events.</Typography>;
  }

  function getStatusColor(paymentStatus: string): import("@mui/system").SxProps<import("@mui/material").Theme> | undefined {
    switch (paymentStatus) {
      case "paid":
        return { backgroundColor: "#B7EB8F", color: "#52C41A" };
      case "pending":
        return { backgroundColor: "#FFE58F", color: "#FAAD14" };
      case "overdue":
        return { backgroundColor: "#FFCCC7", color: "#FF4D4F" };
      default:
        return { backgroundColor: "#F5F5F5", color: "#666" };
    }
  }
  return isMobile ? (
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
      {data?.events?.map((event) => (
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
            {data?.events?.map((event) => (
              <TableRow
                key={event.id}
                sx={{
                  "&:hover": {
                    backgroundColor: "#F8F9FA",
                  },
                }}
              >
                <TableCell
                  sx={{
                    padding: "16px 24px",
                    borderBottom: "1px solid #F0F0F0",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#333",
                      fontSize: "14px",
                      fontWeight: 500,
                    }}
                  >
                    {event.name}
                  </Typography>
                </TableCell>
                <TableCell
                  sx={{
                    padding: "16px 24px",
                    borderBottom: "1px solid #F0F0F0",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#666",
                      fontSize: "14px",
                    }}
                  >
                    {event.pickupDate}
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
                    {event.clientName}
                  </Typography>
                </TableCell>
                <TableCell
                  sx={{
                    padding: "16px 24px",
                    borderBottom: "1px solid #F0F0F0",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#333",
                      fontSize: "14px",
                      fontWeight: 500,
                    }}
                  >
                    {event.vehicle}
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
                      borderRadius: "0px",
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}
