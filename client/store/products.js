import axios from 'axios';
import history from '../history';

// Action Types
const SET_PRODUCTS = 'SET_PRODUCTS';
const CREATE_PRODUCT = 'CREATE_PRODUCT';
const DELETE_PRODUCT = 'DELETE_PRODUCT';

// Action Creators
export const _setProducts = (products) => {
  return {
    type: SET_PRODUCTS,
    products,
  };
};

const createdProduct = (product) => ({
  type: CREATE_PRODUCT,
  product,
});

const deletedProduct = (product) => ({
  type: DELETE_PRODUCT,
  product,
});

// Thunk Creators
export const fetchProducts = () => {
  return async (dispatch) => {
    const { data: products } = await axios.get('/api/products');
    dispatch(_setProducts(products));
  };
};

export const createProduct = (product, navigate) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.post('/api/products', product, {
        headers: {
          authorization: token,
        },
      });
      dispatch(createdProduct(data));
      navigate('/shop');
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteProduct = (id) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('token');
      const { data: product } = await axios.delete(`/api/products/${id}`, {
        headers: {
          authorization: token,
        },
      });
      dispatch(deletedProduct(product));
    } catch (err) {
      console.log(err);
    }
  };
};

// Reducer
export default function productsReducer(state = [], action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products;
    case CREATE_PRODUCT:
      return [...state, action.product];
    case DELETE_PRODUCT:
      return state.filter((product) => product.id !== action.id);
  }
  return state;
}
