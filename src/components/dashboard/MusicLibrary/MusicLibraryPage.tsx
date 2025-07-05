"use client"

import { PageHeader } from "../PageHeader"
import { SearchFilters } from "../SearchFilter"
import { Box } from "@mui/material"
import { MusicEventCard } from "./MusicEventCard"

const musicEvents = [
  {
    id: 1,
    title: "Summer Beach Party",
    date: "Dec 24, 2023",
    host: "Beach Club Miami",
    trackCount: 12,
    imageUrl: "/images/music1.png?height=200&width=400",
    musicList: [
      { id: "1", title: "Summer Vibes", artist: "DJ Wave" },
      { id: "2", title: "Midnight Dreams", artist: "Luna" },
      { id: "3", title: "Dancing in the Rain", artist: "The Groove" },
    ],
    personalMessages: [
      { id: "4", title: "Summer Vibes", artist: "DJ Wave" },
      { id: "5", title: "Midnight Dreams", artist: "Luna" },
    ],
  },
  {
    id: 2,
    title: "Summer Beach Party",
    date: "Dec 24, 2023",
    host: "Beach Club Miami",
    trackCount: 12,
    imageUrl: "/images/music2.png?height=200&width=400",
    musicList: [
      { id: "6", title: "Summer Vibes", artist: "DJ Wave" },
      { id: "7", title: "Midnight Dreams", artist: "Luna" },
      { id: "8", title: "Dancing in the Rain", artist: "The Groove" },
    ],
    personalMessages: [
      { id: "9", title: "Summer Vibes", artist: "DJ Wave" },
      { id: "10", title: "Midnight Dreams", artist: "Luna" },
    ],
  },
  {
    id: 3,
    title: "Summer Beach Party",
    date: "Dec 24, 2023",
    host: "Beach Club Miami",
    trackCount: 12,
    imageUrl: "/images/music3.png?height=200&width=400",
    musicList: [
      { id: "11", title: "Summer Vibes", artist: "DJ Wave" },
      { id: "12", title: "Midnight Dreams", artist: "Luna" },
      { id: "13", title: "Dancing in the Rain", artist: "The Groove" },
    ],
    personalMessages: [
      { id: "14", title: "Summer Vibes", artist: "DJ Wave" },
      { id: "15", title: "Midnight Dreams", artist: "Luna" },
    ],
  },
]

export function MusicLibraryPage() {
  const handleSearch = (query: string, host: string, eventType: string) => {
    console.log("Music search:", { query, host, eventType })
  }

  const handleAddToMusicList = (eventId: number) => {
    console.log("Add to music list for event:", eventId)
  }

  const handleAddToPersonalMessages = (eventId: number) => {
    console.log("Add to personal messages for event:", eventId)
  }

  const handlePlaySong = (songId: string, listType: "music" | "personal") => {
    console.log("Play song:", songId, "from", listType)
  }

  const handleLikeSong = (songId: string, listType: "music" | "personal") => {
    console.log("Like song:", songId, "from", listType)
  }

  return (
    <div>
      <PageHeader title="Add Music into Specific event" />
      <SearchFilters onSearch={handleSearch} />
      <Box
        sx={{
          marginTop: "24px",
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          },
          gap: "16px",
          justifyItems: "center",
        }}
      >
        {musicEvents.map((event) => (
          <MusicEventCard
            key={event.id}
            title={event.title}
            date={event.date}
            host={event.host}
            trackCount={event.trackCount}
            imageUrl={event.imageUrl}
            musicList={event.musicList}
            personalMessages={event.personalMessages}
            onAddToMusicList={() => handleAddToMusicList(event.id)}
            onAddToPersonalMessages={() => handleAddToPersonalMessages(event.id)}
            onPlaySong={handlePlaySong}
            onLikeSong={handleLikeSong}
          />
        ))}
      </Box>
    </div>
  )
}
