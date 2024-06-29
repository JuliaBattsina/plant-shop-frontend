import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
// Путь к CheckoutForm.js, предположим, он находится в той же папке

const PUBLIC_KEY = "pk_test_51PVsFdCDpscOr5gAVNx20za2dSo21JWyJ3K9DAGGG6FTUs74Nf8fEsMEQ0YZNCmaephDSP9m9gZeyT2XKSKJf85X00qY4wSd9o";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

const StripeContainer = () => {
  return (
    <Elements stripe={stripeTestPromise}>
      <CheckoutForm/>
    </Elements>
  );
};

export default StripeContainer;