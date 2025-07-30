"use client";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";
import { useState } from "react";

declare global {
  interface Window {
    google?: {
      accounts: {
        oauth2: {
          initTokenClient: (config: {
            client_id: string;
            scope: string;
            callback: (tokenResponse: {
              access_token: string;
              expires_in: number;
              token_type: string;
            }) => void;
            error_callback?: (error: { type: string }) => void;
          }) => {
            requestAccessToken: () => void;
          };
        };
      };
    };
  }
}

interface ApiResponse {
  data: string;
}

interface AxiosApiResponse {
  data: ApiResponse;
}

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

const SocialLoginButtons = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const inviteToken = searchParams.get("inviteToken") || "";
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      if (!window.google) {
        toast.error("Google authentication service not available");
        setIsLoading(false);
        return;
      }

      const client = window.google.accounts.oauth2.initTokenClient({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
        scope: 'profile email',
        callback: async (tokenResponse) => {
          if (!tokenResponse?.access_token) {
            toast.error("Failed to get Google access token");
            setIsLoading(false);
            return;
          }

          try {
            const endpoint = inviteToken
              ? `/auth/social/google/signup/${inviteToken}`
              : `/auth/social/google/login`;

            const response = await axiosInstance.post<AxiosApiResponse>(endpoint, {
              idToken: tokenResponse.access_token
            });

            if (!response.data.data) {
              throw new Error("No data in response");
            }

            // localStorage.setItem("access_token", response.data.data);
            router.push("/user/dashboard");
          } catch (error: unknown) {
            const err = error as ApiError;
            const errorMessage = err.response?.data?.message ||
              err.message ||
              "Google login failed";
            toast.error(errorMessage);
          } finally {
            setIsLoading(false);
          }
        },
        error_callback: (error) => {
          console.error("Google auth error:", error);
          toast.error("Google authentication failed");
          setIsLoading(false);
        }
      });
      client.requestAccessToken();
    } catch (error: unknown) {
      console.error("Unexpected error:", error);
      const err = error as ApiError;
      toast.error(err.message || "An unexpected error occurred");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-full gap-4 mb-6">
      <button className="flex-1 bg-[#F5F5F5] rounded-lg h-12 flex items-center justify-center cursor-pointer">
        <Image src="/images/apple.png" alt="Apple" width={28} height={28} />
      </button>
      <button
        className="flex-1 bg-[#F5F5F5] rounded-lg h-12 flex items-center justify-center cursor-pointer"
        onClick={handleGoogleLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        ) : (
          <Image src="/images/google.png" alt="Google" width={28} height={28} />
        )}
      </button>
    </div>
  );
};

export default SocialLoginButtons;