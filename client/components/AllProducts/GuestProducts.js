import React from 'react';
import { Link } from 'react-router-dom';

function GuestProducts({ products, handleIncrement }) {
  return (
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
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}
export default GuestProducts;
