import axios from 'axios';

const INCREMENT_QTY = 'INCREMENT_QTY';
const DECREMENT_QTY = 'DECREMENT_QTY';

const SET_CART = 'SET_CART';

export const incrementItem = (productId, quantity = 1) => {
  return {
    type: INCREMENT_QTY,
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

/*
a users cart = {
  isCart: boolean,
  products: {id: qty, id: qty}
}

*/

const initialState = {
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
        let newstate = { ...state };
        delete newstate.products[action.productId];
        return newstate;
      } else {
        return {
          ...state,
          products: {
            ...state.products,
            [action.productId]: state.products[action.productId] - 1,
          },
        };
      }
    case SET_CART:
      return action.cart;
    default:
      return state;
  }
}
