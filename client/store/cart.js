import axios from 'axios';

const INCREMENT_QTY = 'INCREMENT_QTY';
const DECREMENT_QTY = 'DECREMENT_QTY';

const SET_CART = 'SET_CART';
const CLEAR_CART = 'CLEAR_CART';
const UPDATE_QTY = 'UPDATE_QTY';

export const incrementItem = (productId, quantity = 1) => {
  return {
    type: INCREMENT_QTY,
    productId,
    quantity,
  };
};

export const updateQty = (productId, quantity) => {
  return {
    type: UPDATE_QTY,
    productId,
    quantity,
  };
};

export const decrementItem = (productId) => {
  return {
    type: DECREMENT_QTY,
    productId,
  };
};

export const setCart = (cart) => {
  return {
    type: SET_CART,
    cart,
  };
};

export const clearCart = () => {
  return {
    type: CLEAR_CART,
  };
};

export const getCart = (token) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/api/cart', {
        headers: { Authorization: token },
      });
      const cart = {
        cartId: data.cartId,
        isCart: data.isCart,
        products: {},
      };

      for (const product of data.cart_products) {
        cart.products[product.productId] = product.quantity;
      }
      dispatch(setCart(cart));
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateCart = (token, cartId, productId, quantity) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(
        `/api/cart/${cartId}`,
        { productId, quantity },
        {
          headers: { Authorization: token },
        }
      );
      dispatch(updateQty(data.productId, data.quantity));
    } catch (err) {
      console.log(err);
    }
  };
};

export const userCheckout = (token, cartId, navigate) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/cart/${cartId}/checkout`, null, {
        headers: { Authorization: token },
      });

      const cart = {
        cartId: data.id,
        isCart: data.isCart,
        products: {},
      };
      dispatch(setCart(cart));
      navigate('/confirmation');
    } catch (err) {
      console.log(err);
    }
  };
};

/*
a users cart = {
  cartId: id
  isCart: boolean,
  products: {id: qty, id: qty}
}

*/

const initialState = {
  cartId: null,
  isCart: true,
  products: JSON.parse(localStorage.getItem('cart')),
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case INCREMENT_QTY:
      if (state.products === null) {
        return {
          ...state,
          products: { ...state.products, [action.productId]: action.quantity },
        };
      } else if (action.productId in state.products) {
        return {
          ...state,
          products: {
            ...state.products,
            [action.productId]:
              state.products[action.productId] + action.quantity,
          },
        };
      } else {
        return {
          ...state,
          products: { ...state.products, [action.productId]: action.quantity },
        };
      }
    case DECREMENT_QTY:
      if (state.products[action.productId] === 1) {
        let newProducts = { ...state.products };
        delete newProducts[action.productId];
        return { ...state, products: newProducts };
      } else {
        return {
          ...state,
          products: {
            ...state.products,
            [action.productId]: state.products[action.productId] - 1,
          },
        };
      }
    case UPDATE_QTY:
      if (action.quantity === 0) {
        let newProducts = { ...state.products };
        delete newProducts[action.productId];
        return { ...state, products: newProducts };
      } else {
        return {
          ...state,
          products: { ...state.products, [action.productId]: action.quantity },
        };
      }

    case SET_CART:
      return action.cart;
    case CLEAR_CART:
      return { ...state, products: {} };
    default:
      return state;
  }
}
