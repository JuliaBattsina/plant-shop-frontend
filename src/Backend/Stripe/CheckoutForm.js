import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import { selectCartItems, clearCart } from "../../Components/Redux/cartSlice";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const [messageSuccess, setMessageSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const totalPrice = cartItems.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    const closeModalAndClearCart = async () => {
      localStorage.removeItem("cart");
      dispatch(clearCart());
    };

    if (!error) {
      console.log("Stripe 23 | token generated!", paymentMethod);
      try {
        const { id } = paymentMethod;
        const response = await axios.post("https://plant-shop-backend-moa4.onrender.com/stripe/charge", {
          amount: totalPrice * 100,
          id: id,
        });

        console.log("Stripe 35 | data", response.data.success);
        if (response.data.success) {
          console.log("CheckoutForm.js 25 | payment successful!");
          setMessageSuccess(true);
          closeModalAndClearCart();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Payment successful!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } catch (error) {
        console.log("CheckoutForm.js 28 | ", error);
      }
    } else {
      console.log(error.message);
    }
  };

  return (
    <div>
      {!messageSuccess ? (
        <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
          <CardElement />
          <button type="submit">Pay</button>
        </form>
      ) : null}
    </div>
  );
};

export default CheckoutForm;