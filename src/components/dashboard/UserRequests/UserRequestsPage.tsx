import React, { useState } from "react";
import { PageHeader } from "../PageHeader";
import { SearchFilters } from "../SearchFilter";
import { EventDetailsPage } from "../EventDetails/EventDetailPage";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DescriptionIcon from "@mui/icons-material/Description";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Box, Typography, Chip, IconButton } from "@mui/material";
import { Edit, Trash2 } from "lucide-react";
import { CustomDivider } from "@/components/shared/CustomDivider";
import { useGetEventRequestsForAdmin } from "@/hooks/events/useGetEventRequestsForAdmin";

interface EventRequest {
  eventType: string;
  clientName: string;
  phoneNumber: string;
  pickupDate: string;
  dropoffDate: string;
  pickupTime: string;
  location: string;
  addStops: string;
  hoursReserved: number;
  totalAmount: number;
  pendingAmount: number;
  equityDivision: number;
  imageUrl: string;
  name: string;
  slug: string;
  id: string;
  passengerCount: number;
  paymentStatus: string;
  depositAmount: number;
  vehicle: string;
}

const PAGE_SIZE = 4;

interface UserRequestsPage {
  setIsCreateModalOpen: (isOpen: boolean) => void;
  setEditingEvent: React.Dispatch<React.SetStateAction<EventRequest | undefined>>
}

function UserRequestMobileListItem({
  eventName,
  clientName,
  passenger,
  date,
  location,
  onEdit,
  onDelete,
}: {
  eventName: string;
  clientName: string;
  passenger: number;
  date: string;
  location: string;
  onEdit?: () => void;
  onDelete?: () => void;
}) {
  const paymentStatus = "Pending";
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return { backgroundColor: "#E8F5E8", color: "#2E7D32" };
      case "Pending":
        return { backgroundColor: "#F87171", color: "#fff" };
      case "Overdue":
        return { backgroundColor: "#FFF3E0", color: "#F57C00" };
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
            {eventName}
          </Typography>
        </Box>
        <CustomDivider />

        {/* Client/Amount Row */}
        <Box sx={{ display: "flex", margin: "5px 0" }}>
          <Box sx={{ flex: 1 }}>
            <Typography
              sx={{ color: "#345794", fontSize: "14px", fontWeight: 400 }}
            >
              Client Name:
            </Typography>
            <Typography
              sx={{ color: "#787878", fontSize: "16px", fontWeight: 400 }}
            >
              {clientName}
            </Typography>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography
              sx={{ color: "#345794", fontSize: "14px", fontWeight: 400 }}
            >
              Remaining Amount:
            </Typography>
            <Typography
              sx={{ color: "#787878", fontSize: "16px", fontWeight: 400 }}
            >
              $ {location}
            </Typography>
          </Box>
        </Box>

        {/* Passenger/Date Row */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ flex: 1 }}>
            <Typography
              sx={{ color: "#345794", fontSize: "14px", fontWeight: 400 }}
            >
              Passenger:
            </Typography>
            <Typography
              sx={{ color: "#787878", fontSize: "13px", fontWeight: 400 }}
            >
              {passenger}
            </Typography>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography
              sx={{ color: "#345794", fontSize: "14px", fontWeight: 400 }}
            >
              Date:
            </Typography>
            <Typography
              sx={{ color: "#787878", fontSize: "13px", fontWeight: 400 }}
            >
              {date}
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
        <IconButton
          onClick={onEdit}
          sx={{
            color: "#fff",
            width: 40,
            height: 45,
            borderRadius: "0px",
            marginBottom: "2px",
            background: "#888",
            "&:hover": { background: "#aaa" },
            p: 0,
          }}
        >
          <Edit style={{ width: 18, height: 18 }} />
        </IconButton>
        <IconButton
          onClick={onDelete}
          sx={{
            color: "#fff",
            width: 40,
            height: 45,
            borderRadius: "0 0 20px 20px",
            background: "#888",
            "&:hover": { background: "#aaa" },
            p: 0,
          }}
        >
          <Trash2 style={{ width: 18, height: 18 }} />
        </IconButton>
        <Chip
          label={paymentStatus}
          size="small"
          sx={{
            ...getStatusColor(paymentStatus),
            fontSize: "13px",
            fontWeight: 500,
            height: "28px",
            borderRadius: "12px",
            mt: 5,
            px: 2,
          }}
        />
      </Box>
    </Box>
  );
}

