import { configureStore } from "@reduxjs/toolkit";
import userRoleReducer from "./slices/userRoleSlice";
import formTypeReducer from "./slices/formTypeSlice";
import eventsReducer from "./slices/eventsSlice";

export const store = configureStore({
  reducer: {
    userRole: userRoleReducer,
    formType: formTypeReducer,
    events: eventsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
