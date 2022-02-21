export enum InventoryActionType {
  GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS',
  GET_PRODUCTS_PENDING = 'GET_PRODUCTS_PENDING',
  GET_PRODUCTS_FAILS = 'GET_PRODUCTS_FAILS',
  UPDATE_PRODUCTS = 'UPDATE_PRODUCTS',
}

interface getProductsSuccess {
  type: InventoryActionType.GET_PRODUCTS_SUCCESS;
  payload: IProduct[];
}

interface getProductsPending {
  type: InventoryActionType.GET_PRODUCTS_PENDING;
}

interface getProductsFails {
  type: InventoryActionType.GET_PRODUCTS_FAILS;
  payload: string;
}

interface updateProducts {
  type: InventoryActionType.UPDATE_PRODUCTS;
  payload: IProduct[];
}

export type getProductsAction = getProductsSuccess | getProductsFails | getProductsPending;

export type updateProductsAction = updateProducts;
