import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import {toast} from "react-hot-toast";

interface EditEventData {
  eventDetails: {
    eventType?: string;
    clientName?: string;
    phoneNumber?: string;
    pickupDate?: string;
    location?: string;
    passengerCount?: number;
    hoursReserved?: number;
    equityDivision?: number;
    paymentStatus?: string;
  };
  vehicleInfo?: {
    vehicle?: string;
    vehicleId?: string;
  };
  paymentDetails?: {
    totalAmount?: number;
    depositAmount?: number;
    pendingAmount?: number;
    paymentMethod?: string;
  };
}

export const useEditEvent = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ eventId, data }: { eventId: string; data: EditEventData }) => {
      const response = await axiosInstance.patch(
        `/admin/event/${eventId}/edit`,
        data
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-events"] });
      toast.success("Event updated successfully!");
    },
  });
};