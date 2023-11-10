import { useRef, useState } from "react";

import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isFiveCharacters = (value) => value.trim().length === 5;

const Checkout = (props) => {
  const [formValidity, setFormValidity] = useState({
    name: true,
    city: true,
    street: true,
    postalCode: true,
  });
  const nameRef = useRef();
  const streetRef = useRef();
  const postalCodeRef = useRef();
  const cityRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameRef.current.value;
    const enteredStreet = streetRef.current.value;
    const enteredPostalCode = postalCodeRef.current.value;
    const enteredCity = cityRef.current.value;

    const nameIsValid = !isEmpty(enteredName);
    const streetIsValid = !isEmpty(enteredCity);
    const cityIsValid = !isEmpty(enteredCity);
    const postalCodeIsValid = isFiveCharacters(enteredPostalCode);

    setFormValidity({
      name: nameIsValid,
      street: streetIsValid,
      city: cityIsValid,
      postalCode: postalCodeIsValid,
    });

    const formIsValid =
      nameIsValid && streetIsValid && cityIsValid && postalCodeIsValid;
    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      city: enteredCity,
      postalCode: enteredPostalCode,
      street: enteredStreet,
    });
  };

  const nameClassesDiv = `${classes.control} ${
    formValidity.name ? "" : classes.invalid
  }`;

  const streetClassesDiv = `${classes.control} ${
    formValidity.street ? "" : classes.invalid
  }`;

  const cityClassesDiv = `${classes.control} ${
    formValidity.city ? "" : classes.invalid
  }`;

  const postalCodeClassesDiv = `${classes.control} ${
    formValidity.postalCode ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameClassesDiv}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameRef} />
        {!formValidity.name && <p>Name is invalid</p>}
      </div>
      <div className={streetClassesDiv}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetRef} />
        {!formValidity.name && <p>Street is invalid</p>}
      </div>
      <div className={postalCodeClassesDiv}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalCodeRef} />
        {!formValidity.name && <p>Postal code is invalid</p>}
      </div>
      <div className={cityClassesDiv}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityRef} />
        {!formValidity.name && <p>City is invalid</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
