# Custom Payment Modal

This component provides a custom payment UI that shows only Google Pay and Apple Pay options, bypassing the need to redirect to Stripe's hosted checkout page.

## How it works

1. **Custom UI**: Instead of redirecting to Stripe Checkout, we show a modal with our own payment form
2. **Payment Element**: Uses Stripe's `PaymentElement` component with configuration to prioritize Google Pay and Apple Pay
3. **Payment Session**: Creates a payment session using the existing `/payment/stripe` endpoint
4. **Client Secret**: Uses the `payment_Hash` from the backend as the client secret for Stripe Elements

## Backend Requirements

The backend needs to provide a `/payment/stripe` endpoint that:

- Accepts `POST` requests with `amount` and `slug` in the body
- Returns a response with `data.payment_Hash` that serves as the client secret
- The `payment_Hash` should be a valid Stripe PaymentIntent client secret

## Configuration

The PaymentElement is configured with:
- `paymentMethodOrder: ['google_pay', 'apple_pay']` - Prioritizes these payment methods
- Custom styling and appearance
- Error handling and loading states
- Note: While we prioritize Google Pay and Apple Pay, other payment methods may still be available depending on Stripe's configuration

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

## Benefits

1. **Control**: Full control over the payment UI and user experience
2. **Branding**: Consistent with your app's design
3. **Flexibility**: Can easily add/remove payment methods or customize the flow
4. **No Redirects**: Users stay within your app during the entire payment process

## Dependencies

- `@stripe/stripe-js`
- `@stripe/react-stripe-js`
- `axios` for API calls
- `react-hot-toast` for notifications
