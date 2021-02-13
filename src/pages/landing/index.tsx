import React, { useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { PaymentIntent, PaymentMethod, StripeError } from '@stripe/stripe-js';
import axios from 'axios';

const LandingPage = () => {
  const [stripeError, setStripeError] = useState<StripeError>();
  const [stripePaymentMethod, setStripePaymentMethod] = useState<PaymentMethod>();
  const [stripePaymentIntent, setStripePaymentIntent] = useState<PaymentIntent>();
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);

    if (!cardElement) return;

    try {
      //? get client-secret
      const {
        data: { clientSecret },
      } = await axios.post('https://d0tzcztg1f.execute-api.us-east-1.amazonaws.com/dev/stripe', {
        eventId: 3,
        userId: '61c5923d-dd7b-44a8-a76d-bf6d32ad71c9',
      });

      //? Use your card Element with other Stripe.js APIs
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          name: 'Ariful Alam',
          email: 'alamariful1727@gmail.com',
        },
      });

      if (error) {
        console.log('[paymentMethod-error]', error);
        setStripeError(error);
        return;
      }

      // ? confirm payment
      if (paymentMethod) {
        setStripePaymentMethod(paymentMethod);
        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
          payment_method: paymentMethod.id,
        });
        if (error) {
          console.log('[confirmCardPayment-error]', error);
          setStripeError(error);
          return;
        }
        setStripePaymentIntent(paymentIntent);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <div className="container mx-auto bg-white px-8 py-12 rounded-md">
      <h1 className="text-2xl font-semibold text-gray-800 text-center mb-8">Welcome to Stripe with react!!</h1>
      <div className="max-w-lg mx-auto border-2 rounded-md py-12 px-6 bg-gray-900 mb-8">
        <form onSubmit={handleSubmit}>
          <div className="rounded-md py-5 px-3 border border-gray-300 bg-white mb-8">
            <CardElement
              options={{
                iconStyle: 'solid',
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    // iconColor: "#fff",
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                  invalid: {
                    iconColor: '#ef4444',
                    color: '#ef4444',
                  },
                  complete: {
                    iconColor: '#cbf4c9',
                  },
                },
                hidePostalCode: true,
              }}
            />
          </div>
          <button
            className="w-full bg-yellow-400 text-xl font-semibold text-center py-2 rounded-md focus:outline-none"
            type="submit"
            disabled={!stripe}
          >
            Pay 25$
          </button>
        </form>
      </div>
      <div>
        {stripeError && <pre>{JSON.stringify(stripeError, null, 2)}</pre>}
        {stripePaymentMethod && (
          <div>
            <h1>stripePaymentMethod</h1>
            <pre>{JSON.stringify(stripePaymentMethod, null, 2)}</pre>
          </div>
        )}
        {stripePaymentIntent && (
          <div>
            <h1>stripePaymentIntent</h1>
            <pre>{JSON.stringify(stripePaymentIntent, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
