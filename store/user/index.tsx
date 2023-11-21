import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TriggerState {
  data: any | null | 'loading';
}

const initialState: TriggerState = {
  data: 'loading',
};

export const triggerSlice = createSlice({
  name: 'trigger',
  initialState,
  reducers: {
    setDataUser: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
    },
  },
});
export const { setDataUser: setDataUserAction } = triggerSlice.actions;

const { reducer: userReducer } = triggerSlice;

export default userReducer;
