import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";

export interface SharedEvent {
  trip_id: string;
  status: string;
  ETA: string;
  passengerInfo: {
    name: string;
    phone: string;
  };
  routeDetails: {
    location: string;
    route: string[][];
  };
  vehicleInfo: {
    name: string;
    passengerCount: number;
    hoursLocked: string;
  };
  tripNotes: string[];
}

export interface SharedEventResponse {
  message: string;
  data: SharedEvent;
}

export const useGetSharedEvent = (eventSlug: string) => {
  return useQuery<SharedEventResponse>({
    queryKey: ["shared-event", eventSlug],
    queryFn: async () => {
      const response = await axiosInstance.get<SharedEventResponse>(
        `/shared/${eventSlug}`
      );
      return response.data;
    },
    enabled: !!eventSlug,
  });
};
