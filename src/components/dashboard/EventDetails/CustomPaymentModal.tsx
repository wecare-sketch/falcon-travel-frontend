"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";

interface CustomPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  eventSlug: string;
  onPaymentSuccess: () => void;
}

interface PaymentResponse {
  data: {
    clientSecret: string;
    paymentIntentId: string;
    sessionId: string;
  };
}

export function CustomPaymentModal({
  isOpen,
  onClose,
  amount,
  eventSlug,
  onPaymentSuccess,
}: CustomPaymentModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [canMakePayment, setCanMakePayment] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);
  
  // Single Stripe instance - created once and reused
  const [stripeInstance, setStripeInstance] = useState<Stripe | null>(null);

  const handlePayment = useCallback(async (paymentMethodId: string) => {
    setIsProcessing(true);
    setError(null);

    try {
      const response = await axiosInstance.post<PaymentResponse>(
        "/payment/stripe",
        { amount, slug: eventSlug }
      );

      if (response.status !== 200) {
        throw new Error("Failed to create payment session");
      }

      const { clientSecret } = response.data.data;
      
      if (!stripeInstance) {
        throw new Error("Stripe not available. Please refresh and try again.");
      }

      const { error: confirmError, paymentIntent } = await stripeInstance.confirmCardPayment(
        clientSecret,
        { payment_method: paymentMethodId },
        { handleActions: false }
      );

      if (confirmError) {
        throw new Error(confirmError.message || "Payment failed");
      }

      if (paymentIntent.status !== "succeeded") {
        await stripeInstance.confirmCardPayment(clientSecret);
      }

      toast.success("Payment completed successfully!");
      onPaymentSuccess();
      onClose();

    } catch (error) {
      setError(error instanceof Error ? error.message : "Payment failed");
    } finally {
      setIsProcessing(false);
    }
  }, [stripeInstance, amount, eventSlug, onPaymentSuccess, onClose]);

  const initializeStripe = useCallback(async () => {
    try {
      // Only create Stripe instance if it doesn't exist
      if (!stripeInstance) {
        const newStripeInstance = await loadStripe(
          process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || ""
        );
        
        if (!newStripeInstance) {
          setError("Failed to load Stripe");
          return;
        }

        setStripeInstance(newStripeInstance);
        return; // Exit early, let the next call handle the setup
      }

      // Use existing Stripe instance
      const currentStripe = stripeInstance;

      const pr = currentStripe.paymentRequest({
        country: "US",
        currency: "usd",
        total: {
          label: "Event Payment",
          amount: Math.round(amount * 100),
        },
        requestPayerName: true,
        requestPayerEmail: true,
      });

      const result = await pr.canMakePayment();
      setCanMakePayment(!!result);

      if (result) {
        pr.on("paymentmethod", async (ev) => {
          await handlePayment(ev.paymentMethod.id);
          ev.complete("success");
        });

        pr.on("cancel", () => {
          // Payment request cancelled
        });

        if (buttonRef.current) {
          const elements = currentStripe.elements();
          const prButton = elements.create("paymentRequestButton", {
            paymentRequest: pr,
            style: {
              paymentRequestButton: {
                type: "default",
                theme: "dark",
                height: "48px",
              },
            },
          });
          
          buttonRef.current.innerHTML = "";
          prButton.mount(buttonRef.current);
        }
      }
    } catch {
      setError("Failed to initialize payment system");
    }
  }, [amount, handlePayment, stripeInstance]);

  useEffect(() => {
    if (isOpen) {
      initializeStripe();
    }
  }, [isOpen, initializeStripe]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] overflow-y-auto bg-gray-50">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <button onClick={onClose} className="text-gray-600 hover:text-gray-800 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="font-medium">Falcon Business</span>
              </button>
              <div className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium">
                Sandbox
              </div>
            </div>
          </div>

          <div className="flex">
            {/* Left Panel - Order Details */}
            <div className="w-1/2 bg-gray-50 p-6 border-r border-gray-200">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Choose a currency:</h2>
                <div className="space-y-3">
                  <label className="flex items-center cursor-pointer">
                    <input type="radio" name="currency" value="usd" defaultChecked className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                    <span className="ml-3 text-gray-900">${amount.toFixed(2)} USD</span>
                  </label>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Event Payment</span>
                    <span className="font-semibold text-gray-900">${amount.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-gray-900">Total</span>
                      <span className="text-lg font-bold text-gray-900">${amount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Panel - Payment Methods */}
            <div className="w-1/2 p-6">
              <div className="space-y-6">
                {/* Contact Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Contact information</h3>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input type="email" id="email" defaultValue="email@example.com" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter your email" />
                  </div>
                </div>

                {/* Payment Method */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Payment method</h3>
                  
                  {canMakePayment ? (
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div ref={buttonRef}></div>
                      <p className="text-sm text-gray-500 mt-2 text-center">
                        Secure payment with Apple Pay or Google Pay
                      </p>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="text-gray-500 mb-4">
                        <svg className="w-16 h-16 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                      <p className="text-gray-600 mb-2">Apple Pay and Google Pay are not available on this device</p>
                      <p className="text-sm text-gray-500">Please use a supported device or browser</p>
                    </div>
                  )}
                </div>

                {/* Error Display */}
                {error && (
                  <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-md border border-red-200">
                    {error}
                  </div>
                )}

                {/* Processing State */}
                {isProcessing && (
                  <div className="text-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                    <p className="text-sm text-gray-600">Processing payment...</p>
                  </div>
                )}

                {/* Footer */}
                <div className="text-center text-xs text-gray-500 pt-4">
                  <p>Powered by Stripe</p>
                  <div className="flex justify-center space-x-4 mt-2">
                    <a href="#" className="text-blue-600 hover:underline">Terms</a>
                    <a href="#" className="text-blue-600 hover:underline">Privacy</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}