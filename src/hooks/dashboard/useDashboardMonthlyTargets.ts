import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";

interface MonthlyTargetData {
  month: string;
  target: number;
  achieved: number;
  percentage: number;
}

interface ApiWrapper {
  message: string;
  data: MonthlyTargetData[];
}

const fetchDashboardMonthlyTargets = async (): Promise<MonthlyTargetData[]> => {
  const response = await axiosInstance.get<ApiWrapper>("/admin/dashboard/monthly-targets");
  return response.data.data;
};

export const useDashboardMonthlyTargets = (options?: { enabled?: boolean }) => {
  return useQuery<MonthlyTargetData[]>({
    queryKey: ["dashboard-monthly-targets"],
    queryFn: fetchDashboardMonthlyTargets,
    enabled: options?.enabled ?? true,
  });
};
