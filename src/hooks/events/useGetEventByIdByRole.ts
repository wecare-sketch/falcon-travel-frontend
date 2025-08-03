import { useUserEventById } from "./useUserEventById";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useAdminEventById } from "./useAdminEventById";

export const useGetEventByIdByRole = (eventId: string | null) => {
  const role = useSelector((state: RootState) => state.userRole.role);

  const isAdmin = role === "admin";
  const isUser = role === "user";

  const adminEvent = useAdminEventById(eventId, { enabled: !!eventId && isAdmin });
  const userEvent = useUserEventById(eventId, { enabled: !!eventId && isUser });

  if (!eventId || !role) {
    return { data: null, isLoading: false, isError: false };
  }

  return isAdmin ? adminEvent : userEvent;
};
