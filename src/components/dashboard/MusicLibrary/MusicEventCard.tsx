"use client";

import Image from "next/image";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { MusicListSection } from "./MusicListSection";
import HeadphonesIcon from '@mui/icons-material/Headphones';

interface Song {
  id: string;
  title: string;
  artist: string;
  isPlaying?: boolean;
  isLiked?: boolean;
}

interface MusicEventCardProps {
  title: string;
  date: string;
  host: string;
  trackCount: number;
  imageUrl: string;
  musicList: Song[];
  personalMessages: Song[];
  onAddToMusicList?: () => void;
  onAddToPersonalMessages?: () => void;
  onPlaySong?: (songId: string, listType: "music" | "personal") => void;
  onLikeSong?: (songId: string, listType: "music" | "personal") => void;
}

export function MusicEventCard({
  title,
  date,
  host,
  trackCount,
  imageUrl,
  musicList,
  personalMessages,
  onAddToMusicList,
  onAddToPersonalMessages,
  onPlaySong,
  onLikeSong,
}: Readonly<MusicEventCardProps>) {
  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: "400px",
        boxShadow: 2,
        border: "1px solid #e0e0e0",
        borderRadius: "12px",
      }}
    >
      <Box sx={{ position: "relative", height: 200, margin: 2 }}>
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          fill
          style={{ objectFit: "cover", borderRadius: "8px" }}
        />
      </Box>

      <CardContent sx={{ padding: "16px" }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            fontSize: "16px",
            marginBottom: "4px",
            color: "#333",
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: "#666",
            fontSize: "13px",
            marginBottom: "4px",
          }}
        >
          {date}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: "#666",
            fontSize: "13px",
            marginBottom: "4px",
          }}
        >
          Host: {host}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: "#666",
            fontSize: "13px",
            marginBottom: "16px",
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <Box
            component="span"
            sx={{
              width: 16,
              height: 16,
              backgroundColor: "#4A5F8A",
              borderRadius: "2px",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "10px",
              fontWeight: "bold",
            }}
          >
            <HeadphonesIcon sx={{ fontSize: 15,color:"black",backgroundColor:"white" }} />
          </Box>
          {trackCount} tracks
        </Typography>

        <MusicListSection
          title="Music List"
          songs={musicList}
          onAddSong={onAddToMusicList}
          onPlaySong={(songId) => onPlaySong?.(songId, "music")}
          onLikeSong={(songId) => onLikeSong?.(songId, "music")}
        />

        <MusicListSection
          title="Personal Message"
          songs={personalMessages}
          onAddSong={onAddToPersonalMessages}
          onPlaySong={(songId) => onPlaySong?.(songId, "personal")}
          onLikeSong={(songId) => onLikeSong?.(songId, "personal")}
          backgroundColor="#F5F5F5"
        />
      </CardContent>
    </Card>
  );
}
