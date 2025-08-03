import { useAdminEvents } from "./useAdminEvents";
import { useUserEvents } from "./useUserEvent";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export const useEventsByRole = () => {
  const role = useSelector((state: RootState) => state.userRole.role);

  const isAdmin = role === "admin";
  const isUser = role === "user";

  const adminEvents = useAdminEvents({ enabled: isAdmin });
  const userEvents = useUserEvents({ enabled: isUser });

  if (!role) return { data: null, isLoading: false, isError: false };

  return isAdmin ? adminEvents : userEvents;
};
