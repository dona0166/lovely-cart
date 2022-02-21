import { Dispatch } from 'redux';
import axios from 'axios';
import {
  addToCartAction,
  CartActionType,
  cartOperationsAction,
  InventoryActionType,
  removeFromCart,
  updateProductsAction,
} from '../actionTypes';

export const update =
  (value: ITargetVariant, quantity: number) =>
  (dispatch: Dispatch<cartOperationsAction | updateProductsAction>, getState: any) => {
    let products = getState().inventory.products;
    let items = getState().cart.items;
    const product = products.find((p: IProduct) => p.id === value.parentId);
    let variant = product.variants.find((v: IVariant) => v.id === value.id);
    const item = getState().cart.items.find((i: ICartItem) => i.id === value.id);
    let itemQuantity = quantity;
    let newItems = items;

    if (variant.quantity + item.quantity >= quantity) {
      products.map((p: IProduct) => {
        if (p.id === value.parentId) {
          p.variants.map((v: IVariant) => {
            if (v.id === value.id) {
              v.quantity = variant.quantity + item.quantity - quantity;
            }
            return v;
          });
          return p;
        }
      });

      if (item) {
        newItems = items.filter((i: ICartItem) => i.id !== value.id);
        itemQuantity = quantity;
      }

      const cartItem = {
        id: variant.id,
        name: variant.name,
        imageSrc: variant.image,
        price: variant.priceCents,
        quantity: itemQuantity,
        choice: value,
      };

      //update inventory
      dispatch({
        type: InventoryActionType.UPDATE_PRODUCTS,
        payload: products,
      });

      //update cart
      dispatch({
        type: CartActionType.UPDATE_CART,
        payload: [...newItems, cartItem],
      });
    }
  };

export const remove =
  (value: ITargetVariant) =>
  (dispatch: Dispatch<cartOperationsAction | updateProductsAction>, getState: any) => {
    let products = getState().inventory.products;
    let items = getState().cart.items;
    const product = products.find((p: IProduct) => p.id === value.parentId);
    let variant = product.variants.find((v: IVariant) => v.id === value.id);
    const item = getState().cart.items.find((i: ICartItem) => i.id === value.id);
    let itemQuantity;
    let newItems = items;
    let cartPayload = items.filter((i: ICartItem) => i.id !== value.id);

    products.map((p: IProduct) => {
      if (p.id === value.parentId) {
        p.variants.map((v: IVariant) => {
          if (v.id === value.id) {
            v.quantity++;
          }
          return v;
        });
        return p;
      }
    });

    if (item.quantity > 1) {
      if (item) {
        newItems = items.filter((i: ICartItem) => i.id !== value.id);
        itemQuantity = item.quantity - 1;
      }

      const cartItem = {
        id: variant.id,
        name: variant.name,
        imageSrc: variant.image,
        price: variant.priceCents,
        quantity: itemQuantity,
        choice: value,
      };

      cartPayload = [...newItems, cartItem];

      //update cart
      dispatch({
        type: CartActionType.REMOVE_FROM_CART,
        payload: cartPayload,
      });
    } else {
      //update cart
      dispatch({
        type: CartActionType.REMOVE_FROM_CART,
        payload: cartPayload,
      });
    }

    //update inventory
    dispatch({
      type: InventoryActionType.UPDATE_PRODUCTS,
      payload: products,
    });
  };

export const addToCart =
  (value: ITargetVariant) =>
  (dispatch: Dispatch<cartOperationsAction | updateProductsAction>, getState: any) => {
    let products = getState().inventory.products;
    let items = getState().cart.items;
    const product = products.find((p: IProduct) => p.id === value.parentId);
    let variant = product.variants.find((v: IVariant) => v.id === value.id);
    const item = getState().cart.items.find((i: ICartItem) => i.id === value.id);
    let itemQuantity;
    let newItems = items;

    if (variant.quantity > 0) {
      products.map((p: IProduct) => {
        if (p.id === value.parentId) {
          p.variants.map((v: IVariant) => {
            if (v.id === value.id) {
              --v.quantity;
            }
            return v;
          });
          return p;
        }
      });

      if (item) {
        newItems = items.filter((i: ICartItem) => i.id !== value.id);
        itemQuantity = item.quantity + 1;
      } else {
        itemQuantity = 1;
      }
    }

    const cartItem = {
      id: variant.id,
      name: variant.name,
      imageSrc: variant.image,
      price: variant.priceCents,
      quantity: itemQuantity,
      choice: value,
    };

    //update inventory
    dispatch({
      type: InventoryActionType.UPDATE_PRODUCTS,
      payload: products,
    });

    //update cart
    dispatch({
      type: CartActionType.ADD_TO_CART,
      payload: [...newItems, cartItem],
    });
  };
