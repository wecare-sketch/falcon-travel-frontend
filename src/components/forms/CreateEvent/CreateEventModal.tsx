"use client";

import { useForm, FormProvider } from "react-hook-form";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Avatar,
} from "@mui/material";
import { X, User } from "lucide-react";
import { SectionEventDetails } from "./SectionEventDetails";
import { SectionStops } from "./SectionStops";
import { SectionVehicleInfo } from "./SectionVehicleInfo";
import { SectionPaymentDetails } from "./SectionPaymentDetails";
import { CustomButton } from "@/components/shared/CustomButton";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useState, useRef, ChangeEvent, useEffect } from "react";
import { ShareEventModal } from "../ShareEventModal";
import { toast } from "react-hot-toast";
import { useEventMutationByRole } from "@/hooks/events/useCreateEventMutationByRole";
import { useUpdateEventByPageType } from "@/hooks/events/useUpdateEventByPageType";
import { useAdminEvents } from "@/hooks/events/useAdminEvents";

interface EventFormData {
  eventType: string;
  clientName: string;
  phoneNumber: string;
  pickupDate: string;
  dropoffDate: string;
  pickupTime: string;
  location: string;
  addStops: string[] | string;
  hoursReserved: number;
  totalAmount: number;
  pendingAmount: number;
  equityDivision: number;
  imageUrl: string;
  name: string;
  slug: string;
  id: string;
  passengerCount: number;
  paymentStatus: string;
  depositAmount: number;
  vehicle: string;
  tripNotes: string;
}

interface CreateEventModalProps {
  open: boolean;
  onClose: () => void;
  onCreateEvent?: (eventData: EventFormData) => void;
  onUpdateEvent?: (eventData: EventFormData) => void;
  isEditMode?: boolean;
  initialData?: EventFormData;
  eventId?: string;
  isUserRequestPage?: boolean;
  setActiveView: (view: string) => void;
}

const validatePickupBeforeDropoff = (
  pickupDate: string,
  dropoffDate: string
) => {
  if (!pickupDate || !dropoffDate) return true;
  const pickup = new Date(pickupDate);
  const dropoff = new Date(dropoffDate);
  if (pickup > dropoff) {
    return "Pickup date must be before the drop-off date";
  }
  return true;
};

