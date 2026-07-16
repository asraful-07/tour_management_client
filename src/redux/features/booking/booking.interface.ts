export enum BOOKING_STATUS {
  PENDING = "PENDING",
  COMPLETE = "COMPLETE",
  FAILED = "FAILED",
  CANCEL = "CANCEL",
}

export interface IBooking {
  _id: string;
  tour: {
    _id: string;
    title: string;
  };
  user: {
    _id: string;
    name: string;
    email: string;
  };
  guestCount: number;
  totalAmount?: number;
  status: BOOKING_STATUS;
  createdAt: string;
}

export interface BookingListResponse {
  success: boolean;
  data: IBooking[];
}

export interface SingleBookingResponse {
  success: boolean;
  data: IBooking;
}
