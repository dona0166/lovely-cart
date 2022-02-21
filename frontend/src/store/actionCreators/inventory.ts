import { Dispatch } from 'redux';
import axios from 'axios';
import { getProductsAction, InventoryActionType } from '../actionTypes';

export function getProducts() {
  return async (dispatch: Dispatch<getProductsAction>) => {
    dispatch({
      type: InventoryActionType.GET_PRODUCTS_PENDING,
    });
    try {
      const { data } = await axios.get(`http://localhost:8000/products`);
      dispatch({
        type: InventoryActionType.GET_PRODUCTS_SUCCESS,
        payload: data.products,
      });
    } catch (err) {
      dispatch({
        type: InventoryActionType.GET_PRODUCTS_FAILS,
        payload: 'error fetching',
      });
    }
  };
}
