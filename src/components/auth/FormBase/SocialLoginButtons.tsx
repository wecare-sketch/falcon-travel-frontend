"use client";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";
import { useState, useEffect, useCallback } from "react";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

// Add this interface for API response
interface ApiResponse {
  data: string;
  message: string;
}

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: GoogleIdTokenResponse) => void;
          }) => void;
          renderButton: (
            parent: HTMLElement,
            options: {
              theme?: "outline" | "filled_blue" | "filled_black";
              size?: "small" | "medium" | "large";
              width?: number | string;
              shape: string;
              text: string;
            }
          ) => void;
          prompt: () => void;
        };
      };
    };
  }

  interface GoogleIdTokenResponse {
    credential: string;
    select_by: string;
    clientId?: string;
  }
}

const SocialLoginButtons = () => {
  const router = useRouter();
  const params = useParams();
  const inviteToken = (params?.inviteToken as string) || "";
  const [isLoading, setIsLoading] = useState(false);
  const formType = useSelector((state: RootState) => state.formType.type);

  const handleCredentialResponse = useCallback(
    async (response: { credential: string }) => {
      setIsLoading(true);
      try {
        const idToken = response.credential;

        const payload = JSON.parse(atob(idToken.split(".")[1]));
        const email = payload.email;
        const email_verified = payload.email_verified;

        if (!email || !email_verified) {
          throw new Error("Google email not verified");
        }

        // Determine endpoint based on form type and invite token
        let endpoint;
        if (inviteToken) {
          // If there's an invite token, use appropriate endpoint based on form type
          endpoint =
            formType === "sign-in"
              ? `/auth/social/google/login?token=${inviteToken}`
              : `/auth/social/google/signup/${inviteToken}`;
        } else {
          // No invite token, use regular login endpoint
          endpoint = `/auth/social/google/login`;
        }

        const { data } = await axiosInstance.post<ApiResponse>(endpoint, {
          authToken: idToken,
          email,
        });

        if (!data?.data) {
          throw new Error("Invalid response from server");
        }

        localStorage.setItem("access_token", data.data);
        const decoded = jwtDecode<{
          role: string;
          id: string;
          email: string;
          name: string;
        }>(data.data);
        localStorage.setItem("name", decoded.name);
        localStorage.setItem("userId", decoded.id);
        localStorage.setItem("userEmail", decoded.email);
        const role = decoded.role.toLowerCase();
        router.replace(`/${role}/dashboard`);
      } catch (error: unknown) {
        console.error("Google login error:", error);
        const message = error instanceof Error ? error.message : "Login failed";

        // Type guard to check if error is an Axios error with response
        const isAxiosError = (
          err: unknown
        ): err is { response: { data: { message: string } } } => {
          return typeof err === "object" && err !== null && "response" in err;
        };

        const axiosMessage = isAxiosError(error)
          ? error.response?.data?.message
          : undefined;
        toast.error(axiosMessage || message);
      } finally {
        setIsLoading(false);
      }
    },
    [inviteToken, router, formType]
  );

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
          callback: handleCredentialResponse,
        });

        const element = document.getElementById("google-signin-button");
        if (element) {
          window.google.accounts.id.renderButton(element, {
            theme: "outline",
            size: "large",
            width: "100%",
            shape: "rectangular",
            text: formType === "sign-up" ? "signup_with" : "signin_with",
          });
        }
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [formType, handleCredentialResponse]);

  return (
    <div className="flex w-full gap-3 md:gap-4 mb-3 md:mb-4">
      <button className="flex-1 bg-[#F5F5F5] rounded-lg h-9 md:h-11 flex items-center justify-center cursor-pointer">
        <Image
          src="/images/apple.png"
          alt="Apple"
          width={24}
          height={24}
          className="md:w-7 md:h-7"
        />
      </button>
      <div
        id="google-signin-button"
        className="flex-1 h-9 md:h-11 flex items-center justify-center"
      >
        {isLoading && (
          <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        )}
      </div>
    </div>
  );
};

export default SocialLoginButtons;
