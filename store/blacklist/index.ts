import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

export const blacklistSlice = createSlice({
  name: 'blacklist',
  initialState,
  reducers: {},
});

const { reducer: blacklistReducer } = blacklistSlice;

export default blacklistReducer;
