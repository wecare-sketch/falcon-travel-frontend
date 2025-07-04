"use client";

import { Button, Card, CardContent, Typography, Box } from "@mui/material";

interface CreateEventCardProps {
  onCreateEvent?: () => void;
}

export function CreateEventCard({ onCreateEvent }: CreateEventCardProps) {
  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: 347,
        minHeight: 389,
        border: "3px dashed #1976D2",
        borderRadius: "8px",
        backgroundColor: "transparent",
        boxShadow: "none",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CardContent
        sx={{
          p: 0,
          textAlign: "center",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: 64,
            height: 64,
            mx: "auto",
            mb: 2,
            backgroundColor: "transparent",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src="/images/event.png" alt="Create Event" />
        </Box>

        <Typography
          variant="body1"
          sx={{
            color: "#101010",
            mb: 3,
            fontWeight: 400,
            fontSize: "20px",
            lineHeight: "28px",
            textAlign: "center",
            width: "80%",
            mx: "auto",
          }}
        >
          Request for a new Event by your own choices
        </Typography>

        <Button
          variant="outlined"
          onClick={onCreateEvent}
          fullWidth
          sx={{
            borderColor: "#1976D2",
            color: "#1976D2",
            borderRadius: "6px",
            fontWeight: 500,
            fontSize: "16px",
            textTransform: "none",
            height: "44px",
            maxWidth: 300,
            "&:hover": {
              backgroundColor: "#E3F0FF",
              borderColor: "#1976D2",
              color: "#1976D2",
            },
          }}
        >
          Create Event
        </Button>
      </CardContent>
    </Card>
  );
}
