import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";

interface DashboardKpis {
  activeEvents: number;
  pendingEvents: number;
  monthlyRevenue: number;
  outstandingPayments: number;
}

interface ApiWrapper {
  message: string;
  data: DashboardKpis;
}

const fetchDashboardKpis = async (): Promise<DashboardKpis> => {
  const response = await axiosInstance.get<ApiWrapper>("/admin/dashboard/kpis");
  return response.data.data;
};

export const useDashboardKpis = (options?: { enabled?: boolean }) => {
  return useQuery<DashboardKpis>({
    queryKey: ["dashboard-kpis"],
    queryFn: fetchDashboardKpis,
    enabled: options?.enabled ?? true,
  });
};
