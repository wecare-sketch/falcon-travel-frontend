import { useAddEvent } from "./useAddEvent";
import { useRequestEventForUser } from "./useRequestEventForUser";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export const useEventMutationByRole = () => {
  const role = useSelector((state: RootState) => state.userRole.role);

  const isAdmin = role === "admin";
  const isUser = role === "user";

  const adminMutation = useAddEvent();
  const userMutation = useRequestEventForUser();

  if (isAdmin) return adminMutation;
  if (isUser) return userMutation;

  return {
    mutate: () => {
      throw new Error("User role not recognized or not authenticated.");
    },
    status: "error",
    isLoading: false,
    isSuccess: false,
    isError: true,
    error: new Error("No valid role found."),
  };
};
