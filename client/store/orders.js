import axios from 'axios';

const SET_ORDER = 'SET_ORDER';

export const setOrder = (order) => {
  return {
    type: SET_ORDER,
    order,
  };
};

//logged in user
export const getUserOrder = (token) => {
  return async (dispatch) => {
    const { data } = await axios.get('/api/orders', {
      headers: { Authorization: token },
    });

    const order = {
      cartId: data.cartId,
      products: {},
    };

    for (const product of data.cart_products) {
      order.products[product.productId] = product.quantity;
    }
    console.log({ order });
    dispatch(setOrder(order));

    try {
    } catch (err) {
      console.log(err);
    }
  };
};

const initialState = {
  cartId: null,
  products: null,
};

export default function orderReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ORDER:
      return action.order;
    default:
      return state;
  }
}
