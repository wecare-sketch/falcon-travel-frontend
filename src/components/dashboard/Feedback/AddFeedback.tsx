import React, { useState, useEffect } from "react";
import { Box, Typography,TextField } from "@mui/material";
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import { PageHeader } from "../PageHeader";
import { CustomButton } from "../../shared/CustomButton";


const feedbackQuestions = [
  "long established fact that a reader will be distracted by the readable content of a page",
  "long established fact that a reader.",
  "long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
  "long established fact that a reader will be distracted by the readable",
  "long established fact that a reader will be distracted"
];

const emojiIcons = [
  <SentimentVeryDissatisfiedIcon key="very-dissatisfied" fontSize="large" />,
  <SentimentDissatisfiedIcon key="dissatisfied" fontSize="large" />,
  <SentimentNeutralIcon key="neutral" fontSize="large" />,
  <SentimentSatisfiedIcon key="satisfied" fontSize="large" />,
  <SentimentVerySatisfiedIcon key="very-satisfied" fontSize="large" />
];

interface AddFeedbackProps {
  eventId: number;
}

export default function AddFeedback({ eventId }: AddFeedbackProps) {
  const [feedback, setFeedback] = useState<{ eventId: number; text: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [ratings, setRatings] = useState<number[]>(Array(feedbackQuestions.length).fill(0));
  const [description, setDescription] = useState("");

  useEffect(() => {
    async function fetchFeedbackForEvent(id: number) {
      setTimeout(() => {
        setFeedback({ eventId: id, text: "Sample feedback for event " + id });
        console.log("Loaded feedback:", feedback);
        setLoading(false);
      }, 500);
    }

    fetchFeedbackForEvent(eventId);
  }, [eventId]);

  const handleRating = (questionIdx: number, value: number) => {
    const newRatings = [...ratings];
    newRatings[questionIdx] = value;
    setRatings(newRatings);
  };

  if (loading) return <div>Loading feedback...</div>;

  return (
    <>
      <PageHeader
        title="Add Event FeedBack"
        headerContent={
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 35px)",
              justifyContent: "flex-end",
              gap: 1.5
            }}
          >
            {emojiIcons.map((icon, idx) => (
              <Box
                key={idx}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
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
                  gap: 1
                }}
              >
                <Typography
                  sx={{
                    flex: 1,
                    fontSize: 15,
                    mb: { xs: 1, sm: 0 },
                    textAlign: { xs: "left", sm: "inherit" }
                  }}
                >
                  {q}
                </Typography>

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(5, 35px)",
                    gap: 2
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
                        transition: "background 0.2s"
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </li>
          ))}
        </ul>
      </Box>

      <Typography sx={{ mt: 3, mb: 1, fontWeight: 400, color: "#212121", fontSize: "20px" }}>
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
          gap: 2
        }}
      >
        <CustomButton
          label="Cancel"
          inverted
          width={typeof window !== 'undefined' && window.innerWidth < 600 ? "100%" : "150px"}
          sx={{
            border: "1px solid #00000029",
            color: "#345794"
          }}
        />
        <CustomButton
          label="Submit Feedback"
          width={typeof window !== 'undefined' && window.innerWidth < 600 ? "100%" : "230px"}
          sx={{
            background: "#345794"
          }}
        />
      </Box>
    </>
  );
}
