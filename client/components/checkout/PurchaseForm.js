import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { checkout } from '../../store/guest';
import { userCheckout } from '../../store/cart';

function PurchaseForm({ cart, navigate }) {
  const [formState, setFormState] = useState({
    email: '',
    firstName: '',
    lastName: '',
    addressLine: '',
    country: '',
    zip: '',
    state: '',
  });

  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(userCheckout(token, cart.cartId, navigate));
    } else {
      //this is for guests, it creates an entry in the DB for them to save their cart
      dispatch(
        checkout(
          {
            user: {
              email: formState.email,
              firstName: formState.firstName,
              lastName: formState.lastName,
              address: `${formState.addressLine}, ${formState.state} ${formState.zip}, ${formState.country} `,
            },
            cart: cart,
          },
          navigate
        )
      );
    }
  };

  return (
    <div className="purchase-form-container">
      <form className="purchase-form" onSubmit={handleSubmit}>
        <div className="form-fields">
          <label>Email</label>
          <input
            name="email"
            className="form-control"
            onChange={handleChange}
            value={user.email !== null ? user.email : email}
          />
        </div>
        <div className="row">
          <div className="col">
            <label>First Name</label>
            <input
              name="firstName"
              className="form-control"
              onChange={handleChange}
              value={user.firstName !== null ? user.firstName : firstName}
            />
          </div>

          <div className="col">
            <label>Last Name</label>
            <input
              name="lastName"
              className="form-control"
              onChange={handleChange}
              value={user.lastName !== null ? user.lastName : lastName}
            />
          </div>
        </div>
        <div className="form-fields">
          <label>Address Line</label>
          <input
            name="addressLine"
            className="form-control"
            onChange={handleChange}
            value={formState.addressLine}
          />
        </div>
        <div className="form-fields">
          <label>Country</label>
          <input
            name="country"
            className="form-control"
            onChange={handleChange}
            value={formState.country}
          />
        </div>
        <div className="form-fields">
          <label>Zip</label>
          <input
            name="zip"
            className="form-control"
            onChange={handleChange}
            value={formState.zip}
          />
        </div>
        <div className="form-fields">
          <label>State</label>
          <input
            name="state"
            className="form-control"
            onChange={handleChange}
            value={formState.state}
          />
        </div>
        <button className="btn btn-dark" type="submit">
          Checkout
        </button>
      </form>
    </div>
  );
}

export default PurchaseForm;
