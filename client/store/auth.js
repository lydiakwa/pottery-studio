import axios from 'axios';

import { setCart } from './cart';

const SET_AUTH = 'SET_AUTH';
const CLEAR_AUTH = 'CLEAR_AUTH';

const setAuth = (auth) => ({ type: SET_AUTH, auth });

export const logout = () => {
  return { type: CLEAR_AUTH };
};

export const loginUser = (formData, navigate) => {
  return async (dispatch) => {
    try {
      console.log({ formData });
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
      console.log(err);
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
export const createUser = (user, navigate) => {
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
      console.log(err);
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
