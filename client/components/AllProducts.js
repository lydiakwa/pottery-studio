import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchProducts, deleteProduct } from '../store/products';
import { incrementItem, updateCart } from '../store/cart';
import { autoLogin } from '../store/auth';
import CreateProduct from './admin/CreateProduct';
import EditProduct from './admin/EditProduct';

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
        <div className="product-list">
          <ul>
            {products.map((product) => (
              <div key={product.id}>
                <div>
                  <p className="title">Title: {product.title}</p>

                  <Link to={`/products/${product.id}`}>
                    <img className="list-image" src={product.imgUrl} />
                  </Link>

                  <p className="price">Price: {product.price}</p>
                  <p className="quantity">quantity: {product.quantity}</p>
                </div>

                <div className="d-flex justify-content-between">
                  <Link to={`/products/${product.id}/edit`}>
                    <button
                      id="edit-button"
                      className="btn btn-dark"
                      type="button"
                    >
                      Edit
                    </button>
                  </Link>

                  <button
                    className="btn btn-outline-danger"
                    type="button"
                    onClick={() => this.props.deleteProduct(product.id)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            ))}
          </ul>
          <h2>Add a new product:</h2>
          <CreateProduct />
          {/* <Link to='/products/create'>
                      <button>Create a new product</button>
                    </Link> */}
        </div>
      ) : (
        <div className="product-list">
          <ul>
            {products.map((product) => (
              <div className="product-list-item" key={product.id}>
                <div className="product-list-item-detail">
                  <Link to={`/products/${product.id}`}>
                    <img className="list-image" src={product.imgUrl} />
                  </Link>
                  <p className="title">{product.title}</p>
                  <p className="price">${product.price}</p>
                </div>

                <div>
                  <button
                    className="btn btn-dark"
                    type="button"
                    // need to check if item already exists in localStorage.
                    onClick={() => handleIncrement(product)}
                  >
                    Purchase
                  </button>
                </div>
              </div>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default AllProducts;
