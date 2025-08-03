import { configureStore } from "@reduxjs/toolkit";
import userRoleReducer from "./slices/userRoleSlice";
import formTypeReducer from "./slices/formTypeSlice";

export const store = configureStore({
  reducer: {
    userRole: userRoleReducer,
    formType: formTypeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
