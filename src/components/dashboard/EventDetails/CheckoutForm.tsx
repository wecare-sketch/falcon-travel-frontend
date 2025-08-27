// import { useState, useEffect } from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import { PaymentRequestButtonElement } from "@stripe/react-stripe-js";

// const stripePromise = loadStripe(
//   "pk_test_51S0P6SGmOtjjYLVJAYZV2O10382JEKrmyNhHyUW3MzJlGhNI8SaMQhQbRZ46zrzBdFYmCkKdXyIm7eCLZ3d1TWny00bwc5nU0P"
// );

// const CheckoutForm = ({ amount, eventSlug }) => {
//   const [paymentRequest, setPaymentRequest] = useState(null);
// console.log(amount, "amount");
//   useEffect(() => {
//     const createPaymentRequest = async () => {
//       const stripe = await stripePromise;

//       const pr = stripe.paymentRequest({
//         country: "US",
//         currency: "usd",
//         total: {
//           label: "Event Payment",
//           amount: amount,
//         },
//         requestPayerName: true,
//         requestPayerEmail: true,
//       });

//       // Check if Apple Pay/Google Pay is available
//       pr.canMakePayment().then((result) => {
//         if (result && (result.applePay || result.googlePay)) {
//           setPaymentRequest(pr);
//         }
//       });
//     };

//     createPaymentRequest();
//   }, [amount]);

//   const handlePaymentMethod = async (ev) => {
//     const { paymentIntent, error } = await ev.complete("success");
//     if (error) {
//       console.error("Payment method error", error);
//     } else {
//       // Send the paymentIntent to your backend to complete the payment
//       console.log("PaymentIntent received:", paymentIntent);
//     }
//   };

//   return (
//     <div>
//       {paymentRequest && (
//         <PaymentRequestButtonElement
//           options={{
//             paymentRequest: paymentRequest,
//           }}
//           onPaymentMethodReceived={handlePaymentMethod}
//         />
//       )}
//     </div>
//   );
// };

// export default CheckoutForm;
