import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";

interface FeedbackSubmission {
  Q1: number;
  Q2: number;
  Q3: number;
  Q4: number;
  Q5: number;
  avg: number;
  description: string;
}

interface FeedbackResponse {
  message: string;
  data: {
    Q1: number;
    Q2: number;
    Q3: number;
    Q4: number;
    Q5: number;
    description: string;
    averageRating: number;
    id: number;
    createdAt: string;
    event: {
      id: string;
      slug: string;
      name: string;
      imageUrl: string;
      eventType: string;
      clientName: string;
      phoneNumber: string;
      pickupDate: string;
      location: string;
      vehicle: string;
      totalAmount: number;
      passengerCount: number;
      pendingAmount: number;
      depositAmount: number;
      hoursReserved: number;
      equityDivision: number;
      eventStatus: string;
      paymentStatus: string;
      createdAt: string;
      updatedAt: string;
      expiresAt: string;
      host: string;
      cohosts: string[];
    };
    user: {
      id: string;
      fullName: string;
      phoneNumber: string;
      dateOfBirth: string;
      email: string;
      password: string;
      role: string;
      createdAt: string;
      updatedAt: string;
      appleSubId: string | null;
    };
  };
}

export const useSubmitFeedback = (eventId: string) => {
  return useMutation<FeedbackResponse, Error, FeedbackSubmission>({
    mutationFn: async (payload: FeedbackSubmission) => {
      const response = await axiosInstance.post<FeedbackResponse>(
        `/user/feedback/${eventId}`,
        payload
      );
      return response.data;
    },
  });
};
