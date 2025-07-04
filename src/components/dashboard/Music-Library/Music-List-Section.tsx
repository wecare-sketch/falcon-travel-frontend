"use client"

import { Box, Typography, Button } from "@mui/material"
import { Plus } from "lucide-react"
import { SongItem } from "./Song-Item"

interface Song {
  id: string
  title: string
  artist: string
  isPlaying?: boolean
  isLiked?: boolean
}

interface MusicListSectionProps {
  title: string
  songs: Song[]
  onAddSong?: () => void
  onPlaySong?: (songId: string) => void
  onLikeSong?: (songId: string) => void
  backgroundColor?: string
}

export function MusicListSection({ title, songs, onAddSong, onPlaySong, onLikeSong, backgroundColor }: MusicListSectionProps) {
  return (
    <Box
      sx={{
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        padding: "12px",
        marginBottom: "16px",
        backgroundColor: backgroundColor || "#fff",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "12px",
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 600,
            fontSize: "14px",
            color: "#333",
          }}
        >
          {title}
        </Typography>

        <Button
          size="small"
          onClick={onAddSong}
          variant="contained"
          startIcon={<Plus size={14} />}
          sx={{
            height: 26,
            width: 36,
            backgroundColor: "#345794",
            color: "white",
            textTransform: "none",
            fontSize: "14px",
            minWidth: "auto",
            padding: 0,
            justifyContent: "center", // centers the icon horizontally
            "& .MuiButton-startIcon": {
              margin: 0, // removes default left margin
            },
            "&:hover": {
              backgroundColor: "#3A4F7A",
            },
          }}
        >
        </Button>

      </Box>

      <Box sx={{ maxHeight: "120px", overflowY: "auto" }}>
        {songs.map((song) => (
          <SongItem
            key={song.id}
            title={song.title}
            artist={song.artist}
            isPlaying={song.isPlaying}
            isLiked={song.isLiked}
            onPlay={() => onPlaySong?.(song.id)}
            onLike={() => onLikeSong?.(song.id)}
          />
        ))}
      </Box>
    </Box>
  )
}
