"use client";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";

// Add this interface for API response
interface ApiResponse {
  data: {
    token: string; // Or whatever your actual response structure is
    // Add other properties if they exist in the response
  };
}

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
              id_token?: string;
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

const SocialLoginButtons = () => {
  const router = useRouter();
  const params = useParams();
  const inviteToken = params?.inviteToken as string || "";
  const [isLoading, setIsLoading] = useState(false);

  console.log("inviteToken from path:", inviteToken);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleGoogleLogin = async () => {
    setIsLoading(true);

    try {
      if (!window.google?.accounts?.oauth2) {
        throw new Error("Google authentication service not available");
      }

      const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
      if (!clientId) {
        throw new Error("Google client ID is not set");
      }

      const client = window.google.accounts.oauth2.initTokenClient({
        client_id: clientId,
        scope: "openid profile email",
        callback: async (tokenResponse) => {
          try {
            if (!tokenResponse?.access_token) {
              throw new Error("Failed to get Google access token");
            }

            const userInfo = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
              headers: {
                Authorization: `Bearer ${tokenResponse.access_token}`
              }
            }).then(res => res.json());

            if (!userInfo?.email || !userInfo?.email_verified) {
              throw new Error("Google email not verified");
            }

            const endpoint = inviteToken
              ? `/auth/social/google/signup/${inviteToken}`
              : `/auth/social/google/login`;

            console.log("Calling endpoint with inviteToken:", inviteToken);
            
            // Add type assertion here
            const { data } = await axiosInstance.post<ApiResponse>(
              endpoint,
              { 
                authToken: tokenResponse.access_token,
                email: userInfo.email
              }
            );

            if (!data?.data) {
              throw new Error("Invalid response from server");
            }

            router.push("/user/dashboard");
          } catch (error) {
            console.error("Error:", error);
            const errorMessage = error instanceof Error ? error.message : "Google login failed";
            toast.error(errorMessage);
          } finally {
            setIsLoading(false);
          }
        },
        error_callback: (error) => {
          console.error("Google auth error:", error);
          toast.error("Google authentication failed");
          setIsLoading(false);
        },
      });

      client.requestAccessToken();
    } catch (error) {
      console.error("Initialization error:", error);
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
      toast.error(errorMessage);
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