export function CreateEventModal({
  open,
  onClose,
  initialData,
  isEditMode,
  eventId,
  isUserRequestPage,
}: Readonly<CreateEventModalProps>) {
  const methods = useForm<EventFormData>({
    defaultValues: initialData ?? {
      imageUrl: "",
      eventType: "",
      clientName: "",
      phoneNumber: "",
      pickupDate: "",
      dropoffDate: "",
      pickupTime: "",
      location: "",
      addStops: [],
      vehicle: "",
      passengerCount: 0,
      hoursReserved: 0,
      totalAmount: 0,
      pendingAmount: 0,
      equityDivision: 0,
      name: "",
      tripNotes: "",
    },
  });

  const role = useSelector((state: RootState) => state.userRole.role);
  const { handleSubmit, reset, getValues, setValue } = methods;
  const [showShareModal, setShowShareModal] = useState(false);
  const [slug, setSlug] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [eventImage, setEventImage] = useState<string | null>(null);
  const [eventFile, setEventFile] = useState<File | null>(null);

  const { mutate: submitEvent, status } = useEventMutationByRole();
  const { mutate: updateEvent, isPending: isUpdating } =
    useUpdateEventByPageType({
      isUserRequestPage,
    });
  const isPending = status === "loading";
  const { refetch } = useAdminEvents();

  useEffect(() => {
    if (initialData) {
      reset(initialData);
      if (initialData?.imageUrl) {
        setEventImage(initialData.imageUrl);
      }
    }
  }, [initialData, reset]);

  const [currentStop, setCurrentStop] = useState<string>("");

  const handleAddStop = () => {
    const trimmedStop = currentStop.trim();
    if (trimmedStop) {
      const newStops = [...getValues("addStops"), trimmedStop];
      setValue("addStops", newStops);
      setCurrentStop("");
    }
  };

  const handleCancel = () => {
    reset();
    onClose();
    if (!isEditMode) {
      setEventImage(null);
      setEventFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const onSubmit = (data: EventFormData) => {
    const dateValidation = validatePickupBeforeDropoff(
      data.pickupDate,
      data.dropoffDate
    );
    if (dateValidation !== true) {
      toast.error(String(dateValidation));
      return;
    }

    if (!eventFile && !isEditMode) {
      toast.error("Please upload an event image.");
      return;
    }

    const formData = new FormData();

    if (eventFile) {
      formData.append("file", eventFile);
    }

    formData.append(
      "eventDetails",
      JSON.stringify({
        name: data.name,
        eventType: data.eventType,
        clientName: data.clientName,
        phoneNumber: data.phoneNumber,
        pickupDate: data.pickupDate,
        dropOffDate: data.dropoffDate,
        pickupTime: data.pickupTime,
        location: data.location,
        stops: data.addStops ? [data.addStops] : [],
      })
    );

    formData.append(
      "tripNotes",
      JSON.stringify(data.tripNotes)
    );

    formData.append(
      "vehicleInfo",
      JSON.stringify({
        vehicleName: data.vehicle,
        numberOfPassengers: Number(data.passengerCount),
        hoursReserved: Number(data.hoursReserved),
      })
    );

    formData.append(
      "paymentDetails",
      JSON.stringify({
        totalAmount: Number(data.totalAmount),
        depositAmount: 100,
        pendingAmount: Number(data.pendingAmount),
        equityDivision: Number(data.equityDivision),
      })
    );

    if (isEditMode && eventId) {
      updateEvent(
        { slug: eventId, formData },
        {
          onSuccess: () => {
            toast.success("Event updated!");
            reset();
            
            setEventImage(null);
            setEventFile(null);
            onClose();
            refetch();
            reset({ tripNotes: "" });
          },
          onError: () => toast.error("Failed to update event"),
        }
      );
    } else {
      submitEvent(formData, {
        onSuccess: (response) => {
          toast.success("Event created!");
          setSlug(response?.data?.slug ?? null);
          setEventImage(null);
          setEventFile(null);
          reset();
          refetch();

          if (role === "admin") {
            onClose();
            setShowShareModal(true);
          } else {
            handleCancel();
          }
        },
        onError: () => {
          toast.error("Failed to create event");
        },
      });
    }
  };

  const handleCloseShareModal = () => {
    setShowShareModal(false);
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setEventFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setEventImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    } else {
      setEventImage(null);
      setEventFile(null);
    }
  };

  return (
    <>
      <FormProvider {...methods}>
        <Dialog
          open={open}
          onClose={onClose}
          maxWidth="lg"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: "8px",
              padding: "24px",
              minHeight: "600px",
              maxHeight: "90vh",
              overflow: "auto",
            },
          }}
        >
          <DialogTitle
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0 0 16px 0",
              borderBottom: "1px solid #E0E0E0",
              marginBottom: "24px",
            }}
          >
            <Typography
              component="span"
              variant="h5"
              sx={{ color: "#345794", fontWeight: 600, fontSize: "24px" }}
            >
              Create New Event
            </Typography>
            <IconButton onClick={handleCancel} sx={{ padding: "4px" }}>
              <X className="w-6 h-6 text-gray-600" />
            </IconButton>
          </DialogTitle>

          <DialogContent sx={{ padding: 0, overflow: "visible" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                marginBottom: "24px",
              }}
            >
              <Typography
                variant="body2"
                sx={{ color: "#000000", fontSize: "20px" }}
              >
                Add Event Image
              </Typography>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                style={{ display: "none" }}
              />
              <Avatar
                src={eventImage ?? undefined}
                sx={{
                  width: 100,
                  height: 100,
                  cursor: "pointer",
                  backgroundColor: "#F5F7FA",
                  border: "1px dashed #D1D5DB",
                }}
                onClick={handleImageClick}
              >
                {!eventImage && (
                  <div className="flex flex-col justify-center items-center">
                    <div>
                      <User className="w-10 h-10 text-gray-600" />
                    </div>
                    <div>
                      <Typography
                        variant="body2"
                        sx={{ color: "#6B7280", textAlign: "center" }}
                      >
                        Add Image
                      </Typography>
                    </div>
                  </div>
                )}
              </Avatar>
            </Box>

            <SectionEventDetails />
            <SectionStops onAddStop={handleAddStop} />
            <SectionVehicleInfo />
            <SectionPaymentDetails />
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 2,
                flexWrap: "wrap",
              }}
            >
              <CustomButton
                label="Cancel"
                onClick={handleCancel}
                inverted
                sx={{
                  minWidth: { xs: "100%", sm: "140px" },
                  height: 44,
                }}
              />
              <CustomButton
                label={
                  isPending || isUpdating
                    ? isEditMode
                      ? "Updating..."
                      : "Creating..."
                    : isEditMode
                    ? "Update Event"
                    : "+ Create Event"
                }
                onClick={handleSubmit(onSubmit)}
                disabled={isPending}
                sx={{
                  minWidth: { xs: "100%", sm: "180px" },
                  height: 44,
                }}
              />
            </Box>
          </DialogContent>
        </Dialog>
      </FormProvider>
      <ShareEventModal
        open={showShareModal}
        onClose={handleCloseShareModal}
        slug={slug || ""}
      />
    </>
  );
}
