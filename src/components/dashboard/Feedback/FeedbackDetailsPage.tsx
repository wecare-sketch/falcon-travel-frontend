"use client";

import { Box, Typography } from "@mui/material";
import { Star, StarBorder } from "@mui/icons-material";
import { PageHeader } from "../PageHeader";

interface Feedback {
  id: number;
  Q1: number;
  Q2: number;
  Q3: number;
  Q4: number;
  Q5: number;
  description: string;
  averageRating: number;
  createdAt: string;
}

interface EventUser {
  id: string;
  fullName: string;
  phoneNumber: string;
  dateOfBirth: string;
  email: string;
  password: string;
  role: "user";
  createdAt: string;
  updatedAt: string;
  appleSubId: string | null;
}

interface EventParticipant {
  id: number;
  email: string;
  equityAmount: number;
  depositedAmount: number;
  paymentStatus: "paid" | "pending";
  role: "host" | "cohost" | "guest";
  createdAt: string;
  updatedAt: string;
  user: EventUser;
}
interface Event {
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
  participants: EventParticipant[];
  feedbacks: Feedback[];
  media: unknown[];
  messages: unknown[];
  transactions: unknown[];
}


interface FeedbackDetailsPageProps {
  onBack?: () => void;
  event: Event | undefined;
}

export function FeedbackDetailsPage({
  onBack,
  event,
}: FeedbackDetailsPageProps) {
  const feedback = event?.feedbacks?.[0];

  if (!event || !feedback) {
    return (
      <Box sx={{ padding: 4, textAlign: "center", color: "#666" }}>
        <Typography variant="h6" sx={{ fontWeight: 500, fontSize: "18px" }}>
          This event does not have any feedback yet.
        </Typography>
        <Typography variant="body2" sx={{ marginTop: 1, fontSize: "14px" }}>
          Once feedback is submitted, it will appear here.
        </Typography>
      </Box>
    );
  }

  const feedbackQuestions = [
    {
      id: "1",
      question:
        "How would you rate the quality of their work in terms of accuracy and attention to detail?",
      rating: feedback.Q1,
      maxRating: 5,
    },
    {
      id: "2",
      question:
        "Did the employee consistently meet deadlines and project goals?",
      rating: feedback.Q2,
      maxRating: 5,
    },
    {
      id: "3",
      question: "How would you rate their communication?",
      rating: feedback.Q3,
      maxRating: 5,
    },
    {
      id: "4",
      question:
        "How would you rate the employee's ability to identify and solve problems?",
      rating: feedback.Q4,
      maxRating: 5,
    },
    {
      id: "5",
      question:
        "How well did the employee handle challenges or unexpected issues?",
      rating: feedback.Q5,
      maxRating: 5,
    },
  ];

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={`full-${i}`} sx={{ color: "#345794", fontSize: "16px" }} />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star key="half" sx={{ color: "#345794", fontSize: "16px" }} />
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <StarBorder
          key={`empty-${i}`}
          sx={{ color: "#E0E0E0", fontSize: "16px" }}
        />
      );
    }

    return stars;
  };

  const renderRatingBar = (rating: number, maxRating: number) => {
    const segments = [];

    for (let i = 1; i <= maxRating; i++) {
      segments.push(
        <Box
          key={i}
          sx={{
            width: `50px`,
            height: `8px`,
            backgroundColor: i <= rating ? "#345794" : "#E8E8E8",
            marginRight: i < maxRating ? "4px" : "0",
            borderRadius: "5px",
          }}
        />
      );
    }

    return <Box sx={{ display: "flex" }}>{segments}</Box>;
  };

  return (
    <>
      <PageHeader title="Client Feedback" onBack={onBack} />

      <Box
        sx={{
          padding: { xs: "10px", sm: "20px" },
          maxWidth: "800px",
          width: "100%",
        }}
      >
        {/* Overall Rating */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "stretch", sm: "flex-start" },
            gap: { xs: "10px", sm: "16px" },
            marginBottom: { xs: "20px", sm: "30px" },
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "32px", sm: "48px" },
              fontWeight: 700,
              color: "#333",
            }}
          >
            {feedback.averageRating.toFixed(1)}
          </Typography>

          <Box
            sx={{ display: "flex", flexDirection: "column", paddingTop: "4px" }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: { xs: "flex-start", sm: "center" },
                gap: "8px",
              }}
            >
              <Typography sx={{ fontSize: "12px", color: "black" }}>
                Based on feedback
              </Typography>
              <Box sx={{ display: "flex" }}>
                {renderStars(feedback.averageRating)}
              </Box>
            </Box>
            <Typography sx={{ fontSize: "12px", color: "black" }}>
              Submitted on {new Date(feedback.createdAt).toLocaleDateString()}
            </Typography>
          </Box>
        </Box>

        {/* Feedback Questions */}
        <Box sx={{ marginBottom: "40px" }}>
          {feedbackQuestions.map((question) => (
            <Box
              key={question.id}
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: { xs: "flex-start", sm: "center" },
                justifyContent: "space-between",
                marginBottom: "16px",
              }}
            >
              <Box sx={{ flex: 1, paddingRight: { sm: "24px" } }}>
                <Typography sx={{ fontSize: "14px", color: "#333" }}>
                  {question.question}
                </Typography>
              </Box>

              <Box sx={{ flexShrink: 0 }}>
                {renderRatingBar(question.rating, question.maxRating)}
              </Box>
            </Box>
          ))}
        </Box>

        {/* Description */}
        <Box>
          <Typography
            sx={{
              fontSize: { xs: "16px", sm: "18px" },
              fontWeight: 600,
              marginBottom: "16px",
              color: "#333",
            }}
          >
            Description
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "13px", sm: "14px" },
              color: "#666",
              lineHeight: "1.6",
              textAlign: "justify",
            }}
          >
            {feedback.description}
          </Typography>
        </Box>
      </Box>
    </>
  );
}
