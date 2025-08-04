import { useUserEventById } from "./useUserEventById";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useAdminEventById } from "./useAdminEventById";

interface UseGetEventByIdByRoleOptions {
  enabled?: boolean;
}

export const useGetEventByIdByRole = (
  eventId: string | null,
  options?: UseGetEventByIdByRoleOptions
) => {
  const role = useSelector((state: RootState) => state.userRole.role);
  const isAdmin = role === "admin";
  const isUser = role === "user";

  // Always call both hooks
  const adminEvent = useAdminEventById(eventId, {
    enabled: !!eventId && isAdmin && (options?.enabled ?? true),
  });

  const userEvent = useUserEventById(eventId, {
    enabled: !!eventId && isUser && (options?.enabled ?? true),
  });

  if (!eventId || !role) {
    return { data: null, isLoading: false, isError: false };
  }

  return isAdmin ? adminEvent : userEvent;
};
