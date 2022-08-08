import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchProducts } from '../../store/products';
import { getUserOrder } from '../../store/orders';

function Confirmation() {
  const products = useSelector((state) => state.products);
  const guest = useSelector((state) => state.guest);
  const order = useSelector((state) => state.order);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(getUserOrder(token));
    }
  }, []);

  if (products.length === 0) {
    return <div>Nothing to see here!</div>;
  }

  if (order.products === null) {
    return <div>wait what?</div>;
  }

  // if (!this.props.guest) {
  //   return <div>loading...</div>;
  // }

  return (
    <div className="container">
      <div>
        <h1 id="confirmation-title">Thank you!</h1>
        <p>Please find your order confirmation below</p>
      </div>
      <div>
        <h2>Your Order:</h2>
        <div>
          {/* <p>Email: {this.props.guest.email}</p>
            <p>
              Name: {this.props.guest.firstName} {this.props.guest.lastName} */}
          {/* </p> */}
          {/* <p>Shipping Address:</p> */}
        </div>
        {Object.entries(order.products).map((productArray) => {
          const product = products.find(
            (product) => product.id === parseInt(productArray[0], 10)
          );
          return (
            <div className="checkoutCart-items" key={product.id}>
              <img className="checkoutCart-item-img" src={product.imgUrl} />
              <div>{product.title}</div>
              <div>${product.price}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Confirmation;
