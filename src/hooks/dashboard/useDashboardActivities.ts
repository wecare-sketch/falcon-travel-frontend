import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";

interface RecentActivity {
  id: string;
  type: string;
  description: string;
  timestamp: string;
  eventId?: string;
  eventName?: string;
  userId?: string;
  userName?: string;
}

interface ApiWrapper {
  message: string;
  data: RecentActivity[];
}

const fetchDashboardActivities = async (): Promise<RecentActivity[]> => {
  const response = await axiosInstance.get<ApiWrapper>("/admin/dashboard/activities");
  return response.data.data;
};

export const useDashboardActivities = (options?: { enabled?: boolean }) => {
  return useQuery<RecentActivity[]>({
    queryKey: ["dashboard-activities"],
    queryFn: fetchDashboardActivities,
    enabled: options?.enabled ?? true,
  });
};
