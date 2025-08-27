"use client";

import React, { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import axiosInstance from "@/lib/axios";

interface PaymentResponse {
  data: {
    payment_Hash: string;
  };
}

const CheckoutPage = ({ amount,slug }: { amount: number,slug:string }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const response = await axiosInstance.post<PaymentResponse>(
          "/payment/stripe",
          {
            amount: amount,
            slug: slug,
          }
        );
        const paymentHash = response.data.data.payment_Hash;
        setClientSecret(paymentHash);
      } catch (error) {
        console.error("Error fetching payment secret:", error);
      }
    };

    fetchClientSecret();
  }, [amount, slug]); 

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: "https://falcon-travel-frontend.vercel.app/user/dashboard",
      },
    });

    if (error) {
     
      setErrorMessage(error.message);
    } else {
      
    }

    setLoading(false);
  };

  if (!clientSecret || !stripe || !elements) {
    return (
      <div className="flex items-center justify-center">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-2 rounded-md ">
      {clientSecret && <PaymentElement id="payment-element" />}{" "}
      {errorMessage && <div>{errorMessage}</div>}
      <button
        disabled={!stripe || loading}
        className="text-white w-full p-4 bg-[#27425F] mt-2 rounded-md font-medium disabled:opacity-50 disabled:animate-pulse"
      >
        {!loading ? `Pay  $${amount}` : "Processing..."}
      </button>
    </form>
  );
};

export default CheckoutPage;
