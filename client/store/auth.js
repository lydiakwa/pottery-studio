import axios from 'axios';

import { setCart } from './cart';

const SET_AUTH = 'SET_AUTH';
const CLEAR_AUTH = 'CLEAR_AUTH';

const setAuth = (auth) => ({ type: SET_AUTH, auth });

export const logout = () => {
  return { type: CLEAR_AUTH };
};

export const loginUser = (formData, navigate, setErrors) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post('/api/auth/login', formData);
      dispatch(setAuth(data.user));
      localStorage.setItem('token', data.user.token);
      if (data.user.isAdmin === true) {
        navigate('/admin');
      } else {
        const cart = {
          cartId: data.cart.id,
          isCart: data.cart.isCart,
          products: {},
        };

        for (const product of data.cart.cart_products) {
          cart.products[product.productId] = product.quantity;
        }

        dispatch(setCart(cart));
        navigate('/');
      }
    } catch (err) {
      if (err.response.data === 'bad credentials') {
        setErrors({ form: 'Incorrect password or does not match email' });
      } else if (err.response.data.message === 'Email does not exist') {
        setErrors({ form: err.response.data.message });
      }
    }
  };
};

//this thunk will run when the app first loads and
//uses the token to login the user if they have logged in previously
export const autoLogin = (token) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/api/auth/me', {
        headers: { Authorization: token },
      });
      dispatch(setAuth(data.user));

      const cart = {
        cartId: data.cart.id,
        isCart: data.cart.isCart,
        products: {},
      };

      for (const product of data.cart.cart_products) {
        cart.products[product.productId] = product.quantity;
      }

      dispatch(setCart(cart));
    } catch (err) {
      console.log(err);
    }
  };
};

//creates a new user in the uesr model
export const createUser = (user, navigate, setErrors) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post('/api/users', user);
      dispatch(setAuth(data.user));

      const cart = {
        cartId: data.cart.id,
        isCart: data.cart.isCart,
        products: {},
      };

      for (const product of data.cart.cart_products) {
        cart.products[product.productId] = product.quantity;
      }

      dispatch(setCart(cart));

      localStorage.setItem('token', data.user.token);
      navigate('/');
    } catch (err) {
      // console.log(err);
      setErrors({ email: err.response.data });
    }
  };
};

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth;
    case CLEAR_AUTH:
      return {};
    default:
      return state;
  }
}
