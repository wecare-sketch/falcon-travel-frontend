import { useMutation } from "@tanstack/react-query";
import { requestOtp } from "@/lib/api/otp";

interface AxiosErrorResponse {
  response?: {
    data?: {
      message?: string;
    };
  };
}

function isAxiosError(error: unknown): error is AxiosErrorResponse {
  return (
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    typeof (error as AxiosErrorResponse).response?.data?.message === "string"
  );
}

export const useRequestOtp = () => {
  return useMutation({
    mutationFn: requestOtp,
    onSuccess: (data) => {
      console.log("OTP sent successfully:", data); 
    },
    onError: (error: unknown) => {
      if (isAxiosError(error)) {
        console.error("Error sending OTP:", error.response?.data?.message);
      } else if (error instanceof Error) {
        console.error("Error sending OTP:", error.message);
      } else {
        console.error("Unknown error occurred");
      }
    },
  });
};
