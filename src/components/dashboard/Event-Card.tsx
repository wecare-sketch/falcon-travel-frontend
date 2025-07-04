"use client";

import Image from "next/image";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

interface EventCardProps {
  title: string;
  date: string;
  imageUrl: string;
  onViewDetails?: () => void;
}

export function EventCard({
  title,
  date,
  imageUrl,
  onViewDetails,
}: EventCardProps) {
  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: 347,
        height: "100%",
        minHeight: 389,
        boxShadow: 2,
        border: "1px solid #00000029",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* Image Section */}
      <CardMedia
        sx={{
          position: "relative",
          width: 280,
          height:212,
          mx:"auto",
          mt:2
        }}
      >
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          fill
          style={{ objectFit: "cover" }}
        />
      </CardMedia>

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
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 2 }}
        >
          {date}
        </Typography>
        <Button
          variant="contained"
          fullWidth
          onClick={onViewDetails}
          sx={{
            backgroundColor: "#4A5F8A",
            textTransform: "none",
            fontWeight: 500,
            fontSize: "15px",
            "&:hover": {
              backgroundColor: "#3A4F7A",
            },
          }}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}
