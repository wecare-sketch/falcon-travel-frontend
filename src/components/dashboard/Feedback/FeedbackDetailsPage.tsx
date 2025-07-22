"use client"

import { Box, Typography } from "@mui/material"
import { Star, StarBorder } from "@mui/icons-material"
import { PageHeader } from "../PageHeader"

interface FeedbackQuestion {
    id: string
    question: string
    rating: number
    maxRating: number
}

interface FeedbackDetailsPageProps {
    eventId: number
    onBack?: () => void
}

const feedbackDetailsDummyData = [
    {
        eventId: 1,
        eventTitle: "Annual Corporate Gala",
        overallRating: 3.7,
        totalReviews: 10,
        lastReviewDate: "Feb 26, 2025",
    },
    {
        eventId: 2,
        eventTitle: "Annual Corporate Gala",
        overallRating: 3.7,
        totalReviews: 15,
        lastReviewDate: "Mar 01, 2025",
    },
];

const feedbackQuestions: FeedbackQuestion[] = [
    {
        id: "1",
        question: "How would you rate the quality of their work in terms of accuracy and attention to detail?",
        rating: 3.5,
        maxRating: 5,
    },
    {
        id: "2",
        question: "Did the employee consistently meet deadlines and project goals?",
        rating: 2.5,
        maxRating: 5,
    },
    {
        id: "3",
        question: "How would you rate their communication?",
        rating: 4.0,
        maxRating: 5,
    },
    {
        id: "4",
        question: "How would you rate the employee's ability to identify and solve problems?",
        rating: 3.0,
        maxRating: 5,
    },
    {
        id: "5",
        question: "How well did the employee handle challenges or unexpected issues?",
        rating: 4.5,
        maxRating: 5,
    },
]

