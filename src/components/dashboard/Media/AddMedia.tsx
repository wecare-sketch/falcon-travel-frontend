"use client";

import type React from "react";

import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  IconButton,
  Button,
} from "@mui/material";
import { Upload, Heart, Download } from "lucide-react";
import { PageHeader } from "../PageHeader";
import Image from "next/image";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { ArrowDownward } from "@mui/icons-material";

interface MediaFile {
  id: string;
  name: string;
  size: string;
  type: "image" | "video" | "document";
  url: string;
  isLiked?: boolean;
}
interface EventMediaResponse {
  data: {
    event: {
      media: [];
    };
    media: [];
  };
}
interface MediaUploadPageProps {
  onBack?: () => void;
  eventId: string;
  eventid: string;
}
interface Media {
  id: string;
  url: string;
  createdAt: string; 
  
}

export function MediaUploadPage({
  onBack,
  eventId,
  eventid,
}: MediaUploadPageProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState<MediaFile[]>([]); 
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [userMedia, setuserMedia] = useState<Media[]>([]);

  const role = useSelector((state: RootState) => state.userRole.role);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    handleFileUpload(files);
  };

 
  const handleLikeToggle = (fileId: string) => {
    setUploadedFiles((prev) =>
      prev.map((file) =>
        file.id === fileId ? { ...file, isLiked: !file.isLiked } : file
      )
    );
  };

  

  const handleDelete = (fileId: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== fileId));
  };

  const handleCancel = () => {
    onBack?.()
  };
const handleFileUpload = (files: File[]) => {
  const allowedExtensions = ["jpg", "png", "mp4"];

  const newFiles: MediaFile[] = Array.from(files)
    .filter((file) => {
      const fileExtension = file.name.split(".").pop()?.toLowerCase();
      return fileExtension && allowedExtensions.includes(fileExtension);
    })
    .map((file) => ({
      id: `${file.name}-${file.size}-${Date.now()}-${Math.random()}`, 
      name: file.name,
      size: `${(file.size / 1024).toFixed(2)} KB`,
      type: file.type.startsWith("image")
        ? "image"
        : file.type.startsWith("video")
        ? "video"
        : "document",
      url: URL.createObjectURL(file),
    }));

  if (newFiles.length === 0) {
    toast.error("Unsupported file type. Only JPG, PNG, MP4 allowed.");
  } else {
    setUploadedFiles((prev) => [...prev, ...newFiles]);
  }
};


const handleClick = () => {
  const input = document.createElement("input");
  input.type = "file";
  input.multiple = true;

  if (activeTab === 0) {
    input.accept = "image/*";
  } else if (activeTab === 1) {
    input.accept = "video/*"; 
  } else {
    input.accept = "*"; 
  }

  input.onchange = (e) => {
    const target = e.target as HTMLInputElement;

    if (target.files) {
      handleFileUpload([...target.files]);
    }
  };

  input.click();
};

