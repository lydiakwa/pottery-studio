import axios from 'axios';

const INCREMENET_QTY = 'INCREMENET_QTY';

export const incrementItem = (productId) => {
  return {
    type: INCREMENET_QTY,
    productId,
  };
};
//initial cart state comes from localStorage if there is any
//anytime you update the redux cart, update localStorage
/*
{
  productId : quantity
}
*/

const initialState = JSON.parse(localStorage.getItem('cart'));
// const initialState = {
//   1: 1,
//   2: 3,
//   3: 4,
// };

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case INCREMENET_QTY:
      return state;
    default:
      return state;
  }
}
