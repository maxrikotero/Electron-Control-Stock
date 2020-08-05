import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { AppThunk, RootState } from '../../store';

const userSlice = createSlice({
  name: 'user',
  initialState: { sessionData: {} },
  reducers: {
    set: (state, action) => {
      state.sessionData = action.payload;
    },
  },
});

export const { set } = userSlice.actions;

export default userSlice.reducer;

export const selectCount = (state: RootState) => state.user.sessionData;
