import classes from "./Cart.module.css";

import CartItem from "./CartItem/CartItem";
import Modal from "../UI/Modal";
import React, { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cartItems = [];

  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const availableOrder = cartCtx.totalAmount > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const orderHandler = (event) => {
    setIsCheckout(true);
  };

  const submitHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      "https://taskapp-9191a-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
      {
        method: "POST",
        body: JSON.stringify({ user: userData, cartItems: cartCtx.items }),
      }
    );
    cartCtx.clearCart();
    setDidSubmit(true);
    setIsSubmitting(false);
  };

  const cartStateItems = !isCheckout ? (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onHideCart}>
        Close
      </button>
      {availableOrder && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  ) : (
    <Checkout onConfirm={submitHandler} onCancel={props.onHideCart} />
  );

  const defaultModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <ul>
        {cartCtx.items.map((item) => {
          return (
            <CartItem
              name={item.name}
              price={item.price}
              summary={item.description}
              amount={item.amount}
              key={item.id}
              onRemove={cartItemRemoveHandler.bind(null, item.id)}
              onAdd={cartItemAddHandler.bind(null, item)}
            />
          );
        })}
      </ul>
      {cartStateItems}
    </React.Fragment>
  );

  const loadingModalContent = <p>Sending your order...</p>;

  const didSubmitModalContent = <p>Your order was sent successfully!</p>;

  return (
    <Modal onHideCart={props.onHideCart}>
      {!isSubmitting && !didSubmit && defaultModalContent}
      {isSubmitting && !didSubmit && loadingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
