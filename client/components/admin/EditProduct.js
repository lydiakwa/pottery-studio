import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  _setSingleProduct,
  fetchSingleProduct,
  updateProduct,
} from '../../store/singleProduct';

import ProductForm from './ProductForm';

function EditProduct() {
  const product = useSelector((state) => state.singleProduct);
  const { id: urlId } = useParams();

  const [formState, setFormState] = useState({
    title: '',
    price: 0,
    description: '',
    type: '',
    quantity: 0,
    colour: '',
    imgUrl: '',
  });

  const dispatch = useDispatch();
  // const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchSingleProduct(urlId));
  }, [urlId]);

  useEffect(() => {
    if (product.id) {
      setFormState(product);
    }
  }, [product]);

  // const handleSubmit = (evt) => {
  //   evt.preventDefault();
  //   dispatch(updateProduct(formState, navigate));
  // };

  return (
    <ProductForm
      thunkMethod={updateProduct}
      formState={formState}
      setFormState={setFormState}
    />
    // <div>
    //   <h2 className="form-header">Edit Mode</h2>
    //   <div className="container product-form-container">
    //     <div>
    //       <img src={formState.imgUrl} className="list-image" />
    //     </div>
    //     <form onSubmit={handleSubmit} className="mt-5">
    //       <div className="row">
    //         <div className="col-5">
    //           <label htmlFor="title" className="form-label">
    //             Title
    //           </label>
    //           <input
    //             className="form-control"
    //             name="title"
    //             type="text"
    //             onChange={handleChange}
    //             value={formState.title}
    //           />
    //         </div>

    //         <div className="col-5">
    //           <label htmlFor="imgUrl" className="form-label">
    //             ImgURL
    //           </label>
    //           <input
    //             className="form-control"
    //             name="imgUrl"
    //             type="text"
    //             onChange={handleChange}
    //             value={formState.imgUrl}
    //           />
    //         </div>
    //       </div>

    //       <div className="row">
    //         <div className="col-3">
    //           <label htmlFor="type" className="form-label">
    //             Type
    //           </label>
    //           <input
    //             className="form-control"
    //             name="type"
    //             type="text"
    //             onChange={handleChange}
    //             value={formState.type}
    //           />
    //         </div>

    //         <div className="col-3">
    //           <label htmlFor="colour" className="form-label">
    //             Colour
    //           </label>
    //           <input
    //             className="form-control"
    //             name="colour"
    //             type="text"
    //             onChange={handleChange}
    //             value={formState.colour}
    //           />
    //         </div>

    //         <div className="col-3" style={{ width: '100px' }}>
    //           <label htmlFor="price" className="form-label">
    //             Price
    //           </label>
    //           <input
    //             className="form-control"
    //             name="price"
    //             type="number"
    //             min="0"
    //             onChange={handleChange}
    //             value={formState.price}
    //           />
    //         </div>

    //         <div className="col-3" style={{ width: '100px' }}>
    //           <label htmlFor="quantity" className="form-label">
    //             Quantity
    //           </label>
    //           <input
    //             className="form-control"
    //             name="quantity"
    //             type="number"
    //             min="0"
    //             onChange={handleChange}
    //             value={formState.quantity}
    //           />
    //         </div>
    //       </div>

    //       <div className="col-12">
    //         <label htmlFor="description" className="form-label">
    //           Description
    //         </label>
    //         <textarea
    //           rows="5"
    //           cols="10"
    //           className="form-control"
    //           name="description"
    //           type="text"
    //           onChange={handleChange}
    //           value={formState.description}
    //         />
    //       </div>

    //       <div className="d-flex justify-content-space-evenly">
    //         <Link to="/shop" className="btn btn-dark mt-4 pr-4">
    //           Back
    //         </Link>
    //         <button type="submit" className="btn btn-dark mt-4 pr-4">
    //           Save
    //         </button>
    //       </div>
    //     </form>
    //   </div>
    //   <div></div>
    // </div>
  );
}

export default EditProduct;
