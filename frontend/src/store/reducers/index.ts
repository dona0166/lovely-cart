import { combineReducers } from 'redux';
import { inventoryReducer } from './inventory';
import { cartReducer } from './cart';

const reducers = combineReducers({
  inventory: inventoryReducer,
  cart: cartReducer,
});

export default reducers;
export type RootState = ReturnType<typeof reducers>;
