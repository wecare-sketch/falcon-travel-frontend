import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { toast } from "react-hot-toast";

interface OtpResponse {
  message: string;
  data: {
    token: string;
  };
}

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export const useVerifyOtp = () => {
  return useMutation<OtpResponse, ApiError, string>({
    mutationFn: async (otp: string) => {
      const email = localStorage.getItem("emailForOtp");

      const res = await axiosInstance.post<OtpResponse>("/otp/verify", {
        email,
        otp,
      });

      const token = res.data?.data?.token;
      if (token) {
        localStorage.setItem("access_token", token);
      }

      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "OTP Verified");
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message || "OTP verification failed";
      toast.error(message);
    },
  });
};
