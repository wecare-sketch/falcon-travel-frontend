import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";

interface PaymentStatusData {
  status: string;
  count: number;
}

interface ApiWrapper {
  message: string;
  data: PaymentStatusData[];
}

const fetchDashboardPaymentStatus = async (): Promise<PaymentStatusData[]> => {
  const response = await axiosInstance.get<ApiWrapper>("/admin/dashboard/payment-status");
  return response.data.data;
};

export const useDashboardPaymentStatus = (options?: { enabled?: boolean }) => {
  return useQuery<PaymentStatusData[]>({
    queryKey: ["dashboard-payment-status"],
    queryFn: fetchDashboardPaymentStatus,
    enabled: options?.enabled ?? true,
  });
};
