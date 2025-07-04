"use client"

import { Play, Pause, Heart, Trash2 } from "lucide-react"
import { IconButton, Box, Typography } from "@mui/material"
import { useState } from "react"

interface SongItemProps {
    title: string
    artist: string
    isPlaying?: boolean
    isLiked?: boolean
    onPlay?: () => void
    onLike?: () => void
}

export function SongItem({ title, artist, isPlaying = false, isLiked = false, onPlay, onLike }: SongItemProps) {
    const [playing, setPlaying] = useState(isPlaying)
    const [liked, setLiked] = useState(isLiked)

    const handlePlay = () => {
        setPlaying(!playing)
        onPlay?.()
    }

    const handleLike = () => {
        setLiked(!liked)
        onLike?.()
    }

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "8px 0",
                borderBottom: "1px solid #f0f0f0",
                "&:last-child": {
                    borderBottom: "none",
                },
            }}
        >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, flex: 1 }}>


                <Typography
                    variant="body2"
                    sx={{
                        fontSize: "13px",
                        color: "#333",
                        flex: 1,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                    }}
                >
                    {title} - {artist}
                </Typography>
            </Box>

            <IconButton
                size="small"
                onClick={handlePlay}
                sx={{
                    width: 24,
                    height: 24,
                    border: "1px solid #4A5F8A",
                    borderRadius: "50%",
                    backgroundColor: playing ? "#4A5F8A" : "transparent",
                    color: playing ? "white" : "#666",
                    padding: 0,
                    "&:hover": {
                        backgroundColor: playing ? "#3A4F7A" : "#f0f0f0",
                    },
                }}
            >
                {playing ? <Pause size={12} /> : <Play size={12} />}
            </IconButton>
            <IconButton
                size="small"
                onClick={() => {/* handle delete here */}}
                sx={{
                    width: 24,
                    height: 24,
                    padding: 0,
                    marginLeft: "8px",
                    background: "transparent",
                    "&:hover": {
                        backgroundColor: "rgba(255,71,87,0.08)",
                    },
                }}
            >
                <img src="/images/bin.png" alt="Delete" style={{ width: 16, height: 16, display: "block" }} />
            </IconButton>
        </Box>
    )
}
