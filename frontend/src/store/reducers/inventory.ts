import { InventoryActionType, getProductsAction, updateProductsAction } from '../actionTypes/index';

interface InventoryState {
  products: IProduct[];
  loading: boolean;
  error: string | null;
}

const InventoryinitialState = {
  products: [],
  loading: false,
  error: null,
};

export const inventoryReducer = (
  state: InventoryState = InventoryinitialState,
  action: getProductsAction | updateProductsAction,
): InventoryState => {
  switch (action.type) {
    case InventoryActionType.GET_PRODUCTS_PENDING:
      return {
        loading: true,
        products: [],
        error: null,
      };
    case InventoryActionType.GET_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload,
        error: null,
      };
    case InventoryActionType.GET_PRODUCTS_FAILS:
      return {
        loading: false,
        error: action.payload,
        products: [],
      };
    case InventoryActionType.UPDATE_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    default:
      return state;
  }
};
