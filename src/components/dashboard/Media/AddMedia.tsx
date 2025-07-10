"use client"

import type React from "react"

import { useState } from "react"
import { Box, Typography, Tabs, Tab, IconButton,Button } from "@mui/material"
import { Upload,Heart, Edit, Trash2 } from "lucide-react"
import { PageHeader } from "../PageHeader"
import Image from "next/image"
import { SearchFilters } from "../SearchFilter"

interface MediaFile {
  id: string
  name: string
  size: string
  type: "image" | "video" | "document"
  url: string
  isLiked?: boolean
}

interface MediaUploadPageProps {
  onBack?: () => void
  onUpload?: (files: MediaFile[]) => void
}

const sampleImages: MediaFile[] = [
  {
    id: "1",
    name: "Image 1.jpg",
    size: "3.2 MB",
    type: "image",
    url: "/images/img1.png?height=200&width=300",
    isLiked: false,
  },
  {
    id: "2",
    name: "Image 2.jpg",
    size: "3.2 MB",
    type: "image",
    url: "/images/img2.png?height=200&width=300",
    isLiked: false,
  },
  {
    id: "3",
    name: "Image 3.jpg",
    size: "3.2 MB",
    type: "image",
    url: "/images/img3.png?height=200&width=300",
    isLiked: false,
  },
  {
    id: "4",
    name: "Image 4.jpg",
    size: "3.2 MB",
    type: "image",
    url: "/images/img4.png?height=200&width=300",
    isLiked: false,
  },
]

