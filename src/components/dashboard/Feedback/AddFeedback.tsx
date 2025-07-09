import React, { useState } from "react";
import { Box, Typography, Button, TextField } from "@mui/material";
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import { PageHeader } from "../PageHeader";

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

export default function AddFeedback() {
  const [ratings, setRatings] = useState<number[]>(Array(feedbackQuestions.length).fill(0));
  const [description, setDescription] = useState("");

  const handleRating = (questionIdx: number, value: number) => {
    const newRatings = [...ratings];
    newRatings[questionIdx] = value;
    setRatings(newRatings);
  };

  return (
    <>
      <PageHeader title="Add Event FeedBack" />

      {/* Emoji Icons */}
      <Box
        sx={{
          display: "flex",
          justifyContent: { xs: "center", sm: "flex-end" },
          flexWrap: "wrap",
          gap: 2,
          position: "relative",
          top: { xs: 0, sm: "-60px" },
          mb: { xs: 2, sm: 0 }
        }}
      >
        {emojiIcons.map((icon, idx) => (
          <Box key={idx}>{icon}</Box>
        ))}
      </Box>

      {/* Questions List */}
      <Box>
        <ul style={{ paddingLeft: 20 }}>
          {feedbackQuestions.map((q, idx) => (
            <li key={idx} style={{ listStyleType: "disc", marginBottom: 16 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: { xs: 1, sm: 0 }
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
                <Box sx={{ display: "flex", gap: 2 }}>
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

      {/* Description Field */}
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

      {/* Buttons */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "flex-end",
          justifyContent: "flex-end",
          gap: 2
        }}
      >
        <Button
          variant="outlined"
          sx={{
            width: { xs: "100%", sm: "150px" },
            border: "1px solid #00000029",
            color: "#345794"
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          sx={{
            width: { xs: "100%", sm: "230px" },
            background: "#345794"
          }}
        >
          Submit Feedback
        </Button>
      </Box>
    </>
  );
}
