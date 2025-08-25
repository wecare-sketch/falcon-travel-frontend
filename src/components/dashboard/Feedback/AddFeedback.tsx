"use client";

import React, { useState } from "react";
import { Box, Typography, TextField } from "@mui/material";
import {
  SentimentVeryDissatisfied as VeryDissatisfied,
  SentimentDissatisfied as Dissatisfied,
  SentimentNeutral as Neutral,
  SentimentSatisfied as Satisfied,
  SentimentVerySatisfied as VerySatisfied,
} from "@mui/icons-material";

import { PageHeader } from "../PageHeader";
import { CustomButton } from "@/components/shared/CustomButton";
import { FeedbackSuccessDialog } from "./FeedbackSuccessDialog";
import { useSubmitFeedback } from "@/hooks/events/useSubmitFeedback";
import toast from "react-hot-toast";

const feedbackQuestions = [
  "long established fact that a reader will be distracted by the readable content of a page",
  "long established fact that a reader.",
  "long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
  "long established fact that a reader will be distracted by the readable",
  "long established fact that a reader will be distracted",
];

const emojiIcons = [
  <VeryDissatisfied
    key="very-dissatisfied"
    fontSize="large"
    sx={{ color: "black" }}
  />,
  <Dissatisfied key="dissatisfied" fontSize="large" sx={{ color: "black" }} />,
  <Neutral key="neutral" fontSize="large" sx={{ color: "black" }} />,
  <Satisfied key="satisfied" fontSize="large" sx={{ color: "black" }} />,
  <VerySatisfied
    key="very-satisfied"
    fontSize="large"
    sx={{ color: "black" }}
  />,
];

interface AddFeedbackProps {
  eventId: string;
  setActiveView: (view: string) => void;
  setSelectedEventId: (id: string) => void;
  setSelectedEventSlug: (slug: string | null) => void;
}

export default function AddFeedback({
  eventId,
  setActiveView,
  setSelectedEventId,
  setSelectedEventSlug,
}: AddFeedbackProps) {
  const [ratings, setRatings] = useState<number[]>(
    Array(feedbackQuestions.length).fill(0)
  );
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);

  const { mutate: submitFeedback, isPending } = useSubmitFeedback(eventId);

  const handleRating = (questionIdx: number, value: number) => {
    const newRatings = [...ratings];
    newRatings[questionIdx] = value;
    setRatings(newRatings);
  };

  const handleSubmit = () => {
    const avg =
      ratings.reduce((acc, cur) => acc + cur, 0) / feedbackQuestions.length;

    const payload = {
      Q1: ratings[0],
      Q2: ratings[1],
      Q3: ratings[2],
      Q4: ratings[3],
      Q5: ratings[4],
      avg: parseFloat(avg.toFixed(2)),
      description,
    };

    submitFeedback(payload, {
      onSuccess: () => {
        setOpen(true);
        setDescription("");
        setRatings(Array(feedbackQuestions.length).fill(0));
         setSelectedEventSlug(null);
         setSelectedEventId("");
        setActiveView("Feedback");
      },

      onError: (err) => {
        console.error("Feedback submission failed", err);
        toast.error("Feedback already submitted");
        
      },
    });
  };
  const handlebackfeedback = () => {
    setSelectedEventSlug(null);
    setSelectedEventId("");
    setActiveView("Feedback");
  };
  return (
    <>
      <PageHeader
        onBack={handlebackfeedback}
        title="Add Event FeedBack"
        headerContent={
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 35px)",
              justifyContent: "flex-end",
              gap: 1.5,
            }}
          >
            {emojiIcons.map((icon, idx) => (
              <Box
                key={idx}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {icon}
              </Box>
            ))}
          </Box>
        }
      />

      <Box>
        <ul style={{ paddingLeft: 20, paddingRight: 10 }}>
          {feedbackQuestions.map((q, idx) => (
            <li key={idx} style={{ listStyleType: "disc", marginBottom: 16 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: 1,
                }}
              >
                <Typography
                  sx={{
                    flex: 1,
                    fontSize: 15,
                    mb: { xs: 1, sm: 0 },
                    color: "black",
                    textAlign: { xs: "left", sm: "inherit" },
                  }}
                >
                  {q}
                </Typography>

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(5, 35px)",
                    gap: 2,
                  }}
                >
                  {[1, 2, 3, 4, 5].map((val) => (
                    <Box
                      key={val}
                      onClick={() => handleRating(idx, val)}
                      sx={{
                        width: 35,
                        height: 35,
                        background: ratings[idx] >= val ? "#23407c" : "#e0e3ea",
                        borderRadius: 1,
                        cursor: "pointer",
                        transition: "background 0.2s",
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </li>
          ))}
        </ul>
      </Box>

      <Typography
        sx={{
          mt: 3,
          mb: 1,
          fontWeight: 400,
          color: "#212121",
          fontSize: "20px",
        }}
      >
        Add Description
      </Typography>
      <TextField
        fullWidth
        multiline
        minRows={4}
        placeholder="Write a review of the employee..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        sx={{ mb: 3 }}
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "flex-end",
          justifyContent: "flex-end",
          gap: 2,
        }}
      >
        <CustomButton
          label="Cancel"
          inverted
          width={
            typeof window !== "undefined" && window.innerWidth < 600
              ? "100%"
              : "150px"
          }
          sx={{
            border: "1px solid #00000029",
            color: "#345794",
          }}
          onClick={handlebackfeedback}
        />
        <CustomButton
          label={isPending ? "Submitting..." : "Submit Feedback"}
          disabled={isPending}
          width={
            typeof window !== "undefined" && window.innerWidth < 600
              ? "100%"
              : "230px"
          }
          sx={{
            background: "#345794",
          }}
          onClick={handleSubmit}
        />
      </Box>

      <FeedbackSuccessDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
}
