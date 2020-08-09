import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../store';

const selectsSlice = createSlice({
  name: 'selects',
  initialState: {
    categories: [],
  },
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    addCategory: (state, action) => {
      state.categories.push(action.payload);
    },
  },
});

export const { setCategories, addCategory } = selectsSlice.actions;

export default selectsSlice.reducer;

export const selectCount = (state: RootState) => state;
