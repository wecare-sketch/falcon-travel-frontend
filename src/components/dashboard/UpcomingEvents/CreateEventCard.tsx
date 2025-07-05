"use client";

import { CustomButton } from "@/components/shared/CustomButton";
import { Card, CardContent, Typography, Box } from "@mui/material";
import Image from "next/image";

interface CreateEventCardProps {
  onCreateEvent?: () => void;
}

export function CreateEventCard({
  onCreateEvent,
}: Readonly<CreateEventCardProps>) {
  return (
    <Card
      sx={{
        width: "100%",
        borderRadius: "8px",
        backgroundColor: "transparent",
        boxShadow: "none",
        position: "relative", // important for ::before
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 2,

        // Remove default border
        border: "none",

        // Add ::before for custom dashed border
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: "8px",
          padding: "1px", // prevents clipping
          pointerEvents: "none",
          zIndex: 1,
          backgroundImage:
            "repeating-linear-gradient(to right, #1976D2 0 10px, transparent 10px 16px), \
         repeating-linear-gradient(to bottom, #1976D2 0 10px, transparent 10px 16px), \
         repeating-linear-gradient(to right, #1976D2 0 10px, transparent 10px 16px), \
         repeating-linear-gradient(to bottom, #1976D2 0 10px, transparent 10px 16px)",
          backgroundPosition: "top left, top right, bottom left, top left",
          backgroundRepeat: "no-repeat",
          backgroundSize:
            "calc(100% - 3px) 2px, 2px calc(100% - 3px), calc(100% - 3px) 2px, 2px calc(100% - 3px)",
        },
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
          <Image
            src="/images/event.png"
            alt="Create Event"
            width={64}
            height={64}
          />
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

        <CustomButton
          label="Create Event"
          onClick={onCreateEvent}
          width="80%"
          height="40px"
          inverted
        />
      </CardContent>
    </Card>
  );
}