export function UserRequestsPage({
  setIsCreateModalOpen,
  setEditingEvent,
}: Readonly<UserRequestsPage>) {
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const isMobile = useIsMobile();
  const handleViewDetails = (eventId: string) => {
    setSelectedEventId(eventId);
  };

  const handleCreateEvent = (event: EventRequest) => {
    setEditingEvent(event);
    setIsCreateModalOpen(true);
  };

  const { data, isLoading, isError } = useGetEventRequestsForAdmin();
  const eventRequests = data?.data?.requests ?? [];
  const totalPages = Math.ceil((data?.data?.total ?? 0) / PAGE_SIZE);
  const paginatedEvents = eventRequests.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  if (isLoading) return <p className="text-center mt-8">Loading requests...</p>;
  if (isError)
    return (
      <p className="text-center mt-8 text-red-500">Failed to load requests.</p>
    );

  if (selectedEventId !== null) {
    return <EventDetailsPage eventId={selectedEventId} isUserRequestPage={true}/>;
  }

  return (
    <div>
      <PageHeader title="List of Events" />
      <SearchFilters />
      {isMobile ? (
        <div>
          {paginatedEvents.map((event) => (
            <UserRequestMobileListItem
              key={event.id}
              eventName={event.name}
              clientName={event.clientName}
              passenger={event.passengerCount || 0}
              date={new Date(event?.createdAt)?.toLocaleDateString()}
              location={event.location}
              onEdit={()=> handleCreateEvent(event)}
              onDelete={() => {}}
            />
          ))}
          {/* Pagination for mobile */}
          <div className="flex justify-end mt-4 gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="border border-[#d1d5db] bg-white text-[#345794] rounded px-3 py-1 font-semibold text-base min-w-[36px] disabled:opacity-50"
            >
              {"<"}
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setPage(i + 1)}
                className={`border px-3 py-1 font-semibold text-base min-w-[36px] rounded ${
                  page === i + 1
                    ? "bg-white text-[#345794] border-[#345794]"
                    : "bg-white text-[#345794] border-[#d1d5db]"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="border border-[#d1d5db] bg-white text-[#345794] rounded px-3 py-1 font-semibold text-base min-w-[36px] disabled:opacity-50"
            >
              {">"}
            </button>
          </div>
        </div>
      ) : (
        <div className="p-4">
          <div className="overflow-x-auto bg-white rounded shadow">
            <table className="w-full border border-gray-300 border-collapse text-sm">
              <thead>
                <tr className="bg-[#F8F9FB] text-[#00000080]">
                  <th className="py-3 px-2 font-semibold text-center border border-gray-300">
                    <input type="checkbox" />
                  </th>
                  <th className="py-3 px-2 font-semibold text-center border border-gray-300">
                    No..
                  </th>
                  <th className="py-3 px-2 font-semibold text-center border border-gray-300">
                    Event Name
                  </th>
                  <th className="py-3 px-2 font-semibold text-center border border-gray-300">
                    Date
                  </th>
                  <th className="py-3 px-2 font-semibold text-center border border-gray-300">
                    Passenger
                  </th>
                  <th className="py-3 px-2 font-semibold text-center border border-gray-300">
                    Location
                  </th>
                  <th className="py-3 px-2 font-semibold text-center border border-gray-300">
                    Client Name
                  </th>
                  <th className="py-3 px-2 font-semibold text-center border border-gray-300">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedEvents.map((event, idx) => (
                  <tr
                    key={event.id}
                    className={
                      idx % 2 === 1
                        ? "bg-[#F3F6F9] text-center text-black"
                        : "bg-white text-center text-black"
                    }
                  >
                    <td className="py-2 px-2 border border-gray-300">
                      <input type="checkbox" />
                    </td>
                    <td className="py-2 px-2 border border-gray-300">
                      {(page - 1) * PAGE_SIZE + idx + 1}
                    </td>
                    <td className="py-2 px-2 border border-gray-300">
                      {event.name}
                    </td>
                    <td className="py-2 px-2 border border-gray-300">
                      {new Date(event?.createdAt)?.toLocaleDateString()}
                    </td>
                    <td className="py-2 px-2 border border-gray-300">
                      {event.passengerCount}
                    </td>
                    <td className="py-2 px-2 border border-gray-300">
                      {event.location}
                    </td>
                    <td className="py-2 px-2 border border-gray-300">
                      {event.clientName}
                    </td>
                    <td className="py-2 px-2 border border-gray-300">
                      <DescriptionIcon
                        className="cursor-pointer mr-2 text-[#C2C9D1]"
                        onClick={() => handleViewDetails(event.id.toString())}
                      />
                      <EditIcon
                        className="cursor-pointer mr-2 text-[#C2C9D1]"
                        onClick={() => handleCreateEvent(event)}
                      />
                      <DeleteIcon className="cursor-pointer text-[#C2C9D1]" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="flex justify-end mt-4 gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="border border-[#d1d5db] bg-white text-[#345794] rounded px-3 py-1 font-semibold text-base min-w-[36px] disabled:opacity-50"
            >
              {"<"}
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setPage(i + 1)}
                className={`border px-3 py-1 font-semibold text-base min-w-[36px] rounded ${
                  page === i + 1
                    ? "bg-white text-[#345794] border-[#345794]"
                    : "bg-white text-[#345794] border-[#d1d5db]"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="border border-[#d1d5db] bg-white text-[#345794] rounded px-3 py-1 font-semibold text-base min-w-[36px] disabled:opacity-50"
            >
              {">"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
