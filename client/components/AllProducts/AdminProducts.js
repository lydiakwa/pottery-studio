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
        <div className="row row-cols-1 row-cols-md-4 g-3">
          {products.map((product) => (
            <div className="col" key={product.id}>
              <div className="card text-center border-dark mb-3 ">
                <div className="card-header"> {product.title}</div>
                <div className="card-body">
                  <Link to={`/products/${product.id}`}>
                    <img className="card-img-top" src={product.imgUrl} />
                  </Link>

                  <p className="price">Price: ${product.price}</p>
                  <p className="quantity">quantity: {product.quantity}</p>
                </div>
                <div className="card-footer">
                  <div className="d-flex justify-content-center">
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default AdminProducts;
