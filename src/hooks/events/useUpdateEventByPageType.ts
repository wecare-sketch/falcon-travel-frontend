import { useUpdateEvent } from "./useUpdateEvent";
import { useUpdateEventRequest } from "./useUpdateEventRequest";

interface UseUpdateEventByPageTypeParams {
  isUserRequestPage?: boolean;
}

export const useUpdateEventByPageType = ({
  isUserRequestPage = false,
}: UseUpdateEventByPageTypeParams) => {
  const adminMutation = useUpdateEvent();
  const userRequestMutation = useUpdateEventRequest();

  return isUserRequestPage ? userRequestMutation : adminMutation;
};
