"use client";

import Image from "next/image";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { CustomButton } from "@/components/shared/CustomButton";
// import { RootState } from "@/store";
// import { useSelector } from "react-redux";

interface EventCardProps {
  title: string;
  date: string;
  imageUrl: string;
  rating?: number;
  totalReviews?: number;
  lastReviewDate?: string;
  Label?: string;
  onViewDetails?: () => void;
}

export function EventCard({
  title,
  date,
  imageUrl,
  // rating,
  // totalReviews,
  // lastReviewDate,
  onViewDetails,
  Label,
}: Readonly<EventCardProps>) {
  // const role = useSelector((state: RootState) => state.userRole.role);

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
        {/* {role==="admin"?
        (<Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Typography variant="h3" sx={{ fontWeight: 600, mr: 2, fontSize: "2.5rem" }}>
            {rating}
          </Typography>
          <Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="caption" color="text.secondary" sx={{ mr: 1 }}>
                Based on {totalReviews} reviews
              </Typography>
              <Rating value={rating} precision={0.1} readOnly size="small" sx={{
                '& .MuiRating-iconFilled': {
                  color: '#345794',
                }
              }} />
            </Box>
            <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
              Last till: {lastReviewDate}
            </Typography>
          </Box>
        </Box>)
        :
        (<></>)
        } */}
        
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