export function FeedbackDetailsPage({ eventId, onBack }: FeedbackDetailsPageProps) {
    const eventDetails = feedbackDetailsDummyData.find(e => e.eventId === eventId);
    if (!eventDetails) return null;
    const { overallRating, lastReviewDate } = eventDetails;

    const renderStars = (rating: number) => {
        const stars = []
        const fullStars = Math.floor(rating)
        const hasHalfStar = rating % 1 !== 0

        // Add full stars
        for (let i = 0; i < fullStars; i++) {
            stars.push(
                <Star
                    key={`full-${i}`}
                    sx={{
                        color: "#345794",
                        fontSize: "16px",
                    }}
                />,
            )
        }

        // Add half star if needed
        if (hasHalfStar) {
            stars.push(
                <Star
                    key="half"
                    sx={{
                        color: "#345794",
                        fontSize: "16px",
                    }}
                />,
            )
        }

        // Add empty stars
        const remainingStars = 5 - Math.ceil(rating)
        for (let i = 0; i < remainingStars; i++) {
            stars.push(
                <StarBorder
                    key={`empty-${i}`}
                    sx={{
                        color: "#E0E0E0",
                        borderColor: "#345794",
                        fontSize: "16px",
                    }}
                />,
            )
        }

        return stars
    }

    const renderRatingBar = (rating: number, maxRating: number) => {
        const segments = []
        const segmentWidth = 50 // Fixed width for each segment
        const segmentHeight = 8

        for (let i = 1; i <= maxRating; i++) {
            // const isActive = i <= Math.ceil(rating)
            const isFilled = i <= rating

            segments.push(
                <Box
                    key={i}
                    sx={{
                        width: `${segmentWidth}px`,
                        height: `${segmentHeight}px`,
                        backgroundColor: isFilled ? "#345794" : "#E8E8E8",
                        marginRight: i < maxRating ? "4px" : "0",
                        borderRadius: "5px",
                    }}
                />,
            )
        }

        return (
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0px",
                }}
            >
                {segments}
            </Box>
        )
    }

    return (
        <>
            <PageHeader title="clients Feedback" onBack={onBack} />

            <Box
                sx={{
                    padding: { xs: "10px", sm: "20px" },
                    maxWidth: "800px",
                    width: "100%",
                }}
            >
                {/* Overall Rating Section */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        alignItems: { xs: "stretch", sm: "flex-start" },
                        gap: { xs: "10px", sm: "16px" },
                        marginBottom: { xs: "20px", sm: "30px" }
                    }}
                >
                    {/* Large Rating Number */}
                    <Typography
                        variant="h1"
                        sx={{
                            fontSize: { xs: "32px", sm: "48px" },
                            fontWeight: 700,
                            color: "#333",
                            lineHeight: "1",
                            marginRight: "8px",
                        }}
                    >
                        {overallRating.toFixed(1)}
                    </Typography>

                    {/* Stars and Text */}
                    <Box sx={{ display: "flex", flexDirection: "column", paddingTop: "4px", width: "100%" }}>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: { xs: "column", sm: "row" },
                                alignItems: { xs: "flex-start", sm: "center" },
                                gap: { xs: "4px", sm: "10px" },
                                marginBottom: { xs: "4px", sm: 0 },
                            }}
                        >
                            <Typography
                                variant="body2"
                                sx={{
                                    color: "black",
                                    fontSize: { xs: "11px", sm: "12px" },
                                    marginBottom: { xs: "2px", sm: 0 },
                                    lineHeight: "1.2",
                                }}
                            >
                                Based on all reviews
                            </Typography>
                            <Box sx={{ display: "flex", alignItems: "center", gap: "2px", marginLeft: { xs: 0, sm: "10px" } }}>
                                {renderStars(overallRating)}
                            </Box>
                        </Box>
                        <Typography
                            variant="body2"
                            sx={{
                                color: "black",
                                fontSize: { xs: "11px", sm: "12px" },
                                lineHeight: "1.2",
                            }}
                        >
                            Last till {lastReviewDate}
                        </Typography>
                    </Box>
                </Box>

                {/* Rating Questions with Bars on Right */}
                <Box sx={{ marginBottom: { xs: "24px", sm: "40px" } }}>
                    {feedbackQuestions.map((question) => (
                        <Box
                            key={question.id}
                            sx={{
                                display: "flex",
                                flexDirection: { xs: "column", sm: "row" },
                                alignItems: { xs: "flex-start", sm: "center" },
                                justifyContent: "space-between",
                                marginBottom: { xs: "16px", sm: "16px" },
                                "&:last-child": {
                                    marginBottom: 0,
                                },
                            }}
                        >
                            {/* Question Text - Left Side */}
                            <Box sx={{ flex: 1, paddingRight: { xs: 0, sm: "24px" }, marginBottom: { xs: "8px", sm: 0 } }}>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        color: "#333",
                                        fontSize: { xs: "13px", sm: "14px" },
                                        lineHeight: "1.4",
                                        fontWeight: 400,
                                    }}
                                >
                                    {question.question}
                                </Typography>
                            </Box>

                            {/* Rating Bar - Right Side */}
                            <Box sx={{ flexShrink: 0 }}>{renderRatingBar(question.rating, question.maxRating)}</Box>
                        </Box>
                    ))}
                </Box>

                {/* Add Description Section */}
                <Box>
                    <Typography
                        variant="h6"
                        sx={{
                            color: "#333",
                            fontSize: { xs: "16px", sm: "18px" },
                            fontWeight: 600,
                            marginBottom: "16px",
                        }}
                    >
                        Add Description
                    </Typography>

                    <Typography
                        variant="body1"
                        sx={{
                            color: "#666",
                            fontSize: { xs: "13px", sm: "14px" },
                            lineHeight: "1.6",
                            textAlign: "justify",
                        }}
                    >
                        There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in
                        some form, by injected humour, or randomised words which don&apos;t look even slightly believable. If you are
                        going to use a passage of Lorem Ipsum, you need to be sure there isn&apos;t anything embarrassing.
                    </Typography>
                </Box>
            </Box>
        </>
    )
}
