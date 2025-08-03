"use client"

import { useUserEventById } from "@/hooks/events/useUserEventById";
import { PageHeader } from "../PageHeader"
import { EventInfoCard } from "./EventInfoCard"
import { MembersTable } from "./MembersTable"
// interface EventType {
//   id: number;
//   slug: string;
//   eventType: string;
//   clientName: string;
//   phoneNumber: string;
//   pickupDate: string;
//   location: string;
//   vehicle: string;
//   totalAmount: number;
//   passengerCount: number;
//   pendingAmount: number;
//   depositAmount: number;
//   hoursReserved: number;
//   equityDivision: number;
//   status: string;
//   createdAt: string;
//   updatedAt: string;
//   host: string;
//   cohosts: string;
//   participants: unknown[];
//   name: string;
//   imageUrl: string
// }

const membersData = [
  {
    id: "1",
    name: "Sarah Johnson",
    phoneNumber: "+1-212-555-0123",
    email: "sarah@email.com",
    dueAmount: 800,
    userStatus: "Host" as const,
    paymentStatus: "Paid" as const,
  },
  {
    id: "2",
    name: "Michael Chen",
    phoneNumber: "+1-212-555-0124",
    email: "m.chen@email.com",
    dueAmount: 800,
    userStatus: "Host" as const,
    paymentStatus: "Pending" as const,
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    phoneNumber: "+1-212-555-0125",
    email: "e.rodriguez@email.com",
    dueAmount: 800,
    userStatus: "Co-Host" as const,
    paymentStatus: "Paid" as const,
  },
  {
    id: "4",
    name: "David Wilson",
    phoneNumber: "+1-212-555-0126",
    email: "d.wilson@email.com",
    dueAmount: 800,
    userStatus: "Host" as const,
    paymentStatus: "Paid" as const,
  },
]

interface EventDetailsPageProps {
  onBack?: () => void;
  eventId?: number;
}

export function EventDetailsPage({ onBack, eventId }: EventDetailsPageProps) {
  // const eventData = events?.find(event => event.id === eventId);
  const stringEventId = eventId?.toString() ?? null;
  const { data: eventData } = useUserEventById(stringEventId);

  if (!eventData) {
    return <div>Event not found.</div>;
  }

  const handleDownloadInvoice = () => {
    console.log("Download invoice")
  }

  const handleShareIt = () => {
    console.log("Share it")
  }

  const handlePay = () => {
    console.log("Pay Now")
  }

  return (
    <>
      <PageHeader title="Event Details" onBack={onBack} />

      <EventInfoCard
        {...eventData}
        onDownloadInvoice={handleDownloadInvoice}
        onShareIt={handleShareIt}
        onPayNow={handlePay}
      />

      <MembersTable members={membersData} />
    </>
  )
}
