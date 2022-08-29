import React, { useState } from 'react';

import { createProduct } from '../../store/products';
import ProductForm from './ProductForm';

function CreateProduct() {
  const [formState, setFormState] = useState({
    title: '',
    price: 0,
    description: '',
    type: '',
    quantity: 0,
    colour: '',
    imgUrl:
      'https://ferrettools.com/wp-content/plugins/elementor/assets/images/placeholder.png',
  });

  return (
    <ProductForm
      thunkMethod={createProduct}
      formState={formState}
      setFormState={setFormState}
    />
  );
}

export default CreateProduct;
