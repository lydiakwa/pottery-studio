import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchSingleProduct } from '../store/singleProduct';
import { incrementItem, updateCart } from '../store/cart';

function SingleProduct(props) {
  const cart = useSelector((state) => state.cart);
  const product = useSelector((state) => state.singleProduct);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSingleProduct(props.match.params.id));
  }, []);

  const handleChange = (evt) => {
    setQuantity(evt.target.value);
  };

  const handleIncrement = (product) => {
    const token = localStorage.getItem('token');
    console.log({ token });
    if (token) {
      let currentQuantity = cart.products[product.id] || 0;
      dispatch(
        updateCart(
          token,
          cart.cartId,
          product.id,
          currentQuantity + parseInt(quantity)
        )
      );
    } else {
      dispatch(incrementItem(product.id, parseInt(quantity)));
    }
  };

  const { title, price, type, colour, imgUrl, description, id } = product;

  return (
    <div className="container single-product-container">
      <div className="row align-items-center">
        <div className="col-md-6">
          <img
            className="img-fluid"
            src={imgUrl}
            style={{ width: '500px', height: 'auto' }}
          />
        </div>

        <div className="col-md-6 single-product-content">
          <h2 className="title">{title}</h2>
          <p className="price">${price}</p>

          <div className="quantity">
            <label htmlFor="quantity">QUANTITY:</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              min="0"
              style={{ width: '60px', height: 'auto' }}
              value={quantity}
              onChange={handleChange}
            ></input>
          </div>

          <button
            className="btn btn-dark"
            onClick={() => handleIncrement(product)}
          >
            ADD TO CART <i className="bi bi-cart"></i>
          </button>

          <div className="description">
            <p>
              <span>Type: </span>
              {type}
            </p>
            <p>
              <span>Colour: </span>
              {colour}
            </p>
            <p>
              <span>Description: </span>
            </p>
            <p>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// const mapState = (state) => ({
//   product: state.singleProduct,
//   cart: state.cart,
// });

const mapDispatch = (dispatch) => {
  return {
    loadSingleProduct: (id) => dispatch(fetchSingleProduct(id)),
    incrementItem: (productId, quantity) =>
      dispatch(incrementItem(productId, quantity)),
    updateCart: (token, cartId, productId, quantity) =>
      dispatch(updateCart(token, cartId, productId, quantity)),
  };
};

export default SingleProduct;
