export enum CartActionType {
  ADD_TO_CART = 'ADD_TO_CART',
  REMOVE_FROM_CART = 'REMOVE_FROM_CART',
  UPDATE_CART = 'UPDATE_CART',
}

export interface addToCartAction {
  type: CartActionType.ADD_TO_CART;
  payload: ICartItem[];
}

export interface removeFromCart {
  type: CartActionType.REMOVE_FROM_CART;
  payload: ICartItem[];
}

export interface updateCart {
  type: CartActionType.UPDATE_CART;
  payload: ICartItem[];
}

export type cartOperationsAction = addToCartAction | removeFromCart | updateCart;
