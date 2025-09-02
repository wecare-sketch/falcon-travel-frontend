# Stripe Checkout Redirect

This component provides a simple payment flow that redirects users to Stripe's hosted checkout page instead of using a custom payment UI.

## How it works

1. **Payment Session Creation**: When the modal opens, it automatically creates a payment session using the existing `/payment/stripe` endpoint
2. **Session ID Retrieval**: Gets the `sessionId` from the backend response
3. **Stripe Checkout Redirect**: Uses Stripe's `redirectToCheckout` method to send users to Stripe's hosted checkout page
4. **User Experience**: Users are redirected to Stripe's secure, optimized checkout experience

## Backend Requirements

The backend needs to provide a `/payment/stripe` endpoint that:

- Accepts `POST` requests with `amount` and `slug` in the body
- Returns a response with `data.sessionId` that serves as the Stripe Checkout session ID
- The `sessionId` should be a valid Stripe Checkout session ID

## Benefits

1. **Simplified Implementation**: No need to handle complex payment UI components
2. **Better UX**: Users get Stripe's optimized, mobile-friendly checkout experience
3. **Security**: Payment processing happens entirely on Stripe's servers
4. **Maintenance**: Stripe handles updates and improvements to the checkout flow
5. **Compliance**: Stripe ensures the checkout meets all payment industry standards

## Usage

```tsx
<CustomPaymentModal
  isOpen={isPaymentModalOpen}
  onClose={() => setIsPaymentModalOpen(false)}
  amount={event?.pendingAmount || 0}
  eventSlug={event?.slug || ""}
  onPaymentSuccess={handlePaymentSuccess}
/>
```

## Flow

1. User clicks "Pay Now" button
2. Modal opens and automatically starts payment process
3. Backend creates Stripe Checkout session
4. User is redirected to Stripe Checkout page
5. User completes payment on Stripe's hosted page
6. User is redirected back to your app (configured in Stripe dashboard)

## Dependencies

- `@stripe/stripe-js` for Stripe integration
- `axios` for API calls

## Configuration

Make sure your Stripe public key is set in `NEXT_PUBLIC_STRIPE_PUBLIC_KEY` environment variable.

## Return URL Configuration

In your Stripe dashboard, configure the return URL for successful payments to redirect users back to your application after payment completion.
