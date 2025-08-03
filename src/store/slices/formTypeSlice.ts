import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type FormType =
  | "sign-in"
  | "sign-up"
  | "forgot-password"
  | "otp"
  | "reset-password";

interface FormTypeState {
  type: FormType;
}

const initialState: FormTypeState = {
  type: "sign-in",
};

const formTypeSlice = createSlice({
  name: "formType",
  initialState,
  reducers: {
    setFormType(state, action: PayloadAction<FormType>) {
      state.type = action.payload;
    },
  },
});

export const { setFormType } = formTypeSlice.actions;
export default formTypeSlice.reducer;
