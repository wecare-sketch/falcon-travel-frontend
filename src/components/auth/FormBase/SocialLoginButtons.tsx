"use client";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
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
  }, []);

  const handleCredentialResponse = async (response: { credential: string }) => {
    setIsLoading(true);
    try {
      const idToken = response.credential;

      const payload = JSON.parse(atob(idToken.split(".")[1]));
      const email = payload.email;
      const email_verified = payload.email_verified;

      if (!email || !email_verified) {
        throw new Error("Google email not verified");
      }

      const endpoint = inviteToken
        ? `/auth/social/google/signup/${inviteToken}`
        : `/auth/social/google/login`;

      const { data } = await axiosInstance.post<ApiResponse>(endpoint, {
        authToken: idToken,
        email,
      });

      if (!data?.data) {
        throw new Error("Invalid response from server");
      }
      if (data?.data) {
        localStorage.setItem("access_token", data?.data);
        const decoded = jwtDecode<{ role: string }>(data?.data);
        const role = decoded.role.toLowerCase();
        router.push(`/${role}/dashboard`);
      }
    } catch (error) {
      console.error("Google login error:", error);
      const message = error instanceof Error ? error.message : "Login failed";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-full gap-4 mb-6">
      <button className="flex-1 bg-[#F5F5F5] rounded-lg h-12 flex items-center justify-center cursor-pointer">
        <Image src="/images/apple.png" alt="Apple" width={28} height={28} />
      </button>
      <div
        id="google-signin-button"
        className="flex-1 h-12 flex items-center justify-center"
      >
        {isLoading && (
          <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        )}
      </div>
    </div>
  );
};

export default SocialLoginButtons;
