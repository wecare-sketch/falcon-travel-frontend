import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";

interface UpcomingEvent {
  id: string;
  slug: string;
  name: string;
  date: string;
  client: string;
  paymentstatus: string;
  vehiclesRequired: string | null;
}

interface ApiWrapper {
  message: string;
  data: UpcomingEvent[];
}

const fetchDashboardUpcoming = async (): Promise<UpcomingEvent[]> => {
  const response = await axiosInstance.get<ApiWrapper>("/admin/dashboard/upcoming");
  return response.data.data;
};

export const useDashboardUpcoming = (options?: { enabled?: boolean }) => {
  return useQuery<UpcomingEvent[]>({
    queryKey: ["dashboard-upcoming"],
    queryFn: fetchDashboardUpcoming,
    enabled: options?.enabled ?? true,
  });
};
