import { configureStore } from '@reduxjs/toolkit';
import warehouseReducer from './warehouseSlice';

const store = configureStore({
  reducer: {
    warehouses: warehouseReducer,
  },
});

export default store;
