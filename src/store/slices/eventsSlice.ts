import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Event {
  id: string;
  slug: string;
  name: string;
  imageUrl: string;
  eventType: string;
  clientName: string;
  phoneNumber: string;
  pickupDate: string;
  location: string;
  vehicle: string;
  totalAmount: number;
  passengerCount: number;
  pendingAmount: number;
  depositAmount: number;
  hoursReserved: number;
  equityDivision: number;
  eventStatus: string;
  paymentStatus: string;
  createdAt: string;
  updatedAt: string;
  expiresAt: string;
  host: string;
  cohosts: string[];
}

interface EventsState {
  total: number;
  page: number;
  limit: number;
  events: Event[];
}

const initialState: EventsState = {
  total: 0,
  page: 1,
  limit: 10,
  events: [],
};

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setEvents(state, action: PayloadAction<EventsState>) {
      return action.payload;
    },
    clearEvents() {
      return initialState;
    },
  },
});

export const { setEvents, clearEvents } = eventsSlice.actions;
export default eventsSlice.reducer;
