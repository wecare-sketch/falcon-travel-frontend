"use client";

import Image from "next/image";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { CustomButton } from "@/components/shared/CustomButton";

interface EventCardProps {
  title: string;
  date: string;
  imageUrl: string;
  Label?:string;
  onViewDetails?: () => void;
}

export function EventCard({
  title,
  date,
  imageUrl,
  onViewDetails,
  Label,
}: Readonly<EventCardProps>) {
  return (
    <Card
      sx={{
        width: "100%",
        height: "100%",
        boxShadow: 2,
        border: "1px solid #00000029",
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* Image Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 3,
        }}
      >
        <CardMedia
          component="div"
          sx={{
            position: "relative",
            width: "85%",
            aspectRatio: "4 / 3",
          }}
        >
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={title}
            fill
            style={{ objectFit: "cover", borderRadius: 8 }}
            sizes="(max-width: 600px) 100vw, 33vw"
          />
        </CardMedia>
      </Box>

      {/* Content */}
      <CardContent sx={{ px: 2 }}>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{ fontWeight: 600 }}
        >
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {date}
        </Typography>
        <CustomButton
          label={Label}
          onClick={onViewDetails}
          width="100%"
          height="40px"
        />
      </CardContent>
    </Card>
  );
}
