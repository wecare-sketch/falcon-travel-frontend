import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";

interface DashboardTotal {
  totalEvents: number;
  totalRevenue: number;
  totalUsers: number;
  totalPendingPayments: number;
  totalCompletedEvents: number;
  totalActiveEvents: number;
  // Add other total fields based on API response
}

interface ApiWrapper {
  data: DashboardTotal;
}

const fetchDashboardTotal = async (): Promise<DashboardTotal> => {
  const response = await axiosInstance.get<ApiWrapper>("/admin/dashboard");
  return response.data.data;
};

export const useDashboardTotal = (options?: { enabled?: boolean }) => {
  return useQuery<DashboardTotal>({
    queryKey: ["dashboard-total"],
    queryFn: fetchDashboardTotal,
    enabled: options?.enabled ?? true,
  });
};
