import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserRoleState {
  role: "admin" | "user" | null;
}

const initialState: UserRoleState = {
  role: null,
};

const userRoleSlice = createSlice({
  name: "userRole",
  initialState,
  reducers: {
    setUserRole(state, action: PayloadAction<"admin" | "user">) {
      state.role = action.payload;
    },
  },
});

export const { setUserRole } = userRoleSlice.actions;
export default userRoleSlice.reducer;
