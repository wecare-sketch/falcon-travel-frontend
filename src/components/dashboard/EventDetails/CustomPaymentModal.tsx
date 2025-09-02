"use client";
import { useState, useEffect, useCallback } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axiosInstance from "@/lib/axios";

interface CustomPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  eventSlug: string;
  onPaymentSuccess: () => void;
}

interface PaymentResponse {
  data: {
    sessionId: string;
  };
}

export function CustomPaymentModal({
  isOpen,
  onClose,
  amount,
  eventSlug,
}: CustomPaymentModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Validate amount
  const isValidAmount = amount > 0;

  const redirectToStripeCheckout = useCallback(async () => {
    setIsProcessing(true);
    setError(null);

    try {
      // Create payment session and get sessionId
      const response = await axiosInstance.post<PaymentResponse>(
        "/payment/stripe",
        { amount, slug: eventSlug }
      );

      if (response.status !== 200) {
        throw new Error("Failed to create payment session");
      }

      const { sessionId } = response.data.data;
      
      if (!sessionId) {
        throw new Error("No session ID received from server");
      }

      // Load Stripe and redirect to checkout
      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || ""
      );
      
      if (!stripe) {
        throw new Error("Failed to load Stripe");
      }

      // Redirect to Stripe Checkout
      const { error: redirectError } = await stripe.redirectToCheckout({
        sessionId: sessionId
      });

      if (redirectError) {
        throw new Error(redirectError.message || "Failed to redirect to checkout");
      }

      // Close modal after successful redirect
      onClose();

    } catch (error) {
      setError(error instanceof Error ? error.message : "Payment failed");
      setIsProcessing(false);
    }
  }, [amount, eventSlug, onClose]);

  // Auto-redirect when modal opens
  useEffect(() => {
    if (isOpen && isValidAmount && !isProcessing && !error) {
      redirectToStripeCheckout();
    }
  }, [isOpen, isValidAmount, isProcessing, error, redirectToStripeCheckout]);

  if (!isOpen) return null;
  
  // Show error if amount is invalid
  if (!isValidAmount) {
    return (
      <div className="fixed inset-0 z-[9999] overflow-y-auto bg-gray-50">
        <div className="flex items-center justify-center min-h-screen p-4">
          <div className="w-full max-w-md bg-white rounded-lg shadow-2xl p-6 text-center">
            <div className="text-red-600 text-xl mb-4">Invalid Amount</div>
            <div className="text-gray-600 mb-4">The payment amount must be greater than 0.</div>
            <button 
              onClick={onClose}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Just show loading state while redirecting - no custom UI needed
  return (
    <div className="fixed inset-0 z-[9999] overflow-y-auto bg-gray-50">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-2xl p-6 text-center">
          {/* Simple loading state while redirecting */}
          {isProcessing && !error ? (
            <div className="space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-600">Redirecting to Stripe Checkout...</p>
              <p className="text-sm text-gray-500">Please wait</p>
            </div>
          ) : error ? (
            <div className="space-y-4">
              <div className="text-red-600 text-lg mb-4">
                <svg className="w-16 h-16 mx-auto text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md border border-red-200">
                {error}
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setError(null);
                    redirectToStripeCheckout();
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Try Again
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}