"use client"

import { PageHeader } from "../PageHeader"
import { EventInfoCard } from "./EventInfoCard"
import { MembersTable } from "./MembersTable"

const eventsData = [
  {
    id: 1,
    eventType: "Newport Night Party",
    vehicle: "Mercedes",
    date: "21-12-2025",
    phoneNumber: "+1-2345-424532",
    clientName: "Ali Gul Pear",
    location: "475 5th Ave, New York, NY, 10018, United States",
    totalAmount: 3000,
    remainingAmount: 800,
  },
  {
    id: 2,
    eventType: "Another Event",
    vehicle: "Toyota",
    date: "22-12-2025",
    phoneNumber: "+1-2345-424533",
    clientName: "Another Client",
    location: "Another Location",
    totalAmount: 2000,
    remainingAmount: 500,
  },
  {
    id: 3,
    eventType: "Third Event",
    vehicle: "Honda",
    date: "23-12-2025",
    phoneNumber: "+1-2345-424534",
    clientName: "Third Client",
    location: "Third Location",
    totalAmount: 1500,
    remainingAmount: 300,
  },
]

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
  eventId?:number 
}

export function EventDetailsPage({ onBack, eventId }: EventDetailsPageProps) {
  const eventData = eventsData.find(event => event.id === eventId);

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
