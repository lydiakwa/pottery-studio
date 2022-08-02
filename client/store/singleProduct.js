import axios from 'axios';

// Action Types
const SET_SINGLE_PRODUCT = 'SET_SINGLE_PRODUCT';
const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

// Action Creators
export const _setSingleProduct = (product) => {
  return {
    type: SET_SINGLE_PRODUCT,
    product,
  };
};

const updatedProduct = (product) => ({
  type: UPDATE_PRODUCT,
  product,
});

// Thunk Creators
export const fetchSingleProduct = (id) => {
  return async (dispatch) => {
    const { data: product } = await axios.get(`/api/products/${id}`);
    dispatch(_setSingleProduct(product));
  };
};

export const updateProduct = (product, navigate) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('token');
      const { data: updated } = await axios.put(
        `/api/products/${product.id}`,
        product,
        {
          headers: {
            authorization: token,
          },
        }
      );
      dispatch(updatedProduct(updated));
      navigate('/shop');
    } catch (err) {
      console.log(err);
    }
  };
};

export default function singleProductReducer(state = {}, action) {
  switch (action.type) {
    case SET_SINGLE_PRODUCT:
      return action.product;
    case UPDATE_PRODUCT:
      return action.product;
  }

  return state;
}