const handleUploadAll = async () => {
    setIsUploading(true);
  try {
    const formData = new FormData();

    for (const file of uploadedFiles) {
      if (file.url && file.url.startsWith("blob:")) {
        const fileContent = await fetch(file.url).then((res) => res.blob());
        formData.append("files", fileContent, file.name);
      }
    }


    const response = await axiosInstance.post(
      `/user/upload/${eventId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.status === 200) {
      setUploadedFiles([]);
      toast.success("Files uploaded successfully!");
    } else {
      throw new Error("Upload failed. Please try again.");
    }
  } catch (error: unknown) {
    console.error("Error uploading files:", error);
  } finally {
    setIsUploading(false);
  }
};
  const fetchUservent = async () => {
    try {
      const endpoint =
        role === "user"
          ? `/user/event/media/${eventid}`
          : `/admin/event/media/${eventid}`;
      const response = await axiosInstance.get<EventMediaResponse>(endpoint);
       let media : [] | undefined;
       if (role === "user") {
         media = response?.data?.data?.event?.media; 
       } else if (role === "admin") {
         media = response?.data?.data?.media; }
      setuserMedia(media || []);
    } catch (error) {
      console.error("Error fetching event media:", error);
    }
  };

  useEffect(() => {
    fetchUservent();
  }, [eventid,role, fetchUservent]);
  
  const getFileType = (url: string) => {
    const extension = url.split(".").pop()?.toLowerCase();
    const imageTypes = ["jpg", "jpeg", "png", "gif", "bmp", "svg"];
    const videoTypes = ["mp4", "webm", "ogg"];

    if (imageTypes.includes(extension || "")) return "image";
    if (videoTypes.includes(extension || "")) return "video";
    return "unknown"; 
  };

  const images = userMedia?.filter((file) => getFileType(file.url) === "image");
  const videos = userMedia?.filter((file) => getFileType(file.url) === "video");



const handleDownload = (url: string, filename?: string): void => {
  fetch(url)
    .then((response: Response) => response.blob()) 
    .then((blob: Blob) => {
      const blobUrl: string = window.URL.createObjectURL(blob);

      const link: HTMLAnchorElement = document.createElement("a");
      link.href = blobUrl;
      link.download = filename || "image"; 
      link.click();

      window.URL.revokeObjectURL(blobUrl);
    })
    .catch((error: unknown) => {
      console.error("Error downloading the image:", error);
    });
};



  const tabLabels = ["Images", "Videos"];

  return (
    <>
      <PageHeader
        title={
          role === "user" ? "Add Media for Events" : "Download Event Media"
        }
        onBack={onBack}
      />
      <Box
        sx={{
          marginTop:"20px",
          backgroundColor: "white",
          borderRadius: "12px",
          padding: "10px",
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: "#E0E0E0",
        }}
      >
        {role === "user" && (
          <>
            <Box sx={{ overflowX: "auto", whiteSpace: "nowrap", mb: "24px" }}>
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
            <Box
              onClick={handleClick}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              sx={{
                border: isDragOver
                  ? "2px dashed #4A5F8A"
                  : "2px dashed #E0E0E0",
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
                <Image
                  src="/images/upload.png"
                  alt="upload"
                  width={36}
                  height={36}
                />
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
                    lg: "repeat(4, 1fr)",
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
                      width: { xs: "100%", lg: "250px" },
                      height: "300px",
                      margin: { xs: 0, lg: "0 auto" },
                    }}
                  >
                    {/* File Preview */}
                    <Box sx={{ position: "relative", height: "160px" }}>
                      {file.type === "image" ? (
                        <Image
                          src={file.url || "/placeholder.svg"}
                          alt={file.name}
                          fill
                          style={{ objectFit: "cover" }}
                        />
                      ) : file.type === "video" ? (
                        <video
                          src={file.url || "/placeholder.svg"}
                          style={{
                            objectFit: "cover",
                            width: "100%",
                            height: "100%",
                          }}
                          controls
                        />
                      ) : (
                        <div>Unsupported file type</div>
                      )}

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
                        <Heart
                          className={`w-4 h-4 ${
                            file.isLiked
                              ? "text-red-500 fill-red-500"
                              : "text-gray-400"
                          }`}
                        />
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
                      <Box
                        sx={{ display: "flex", justifyContent: "space-around" }}
                      >
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
                          <Image
                            src="/images/mediadel.png"
                            alt="delete"
                            width={14}
                            height={14}
                          />
                        </IconButton>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>
            )}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "12px",
                paddingTop: "24px",
                borderTop: "1px solid #E0E0E0",
                marginBottom:"27px"
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
                {isUploading ? "Uploading..." : "Upload All"}{" "}
              </Button>
            </Box>
          </>
        )}

        <Box
          sx={{
            backgroundColor: "#F8F9FA",
            padding: "0px 15px 10px 15px",
          }}
        >
          <Box
            sx={{
              fontSize: {
                xs: "13px",
                sm: "20px",
                md: "26px",
              },
              fontWeight: 100,
              marginBottom: "0px",
              color: "black",
              textAlign: "center",
              paddingTop: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: {
                xs: "column",
                sm: "row",
              },
            }}
          >
            Uploaded Media
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#F0F1FF",
                // padding: {
                //   xs: "6px",
                //   sm: "8px",
                //   md: "7px",
                // },
                borderRadius: "50%",
                marginLeft: {
                  xs: "0",
                  sm: "10px",
                },
                width: {
                  xs: "28px",
                  sm: "38px",
                  md: "44px",
                },
                height: {
                  xs: "28px",
                  sm: "38px",
                  md: "44px",
                },
              }}
            >
              <ArrowDownward style={{ fontSize: "1.2rem" }} />
            </Box>
          </Box>

          {/* Display images */}
          {images.length > 0 && (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, 1fr)",
                  lg: "repeat(4, 1fr)",
                },
                gap: "16px",
                marginBottom: "32px",
                paddingTop: "14px",
              }}
            >
              {images.reverse().map((file) => (
                <Box
                  key={file.id}
                  sx={{
                    borderWidth: 1,
                    borderStyle: "solid",
                    borderColor: "#E0E0E0",
                    borderRadius: "8px",
                    overflow: "hidden",
                    backgroundColor: "white",
                    width: "100%",
                    height: { xs: "220px", sm: "290px", lg: "330px" }, 
                    margin: "0 auto",
                  }}
                >
                  <Box sx={{ position: "relative", height: "100%" }}>
                    <Image
                      src={file.url || "/placeholder.svg"}
                      alt={file.id}
                      layout="fill"
                      style={{ objectFit: "cover", borderRadius: "8px" }}
                    />
                    <div
                      onClick={() => handleDownload(file.url, file.id)}
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        color: "white",
                        padding: "6px",
                        borderRadius: "50%",
                        cursor: "pointer",
                      }}
                    >
                      <Download size={15} style={{ color: "white" }} />
                    </div>
                  </Box>
                </Box>
              ))}
            </Box>
          )}
          {videos.length > 0 && (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, 1fr)",
                  lg: "repeat(4, 1fr)",
                },
                gap: "16px",
                marginBottom: "32px",
              }}
            >
              {videos.reverse().map((file) => (
                <Box
                  key={file.id}
                  sx={{
                    borderWidth: 1,
                    borderStyle: "solid",
                    borderColor: "#E0E0E0",
                    borderRadius: "8px",
                    overflow: "hidden",
                    backgroundColor: "white",
                    width: "100%", 
                    height: { xs: "220px", sm: "290px", lg: "330px" }, 
                    margin: "0 auto",
                  }}
                >
                  <Box sx={{ position: "relative", height: "100%" }}>
                    <video
                      src={file.url || "/placeholder.svg"}
                      style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
                      }}
                      controls
                    />
                    <div
                      onClick={() => handleDownload(file.url, file.id)}
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        color: "white",
                        padding: "6px",
                        borderRadius: "50%",
                        cursor: "pointer",
                      }}
                    >
                      <Download size={15} style={{ color: "white" }} />
                    </div>
                  </Box>
                </Box>
              ))}
            </Box>
          )}
        </Box>

      </Box>
    </>
  );
}
