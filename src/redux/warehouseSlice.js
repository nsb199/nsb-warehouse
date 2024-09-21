import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  warehouses: [],
  selectedWarehouse: null,
};

const warehouseSlice = createSlice({
  name: 'warehouses',
  initialState,
  reducers: {
    setWarehouses: (state, action) => {
      state.warehouses = action.payload;
    },
    setSelectedWarehouse: (state, action) => {
      state.selectedWarehouse = state.warehouses.find(warehouse => warehouse.id === action.payload);
    },
    editWarehouse: (state, action) => {
      const { id, updatedData } = action.payload;
      const index = state.warehouses.findIndex(wh => wh.id === id);
      if (index !== -1) {
        state.warehouses[index] = { ...state.warehouses[index], ...updatedData };
      }
    },
  },
});

export const { setWarehouses, setSelectedWarehouse, editWarehouse } = warehouseSlice.actions;
export default warehouseSlice.reducer;
