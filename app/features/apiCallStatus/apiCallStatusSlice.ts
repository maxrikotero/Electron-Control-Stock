import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle

const apiCallProgressSlice = createSlice({
  name: 'apiCallProgress',
  initialState: { loading: false },
  reducers: {
    set: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { set } = apiCallProgressSlice.actions;

export default apiCallProgressSlice.reducer;