export function MediaUploadPage({ onBack, onUpload }: MediaUploadPageProps) {
  const [activeTab, setActiveTab] = useState(0)
  const [uploadedFiles, setUploadedFiles] = useState<MediaFile[]>(sampleImages)
  const [isDragOver, setIsDragOver] = useState(false)

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const files = Array.from(e.dataTransfer.files)
    handleFileUpload(files)
  }

  const handleFileUpload = (files: File[]) => {
    // Handle file upload logic here
    console.log("Uploading files:", files)
  }

  const handleClick = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.multiple = true
    input.accept = activeTab === 0 ? "image/*" : activeTab === 1 ? "video/*" : "*"
    input.onchange = (e) => {
      const target = e.target as HTMLInputElement
      if (target.files) {
        handleFileUpload(Array.from(target.files))
      }
    }
    input.click()
  }

  const handleLikeToggle = (fileId: string) => {
    setUploadedFiles((prev) => prev.map((file) => (file.id === fileId ? { ...file, isLiked: !file.isLiked } : file)))
  }

  const handleEdit = (fileId: string) => {
    console.log("Edit file:", fileId)
  }

  const handleDelete = (fileId: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== fileId))
  }

  const handleCancel = () => {
    onBack?.()
  }

  const handleUploadAll = () => {
    onUpload?.(uploadedFiles)
    onBack?.()
  }

  const tabLabels = ["Images", "Videos", "Documents"]

  return (
    <>
      <PageHeader title="Add Media for Events" onBack={onBack} />
      <SearchFilters />
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: "12px",
          padding: "10px",
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: "#E0E0E0",
        }}
      >
        {/* Tabs */}
        <Box sx={{ overflowX: 'auto', whiteSpace: 'nowrap', mb: '24px' }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            sx={{
              minWidth: 300,
              "& .MuiTabs-indicator": {
                backgroundColor: "#4A5F8A",
                height: "3px",
              },
              "& .MuiTab-root": {
                textTransform: "none",
                fontSize: "16px",
                fontWeight: 500,
                color: "#666",
                minWidth: 120,
                "&.Mui-selected": {
                  color: "#4A5F8A",
                  fontWeight: 600,
                },
              },
            }}
            variant="scrollable"
            scrollButtons="auto"
          >
            {tabLabels.map((label, index) => (
              <Tab key={index} label={label} />
            ))}
          </Tabs>
        </Box>

        {/* Upload Area */}
        <Box
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          sx={{
            border: isDragOver ? "2px dashed #4A5F8A" : "2px dashed #E0E0E0",
            borderRadius: "8px",
            padding: "48px 24px",
            textAlign: "center",
            cursor: "pointer",
            backgroundColor: isDragOver ? "#F5F7FA" : "#FAFBFC",
            transition: "all 0.2s ease",
            marginBottom: "32px",
            "&:hover": {
              borderColor: "#4A5F8A",
              backgroundColor: "#F5F7FA",
            },
          }}
        >
          <Box
            sx={{
              width: "64px",
              height: "64px",
              backgroundColor: "#F0F4FF",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px",
            }}
          >
            <Image src="/images/upload.png" alt="upload" width={36} height={36}/>
          </Box>

          <Typography
            variant="h6"
            sx={{
              color: "#000000",
              fontWeight: 500,
              fontSize: "16px",
              marginBottom: "8px",
            }}
          >
            Click or drag files to this area to upload
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: "#6B7280",
              fontSize: "14px",
              maxWidth: "800px",
              margin: "0 auto",
            }}
          >
            Support for a single or bulk upload. Strictly prohibited from uploading company data or other banned files.
          </Typography>
        </Box>

        {/* Uploaded Files Grid */}
        {uploadedFiles.length > 0 && (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                lg: "repeat(4, 1fr)"
              },
              gap: "10px",
              marginBottom: "32px",
            }}
          >
            {uploadedFiles.map((file) => (
              <Box
                key={file.id}
                sx={{
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderColor: "#E0E0E0",
                  borderRadius: "8px",
                  overflow: "hidden",
                  backgroundColor: "white",
                  width: { xs: '100%', lg: '250px' },
                  height: '300px',
                  margin: { xs: 0, lg: '0 auto' }
                }}
              >
                {/* File Preview */}
                <Box sx={{ position: "relative", height: "160px" }}>
                  <Image src={file.url || "/placeholder.svg"} alt={file.name} fill style={{ objectFit: "cover" }} />
                  <IconButton
                    onClick={() => handleLikeToggle(file.id)}
                    sx={{
                      position: "absolute",
                      top: "8px",
                      right: "8px",
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      width: "32px",
                      height: "32px",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 1)",
                      },
                    }}
                  >
                    <Heart className={`w-4 h-4 ${file.isLiked ? "text-red-500 fill-red-500" : "text-gray-400"}`} />
                  </IconButton>
                </Box>

                {/* File Info */}
                <Box sx={{ padding: "12px" }}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#333",
                      fontWeight: 500,
                      fontSize: "14px",
                      marginBottom: "4px",
                    }}
                  >
                    {file.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#666",
                      fontSize: "12px",
                      marginBottom: "12px",
                    }}
                  >
                    {file.size}
                  </Typography>

                  {/* Action Buttons */}
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <IconButton
                      onClick={() => handleEdit(file.id)}
                      sx={{
                        width: "32px",
                        height: "32px",
                        color: "#666",
                        "&:hover": {
                          color: "#4A5F8A",
                          backgroundColor: "#F0F4FF",
                        },
                      }}
                    >
                      <Edit className="w-4 h-4" />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(file.id)}
                      sx={{
                        width: "32px",
                        height: "32px",
                        color: "#666",
                        "&:hover": {
                          color: "#FF4444",
                          backgroundColor: "#FFF0F0",
                        },
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        )}

        {/* Action Buttons */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "12px",
            paddingTop: "24px",
            borderTop: "1px solid #E0E0E0",
          }}
        >
          <Button
            variant="outlined"
            onClick={handleCancel}
            sx={{
              borderColor: "#E0E0E0",
              color: "#666",
              textTransform: "none",
              fontWeight: 500,
              fontSize: "14px",
              padding: "10px 24px",
              borderRadius: "6px",
              minWidth: "100px",
              "&:hover": {
                borderColor: "#4A5F8A",
                color: "#4A5F8A",
                backgroundColor: "transparent",
              },
            }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleUploadAll}
            startIcon={<Upload className="w-4 h-4" />}
            sx={{
              backgroundColor: "#4A5F8A",
              color: "white",
              textTransform: "none",
              fontWeight: 500,
              fontSize: "14px",
              padding: "10px 24px",
              borderRadius: "6px",
              boxShadow: "none",
              minWidth: "140px",
              "&:hover": {
                backgroundColor: "#3A4F7A",
                boxShadow: "none",
              },
            }}
          >
            Upload All
          </Button>
        </Box>
      </Box>
    </>
  )
}
