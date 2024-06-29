import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "./CartItem";
import "./Cart.styles.css";
import StripeContainer from "../../Backend/Stripe/StripeContainer";
import { clearCart, selectCartItems } from "../../Components/Redux/cartSlice";
import { Link } from "react-router-dom"; 

function Cart() {
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const [checkoutStarted, setCheckoutStarted] = useState(false);

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handleCheckoutClick = () => {
    setCheckoutStarted(true);
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="cart-container">
    <h2 className="cart-header">Cart</h2>
    {cartItems.length === 0 ? (
      <div>
        <p>Your cart is empty</p>
        <Link to="/shop" className="shop-link">
          Continue Shopping
        </Link>
      </div>
    ) : (
      <div>
        <ul className="cart-list">
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </ul>
          <div className="cart-summary">
            <p>Total Items: {getTotalItems()}</p>
            <p>Total Price: {cartItems.reduce((total, item) => total + item.quantity * item.price, 0).toFixed(2)}</p>
            </div>
            <div className="cart-summary">
            <button className="clear-cart-btn" onClick={handleClearCart}>
              Clear Cart
            </button>
            </div>
            <div className="cart-summarychek">
            {checkoutStarted ? (
              <StripeContainer />
            ) : (
              <button onClick={handleCheckoutClick}>Checkout</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;