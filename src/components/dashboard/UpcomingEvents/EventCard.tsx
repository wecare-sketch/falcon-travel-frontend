"use client";

import Image from "next/image";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { CustomButton } from "@/components/shared/CustomButton";
import { Star, StarBorder } from "@mui/icons-material";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

interface EventCardProps {
  title: string;
  date: string;
  imageUrl: string;
  rating?: number;
  totalReviews?: number;
  lastReviewDate?: string;
  Label?: string;
  onViewDetails?: () => void;
  averageRating?: number;
  createdAt?: string;
}

export function EventCard({
  title,
  date,
  imageUrl,
  averageRating,
  createdAt,
  onViewDetails,
  Label,
}: Readonly<EventCardProps>) {
  const role = useSelector((state: RootState) => state.userRole.role);
  const rating = averageRating ?? 0;

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
        {/* Rating Row */}
        {role === "admin" ? (
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
              {rating.toFixed(1)}
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                paddingTop: "20px",
              }}
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
                  Based on all reviews
                </Typography>
                <Box sx={{ display: "flex" }}>{renderStars(rating)}</Box>
              </Box>
              {createdAt && Number(createdAt) !== 0 && (
                <Typography sx={{ fontSize: "12px", color: "black" }}>
                  Last till: {new Date(createdAt).toLocaleDateString()}
                </Typography>
              )}
            </Box>
          </Box>
        ) : (
          <></>
        )}

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
