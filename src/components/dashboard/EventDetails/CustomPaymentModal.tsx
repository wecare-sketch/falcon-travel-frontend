"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { loadStripe, Stripe } from "@stripe/stripe-js";
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
  const [isGooglePayLoading, setIsGooglePayLoading] = useState(true);
  const [isGooglePayReady, setIsGooglePayReady] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);
  const stripeRef = useRef<Stripe | null>(null);
  const paymentRequestRef = useRef<ReturnType<Stripe['paymentRequest']> | null>(null);
  const buttonElementRef = useRef<unknown>(null);

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
      
      if (!stripeRef.current) {
        throw new Error("Stripe not available. Please refresh and try again.");
      }

      const { error: confirmError, paymentIntent } = await stripeRef.current.confirmCardPayment(
        clientSecret,
        { payment_method: paymentMethodId },
        { handleActions: false }
      );

      if (confirmError) {
        throw new Error(confirmError.message || "Payment failed");
      }

      if (paymentIntent.status !== "succeeded") {
        await stripeRef.current.confirmCardPayment(clientSecret);
      }

      onPaymentSuccess();
      onClose();

    } catch (error) {
      setError(error instanceof Error ? error.message : "Payment failed");
    } finally {
      setIsProcessing(false);
    }
  }, [amount, eventSlug, onPaymentSuccess, onClose]);

  const initializeGooglePay = useCallback(async () => {
    try {
      setIsGooglePayLoading(true);
      setError(null);

      // Load Stripe if not already loaded
      if (!stripeRef.current) {
        const stripe = await loadStripe(
          process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || ""
        );
        
        if (!stripe) {
          throw new Error("Failed to load Stripe");
        }
        
        stripeRef.current = stripe;
      }

      const stripe = stripeRef.current;

      // Create payment request
      const paymentRequest = stripe.paymentRequest({
        country: "US",
        currency: "usd",
        total: {
          label: "Event Payment",
          amount: Math.round(amount * 100),
        },
        requestPayerName: true,
        requestPayerEmail: true,
      });

      paymentRequestRef.current = paymentRequest;

      // Check if payment can be made
      const result = await paymentRequest.canMakePayment();

      if (result && (result.applePay || result.googlePay)) {
        setCanMakePayment(true);

        // Set up payment method handler
        paymentRequest.on("paymentmethod", async (ev) => {
          await handlePayment(ev.paymentMethod.id);
          ev.complete("success");
        });

        paymentRequest.on("cancel", () => {
          console.log("Payment request cancelled");
        });

        // Create and mount the button immediately
        if (buttonRef.current) {
          
          
          try {
            const elements = stripe.elements();
            const prButton = elements.create("paymentRequestButton", {
              paymentRequest: paymentRequest,
              style: {
                paymentRequestButton: {
                  type: "default",
                  theme: "dark",
                  height: "48px",
                },
              },
            });
            
            buttonElementRef.current = prButton;
            
            // Clear the container and mount the button
            buttonRef.current.innerHTML = "";
            prButton.mount(buttonRef.current);
            
            // Mark as ready
            setIsGooglePayReady(true);
            setIsGooglePayLoading(false);
          } catch (buttonError: unknown) {
            console.error("Error creating/mounting button:", buttonError);
            
            // Try fallback approach
            try {
              const elements = stripe.elements();
              const fallbackButton = elements.create("paymentRequestButton", {
                paymentRequest: paymentRequest,
              });
              
              buttonElementRef.current = fallbackButton;
              buttonRef.current.innerHTML = "";
              fallbackButton.mount(buttonRef.current);
              
              setIsGooglePayReady(true);
              setIsGooglePayLoading(false);
            } catch (fallbackError: unknown) {
              console.error("Fallback button creation also failed:", fallbackError);
              const errorMessage = buttonError instanceof Error ? buttonError.message : 'Unknown error';
              throw new Error(`Button creation failed: ${errorMessage}`);
            }
          }
        } else {
          console.error("Button container not found!");
          throw new Error("Button container not available");
        }
      } else {
        // Payment methods not available
        setCanMakePayment(false);
        setIsGooglePayLoading(false);
        console.log("Apple Pay/Google Pay not available:", result);
      }
    } catch (error: unknown) {
      console.error("Google Pay initialization error:", error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setError(`Failed to initialize payment system: ${errorMessage}`);
      setIsGooglePayLoading(false);
    }
  }, [amount, handlePayment]);

  // Cleanup function
  const cleanup = useCallback(() => {
    if (buttonElementRef.current) {
      try {
        // Type check to ensure the element has a destroy method
        const element = buttonElementRef.current as { destroy?: () => void };
        if (typeof element.destroy === 'function') {
          element.destroy();
        }
        buttonElementRef.current = null;
      } catch (error) {
        console.error("Error destroying button:", error);
      }
    }
    
    if (paymentRequestRef.current) {
      paymentRequestRef.current = null;
    }
    
    setIsGooglePayReady(false);
    setIsGooglePayLoading(true);
    setCanMakePayment(false);
    setError(null);
  }, []);

  // Add a separate effect to handle ref attachment
  useEffect(() => {
    if (buttonRef.current) {
      // Only initialize Google Pay when ref is actually attached
      if (isOpen && !isGooglePayReady && !isGooglePayLoading) {
        initializeGooglePay();
      }
    }
  }, [isOpen, isGooglePayReady, isGooglePayLoading, initializeGooglePay]);

  useEffect(() => {
    if (isOpen) {
      // Don't initialize immediately, wait for ref to be attached
      
      // Add a safety timeout to prevent infinite loading
      const safetyTimeout = setTimeout(() => {
        if (isGooglePayLoading && !isGooglePayReady) {
          setIsGooglePayLoading(false);
          setError("Google Pay initialization timed out. Please try again.");
        }
      }, 10000); // 10 seconds timeout
      
      return () => clearTimeout(safetyTimeout);
    } else {
      // Cleanup when modal closes
      cleanup();
    }
  }, [isOpen, cleanup, isGooglePayLoading, isGooglePayReady]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanup();
    };
  }, [cleanup]);

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
                {/* Payment Method */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Payment method</h3>
                  
                  {/* Always render the button container div */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    {/* Always render the ref div */}
                    <div ref={buttonRef} style={{ minHeight: '48px' }}></div>
                    
                    {isGooglePayLoading ? (
                      <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-600 mb-2">Setting up secure payment...</p>
                        <p className="text-sm text-gray-500">This should only take a moment</p>
                      </div>
                    ) : canMakePayment && isGooglePayReady ? (
                      <>
                        <p className="text-sm text-gray-500 mt-2 text-center">
                          Secure payment with Apple Pay or Google Pay
                        </p>
                      </>
                    ) : (
                      <div className="text-center py-8">
                        <div className="text-gray-500 mb-4">
                          <svg className="w-16 h-16 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        </div>
                        <p className="text-gray-600 mb-2">Apple Pay and Google Pay are not available on this device</p>
                        <p className="text-sm text-gray-500 mb-4">Please use a supported device or browser</p>
                        <p className="text-xs text-gray-400 mb-2">
                          Ref status: {buttonRef.current ? 'Attached' : 'Not attached'}
                        </p>
                        <button
                          onClick={() => {
                            cleanup();
                            initializeGooglePay();
                          }}
                          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                          Try Again
                        </button>
                        <button
                          onClick={() => {
                            console.log("Manual debug - buttonRef.current:", buttonRef.current);
                            console.log("Manual debug - isOpen:", isOpen);
                            console.log("Manual debug - isGooglePayReady:", isGooglePayReady);
                            console.log("Manual debug - isGooglePayLoading:", isGooglePayLoading);
                            if (buttonRef.current) {
                              initializeGooglePay();
                            }
                          }}
                          className="ml-2 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 text-sm"
                        >
                          Debug
                        </button>
                      </div>
                    )}
                  </div>
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