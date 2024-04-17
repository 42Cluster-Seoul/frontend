import { createSlice } from '@reduxjs/toolkit';

export const initialState = { status: 'inactive', count: 0 };

const paceProgressBarSlice = createSlice({
  name: 'paceProgressBar',
  initialState,
  reducers: {
    paceProgressBarInactive: (state) => ({ ...state, status: 'inactive' }),
    paceProgressBarInteractive: (state) => ({ ...state, status: 'interactive' }),
    paceProgressBarComplete: (state) => ({ ...state, status: 'complete' }),
    paceProgressBarCountUp: (state) => ({ ...state, count: state.count + 1 }),
  },
});

export const { paceProgressBarInactive, paceProgressBarInteractive, paceProgressBarComplete, paceProgressBarCountUp } =
  paceProgressBarSlice.actions;

export const paceProgressBarReducer = paceProgressBarSlice.reducer;

export default {
  paceProgressBar: paceProgressBarReducer,
};
