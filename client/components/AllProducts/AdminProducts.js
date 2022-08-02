import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import CreateProduct from '../admin/CreateProduct';

import { deleteProduct } from '../../store/products';

function AdminProducts({ products, handleIncrement }) {
  const dispatch = useDispatch();

  return (
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
                <button id="edit-button" className="btn btn-dark" type="button">
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
      <h2>Add a new product:</h2>
      <CreateProduct products={products} handleIncrement={handleIncrement} />
      {/* <Link to='/products/create'>
                      <button>Create a new product</button>
                    </Link> */}
    </div>
  );
}
export default AdminProducts;
