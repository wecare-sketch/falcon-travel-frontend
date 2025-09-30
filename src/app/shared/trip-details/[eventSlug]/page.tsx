"use client";

import {
  Phone,
  MessageCircle,
  MapPin,
  Car,
  Play,
  SkipBack,
  SkipForward,
  Music,
} from "lucide-react";
import { Button } from "@mui/material";
import { Card, CardContent } from "@mui/material";
import { Avatar } from "@mui/material";
import { useGetSharedEvent } from "@/hooks/events/useGetSharedEvent";
import { useParams } from "next/navigation";

const ShareItineraryPagee = () => {
  const { eventSlug } = useParams<{ eventSlug: string }>();
  const { data, isLoading, isError } = useGetSharedEvent(eventSlug);

  const event = data?.data;
  const handleClick = (location: string): void => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      location
    )}`;
    window.open(url, "_blank");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-600">
              Loading trip details...
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !event) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="text-lg font-semibold text-red-600">
              Failed to load trip details
            </div>
            <div className="text-sm text-gray-500 mt-2">
              Please try again later
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 sm:p-0 md:p-10 lg:p-10">
      <div className="bg-white px-4 py-3 flex items-center justify-between lg:m-4">
        <div>
          <div className="text-sm text-blue-600 font-medium capitalize">
            {event?.status || "N/A"}
          </div>
          <div className="text-xl font-bold text-gray-900">
            Trip #{event?.trip_id || "N/A"}
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500">ETA</div>
          <div className="text-xl font-bold text-gray-900">
            {event?.ETA ? new Date(event.ETA).toLocaleDateString() : "N/A"}
          </div>
        </div>
      </div>

      <div className="px-4 py-4 space-y-6">
        {/* Passenger Information */}
        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Passenger Information
            </h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar alt={event?.passengerInfo?.name}>
                  {event?.passengerInfo?.name?.charAt(0) || "N"}
                </Avatar>
                <div>
                  <div className="font-semibold text-gray-900">
                    {event?.passengerInfo?.name || "N/A"}
                  </div>
                  <div className="text-sm text-orange-500 font-medium">
                    Trip Status: {event?.status || "N/A"}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  size="small"
                  className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700"
                  sx={{
                    minWidth: "40px",
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                  }}
                >
                  <Phone className="w-5 h-5" />
                </Button>
                <Button
                  size="small"
                  className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700"
                  sx={{
                    minWidth: "40px",
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                  }}
                >
                  <MessageCircle className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Route Details */}
        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Route Details
            </h3>
            <div className="space-y-6">
              {/* Pickup Location */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                    <MapPin
                      className="w-4 h-4 text-white cursor-pointer"
                      onClick={() =>
                        handleClick(
                          event?.routeDetails?.pickupLocation ||
                            "Location not specified"
                        )
                      }
                    />
                  </div>
                  <div className="w-px h-12 bg-gray-300 border-l-2 border-dashed border-gray-300 my-2"></div>
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">
                    Pickup Location
                  </div>
                  <div className="text-gray-900 font-semibold">
                    {event?.routeDetails?.pickupLocation ||
                      "Location not specified"}
                  </div>
                  <div className="text-sm text-gray-500">
                    Departure:{" "}
                    {event?.ETA
                      ? new Date(event.ETA).toLocaleDateString()
                      : "N/A"}
                  </div>
                </div>
              </div>

              {/* Dropoff Location */}
              {/* <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                    <MapPin
                      className="w-4 h-4 text-white cursor-pointer"
                      onClick={() =>
                        handleClick(
                          event?.routeDetails?.dropOffLocation ||
                            "Location not specified"
                        )
                      }
                    />
                  </div> */}
              {/* Only show dashed line if there are route stops */}
              {/* {event?.routeDetails?.route &&
                    event.routeDetails.route.length > 0 &&
                    event.routeDetails.route[0] &&
                    event.routeDetails.route[0].length > 0 && (
                      <div className="w-px h-12 bg-gray-300 border-l-2 border-dashed border-gray-300 my-2"></div>
                    )}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">
                    Drop-off Location
                  </div>
                  <div className="text-gray-900 font-semibold">
                    {event?.routeDetails?.dropOffLocation ||
                      "Location not specified"}
                  </div>
                </div>
              </div> */}

              {/* Route Stops */}
              {event?.routeDetails?.route &&
                event.routeDetails.route.length > 0 &&
                event.routeDetails.route[0] &&
                event.routeDetails.route[0].map((stop, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          index === 0
                            ? "bg-blue-500"
                            : index === event.routeDetails.route[0].length - 1
                            ? "bg-orange-500"
                            : "bg-yellow-500"
                        }`}
                      >
                        <MapPin
                          className="w-3 h-3 text-white cursor-pointer"
                          onClick={() => handleClick(stop)}
                        />
                      </div>
                      {index < event.routeDetails.route[0].length - 1 && (
                        <div className="w-px h-12 bg-gray-300 border-l-2 border-dashed border-gray-300 my-2"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">
                        {index === 0
                          ? "First Stop"
                          : index === event.routeDetails.route[0].length - 1
                          ? "Final Stop"
                          : `Stop ${index}`}
                      </div>
                      <div className="text-gray-900 font-semibold">{stop}</div>
                      <div className="text-sm text-gray-500">
                        {index === 0
                          ? "Additional waypoint"
                          : index === event.routeDetails.route[0].length - 1
                          ? "Last stop before destination"
                          : "Brief stop"}
                      </div>
                    </div>
                  </div>
                ))}

              {/* Dropoff Location */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                    <MapPin
                      className="w-4 h-4 text-white cursor-pointer"
                      onClick={() =>
                        handleClick(
                          event?.routeDetails?.dropOffLocation ||
                            "Location not specified"
                        )
                      }
                    />
                  </div>
                  {/* Only show dashed line if there are route stops */}
                  {/* {event?.routeDetails?.route &&
                    event.routeDetails.route.length > 0 &&
                    event.routeDetails.route[0] &&
                    event.routeDetails.route[0].length > 0 && (
                      <div className="w-px h-12 bg-gray-300 border-l-2 border-dashed border-gray-300 my-2"></div>
                    )} */}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">
                    Drop-off Location
                  </div>
                  <div className="text-gray-900 font-semibold">
                    {event?.routeDetails?.dropOffLocation ||
                      "Location not specified"}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Vehicle Information */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <Car className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Vehicle Information
              </h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Vehicle Name</span>
                <span className="font-semibold text-gray-900">
                  {event?.vehicleInfo?.name || "N/A"}
                </span>
              </div>
              <div className="flex justify-between py-2 border-t border-gray-100">
                <span className="text-gray-600">Number of Passenger</span>
                <span className="font-semibold text-gray-900">
                  {event?.vehicleInfo?.passengerCount || 0}
                </span>
              </div>
              <div className="flex justify-between py-2 border-t border-gray-100">
                <span className="text-gray-600">Hours Locked</span>
                <span className="font-semibold text-gray-900">
                  {event?.vehicleInfo?.hoursLocked
                    ? new Date(
                        event.vehicleInfo.hoursLocked
                      ).toLocaleDateString()
                    : "N/A"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Trip Notes */}
        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Trip Notes
            </h3>
            {event?.tripNotes ? (
              <ul className="space-y-2">{event.tripNotes}</ul>
            ) : (
              <p className="text-gray-500 text-sm">No trip notes available</p>
            )}
          </CardContent>
        </Card>

        {/* Trip Playlist */}
        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Trip Playlist
            </h3>

            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gray-300 rounded-lg flex items-center justify-center">
                  <Music className="w-6 h-6 text-gray-500" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">
                    No music playing
                  </div>
                  <div className="text-sm text-gray-500">
                    Select a track to start
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-4 mb-3">
                <Button size="small" variant="outlined" className="w-8 h-8">
                  <SkipBack className="w-4 h-4" />
                </Button>
                <Button
                  size="small"
                  className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700"
                >
                  <Play className="w-5 h-5" />
                </Button>
                <Button size="small" variant="outlined" className="w-8 h-8">
                  <SkipForward className="w-4 h-4" />
                </Button>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="w-full bg-gray-200 rounded-full h-1">
                  <div
                    className="bg-blue-600 h-1 rounded-full"
                    style={{ width: "0%" }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>0:00</span>
                  <span>0:00</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-center text-gray-500 py-8">
                <Music className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                <p>No playlist available</p>
                <p className="text-sm">Music library is empty</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ShareItineraryPagee;
