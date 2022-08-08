import React from 'react';

function CheckoutCart({ cart, products }) {
  if (products.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="checkoutCart-container">
      {Object.entries(cart).map((productArray) => {
        const product = products.find(
          (product) => product.id === parseInt(productArray[0], 10)
        );
        return (
          <div className="checkoutCart-items" key={product.id}>
            <img className="checkoutCart-item-img" src={product.imgUrl} />
            <div className="checkoutCart-item">{product.title}</div>
            <div className="checkoutCart-item">{productArray[1]}</div>
            <div className="checkoutCart-item">
              ${product.price * parseInt(productArray[1])}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CheckoutCart;
