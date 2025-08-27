import React from 'react'
import { PageHeader } from '../PageHeader'
import { Elements } from '@stripe/react-stripe-js';
import CheckoutPage from '@/components/CheckoutPage';
import { loadStripe } from "@stripe/stripe-js";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
interface StripeUIPayProps {
  onBack: () => void;
  amount: number;
  slug: string;
}
const StripeUIPay: React.FC<StripeUIPayProps> = ({ onBack, amount, slug }) => {
  if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
    throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
  }
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader title="Make Payment" onBack={onBack} />
      <div className="">
        <div className="mb-10 text-center "></div>

        <Elements
          stripe={stripePromise}
          options={{
            mode: "payment",
            amount: convertToSubcurrency(amount || 0),
            currency: "usd",
          }}
        >
          <CheckoutPage amount={amount} slug={slug} />
        </Elements>
      </div>
    </div>
  );
};

export default StripeUIPay;
