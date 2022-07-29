import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchProducts } from '../store/products';
import { incrementItem, decrementItem, updateCart } from '../store/cart';

function Cart() {
  const cart = useSelector((state) => state.cart);
  const products = useSelector((state) => state.products);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const getSubTotal = () => {
    let total = 0;
    Object.entries(cart.products).forEach((productArray) => {
      const product = products.find(
        (product) => product.id === parseInt(productArray[0], 10)
      );
      let qty = productArray[1];
      let price = product.price;
      total += qty * price;
    });
    return total;
  };

  const handleIncrement = (product) => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(
        updateCart(
          token,
          cart.cartId,
          product.id,
          cart.products[product.id] + 1
        )
      );
    } else {
      dispatch(incrementItem(product.id));
    }
  };

  const handleDecrement = (product) => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(
        updateCart(
          token,
          cart.cartId,
          product.id,
          cart.products[product.id] - 1
        )
      );
    } else {
      dispatch(decrementItem(product.id));
    }
  };

  if (products.length === 0) {
    return <div>Loading...</div>;
  }

  if (cart.products === null) {
    return <div>Your cart is currently empty</div>;
  }

  return (
    <div className="container">
      <div className="cart-container">
        <h2 id="cart-title">Your Cart</h2>
        <div>
          {Object.entries(cart.products).map((productArray) => {
            const product = products.find(
              (product) => product.id === parseInt(productArray[0], 10)
            );
            return (
              <div key={product.id} className="cart-item">
                <img className="cart-item-image" src={product.imgUrl} />
                <p>{product.title}</p>

                <p>Quantity: {productArray[1]}</p>
                <div className="add-minus-button-container">
                  <ion-icon
                    name="add-circle-outline"
                    onClick={() => {
                      handleIncrement(product);
                    }}
                  ></ion-icon>
                  <ion-icon
                    name="remove-circle-outline"
                    onClick={() => handleDecrement(product)}
                  ></ion-icon>
                </div>
                <p>${product.price * productArray[1]}</p>
              </div>
            );
          })}
        </div>
        <div id="subtotal">Subtotal: ${getSubTotal()}</div>
        <div id="checkout-button">
          <Link className="btn btn-dark" to="/checkout">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;
