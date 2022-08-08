import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { deleteProduct } from '../../store/products';

function AdminProducts({ products }) {
  const dispatch = useDispatch();

  return (
    <div>
      <Link
        to="/products/create"
        className="btn btn-dark"
        id="add-product-button"
      >
        Create a Product
      </Link>
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
                  onClick={() => dispatch(deleteProduct(product.id))}
                >
                  <i className="bi bi-trash"></i>
                </button>
              </div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default AdminProducts;
