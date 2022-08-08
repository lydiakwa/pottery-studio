import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import PurchaseForm from './PurchaseForm';
import CheckoutCart from './CheckoutCart';

import { fetchProducts } from '../../store/products';

function Checkout() {
  const cart = useSelector((state) => state.cart);
  const products = useSelector((state) => state.products);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <div className="container">
      <h1 id="checkout-title">Checkout</h1>
      <div className="checkout-container">
        <PurchaseForm cart={cart} navigate={navigate} />
        <CheckoutCart cart={cart.products} products={products} />
      </div>
    </div>
  );
}

export default Checkout;
