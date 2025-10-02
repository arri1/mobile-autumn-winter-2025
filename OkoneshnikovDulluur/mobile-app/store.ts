import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    inc: (s) => { s.value += 1; },
    addBy: (s, a: PayloadAction<number>) => { s.value += a.payload; },
    reset: (s) => { s.value = 0; },
  },
});

export const { inc, addBy, reset } = counterSlice.actions;

export const store = configureStore({
  reducer: { counter: counterSlice.reducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
