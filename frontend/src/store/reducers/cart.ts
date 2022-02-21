import { addToCartAction, CartActionType, cartOperationsAction } from '../actionTypes';

interface CartState {
  items: ICartItem[];
}

const CartInitialState = {
  items: [],
};

export const cartReducer = (
  state: CartState = CartInitialState,
  action: cartOperationsAction,
): CartState => {
  switch (action.type) {
    case CartActionType.ADD_TO_CART:
      return {
        ...state,
        items: action.payload,
      };
    case CartActionType.REMOVE_FROM_CART:
      return {
        ...state,
        items: action.payload,
      };
    case CartActionType.UPDATE_CART:
      return {
        ...state,
        items: action.payload,
      };
    default:
      return state;
  }
};
