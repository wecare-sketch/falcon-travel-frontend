"use client"

import type React from "react"

import { Box, Typography } from "@mui/material"
import { Upload } from "lucide-react"
import { useState, useCallback } from "react"

interface MediaUploadAreaProps {
  onFileUpload?: (files: FileList) => void
  supportedFormats?: string
  maxSize?: string
}

export function MediaUploadArea({
  onFileUpload,
  supportedFormats = "JPG, PNG, GIF, MP4 (max 10MB)",
  maxSize = "10MB",
}: MediaUploadAreaProps) {
  const [isDragOver, setIsDragOver] = useState(false)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(false)

      const files = e.dataTransfer.files
      if (files.length > 0) {
        onFileUpload?.(files)
      }
    },
    [onFileUpload],
  )

  const handleClick = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.multiple = true
    input.accept = "image/*,video/*"
    input.onchange = (e) => {
      const target = e.target as HTMLInputElement
      if (target.files) {
        onFileUpload?.(target.files)
      }
    }
    input.click()
  }

  return (
    <Box
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      sx={{
        border: isDragOver ? "2px dashed #D9D9D9" : "2px dashed #E0E0E0",
        borderRadius: "8px",
        padding: "24px",
        textAlign: "center",
        cursor: "pointer",
        backgroundColor: isDragOver ? "#F5F7FA" : "#FAFBFC",
        transition: "all 0.2s ease",
        marginBottom: "16px",
        "&:hover": {
          borderColor: "#4A5F8A",
          backgroundColor: "#F5F7FA",
        },
      }}
    >
      <Upload className={`w-8 h-8 mx-auto mb-3 ${isDragOver ? "text-[#345794]" : "text-gray-400"}`} />

      <Typography
        variant="body1"
        sx={{
          color: "#333",
          fontWeight: 500,
          fontSize: "14px",
          marginBottom: "4px",
        }}
      >
        Drag files here or click to upload
      </Typography>

      <Typography
        variant="body2"
        sx={{
          color: "#666",
          fontSize: "12px",
        }}
      >
        Supports: {supportedFormats}
      </Typography>
    </Box>
  )
}
