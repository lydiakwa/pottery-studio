import React from 'react';
import { connect } from 'react-redux';
import { autoLogin } from '../../store/auth';

function ProductForm({
  title,
  price,
  description,
  type,
  quantity,
  colour,
  imgUrl,
  auth,
  handleChange,
  handleSubmit,
  buttonName,
}) {
  return (
    <div className="container product-form-container">
      <form onSubmit={handleSubmit} className="mt-5">
        <div className="row">
          <div className="col-5">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              className="form-control"
              name="title"
              type="text"
              onChange={handleChange}
              value={title}
            />
          </div>

          <div className="col-5">
            <label htmlFor="imgUrl" className="form-label">
              ImgURL
            </label>
            <input
              className="form-control"
              name="imgUrl"
              type="text"
              onChange={handleChange}
              value={imgUrl}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-3">
            <label htmlFor="type" className="form-label">
              Type
            </label>
            <input
              className="form-control"
              name="type"
              type="text"
              onChange={handleChange}
              value={type}
            />
          </div>

          <div className="col-3">
            <label htmlFor="colour" className="form-label">
              Colour
            </label>
            <input
              className="form-control"
              name="colour"
              type="text"
              onChange={handleChange}
              value={colour}
            />
          </div>

          <div className="col-3" style={{ width: '100px' }}>
            <label htmlFor="price" className="form-label">
              Price
            </label>
            <input
              className="form-control"
              name="price"
              type="number"
              min="0"
              onChange={handleChange}
              value={price}
            />
          </div>

          <div className="col-3" style={{ width: '100px' }}>
            <label htmlFor="quantity" className="form-label">
              Quantity
            </label>
            <input
              className="form-control"
              name="quantity"
              type="number"
              min="0"
              onChange={handleChange}
              value={quantity}
            />
          </div>
        </div>

        <div className="col-12">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            className="form-control"
            name="description"
            type="text"
            onChange={handleChange}
            value={description}
          />
        </div>

        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-dark mt-4 pr-4">
            {buttonName}
          </button>
        </div>
      </form>
    </div>
  );
}

const mapState = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  autoLogin: (token) => dispatch(autoLogin(token)),
});

export default connect(mapState, mapDispatchToProps)(ProductForm);
