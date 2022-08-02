import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchProducts } from '../../store/products';
import { incrementItem, updateCart } from '../../store/cart';

import GuestProducts from './GuestProducts';
import AdminProducts from './AdminProducts';

function AllProducts() {
  const products = useSelector((state) => state.products);
  const auth = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const handleIncrement = (product) => {
    const token = localStorage.getItem('token');
    if (token) {
      let currentQuantity = cart.products[product.id] || 0;
      dispatch(updateCart(token, cart.cartId, product.id, currentQuantity + 1));
    } else {
      dispatch(incrementItem(product.id));
    }
  };

  return (
    <div>
      <h2 id="all-products-title">Products</h2>
      {auth.isAdmin === true ? (
        <AdminProducts products={products} handleIncrement={handleIncrement} />
      ) : (
        <GuestProducts products={products} handleIncrement={handleIncrement} />
      )}
    </div>
  );
}

export default AllProducts;
