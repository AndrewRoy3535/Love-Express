import React, { createContext, useState, useEffect } from "react";
import { PassengerType, BookingContextType } from "../component/types/types";
import axios from "axios";
import { apiUri, axiosOption } from "../utils/utility";
import { AxiosError } from "axios";

const BookingContext = createContext<BookingContextType>({
  passenger: {
    scheduleId: "",
    passengername: "",
    gender: "",
    address: "",
    boardngpoint: "",
    dropingpoint: "",
    totalamonut: 0,
    mobile: "",
    email: "",
    age: 0,
    seats: [],
    cancel: false,
  },
  setPassenger: () => {},
  fetchBooking: async () => {},
  errorFromBooking: "",
});

export default BookingContext;

export const BookingProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [passenger, setPassenger] = useState<PassengerType>({
    scheduleId: "",
    passengername: "",
    gender: "",
    address: "",
    boardngpoint: "",
    dropingpoint: "",
    totalamonut: 0,
    mobile: "",
    email: "",
    age: 0,
    seats: [],
    cancel: false,
  });
  const [errorFromBooking, setErrorFromBooking] = React.useState<string>("");

  async function fetchBooking() {
    try {
      await axios
        .get(`${apiUri}/api/bookings`, axiosOption)
        .then((res) => setPassenger(res.data));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          const { status, data } = axiosError.response;
          if (status === 400) {
            setErrorFromBooking((data as { message: string }).message);
          } else {
            setErrorFromBooking(
              "An unexpected server error occurred. Please try again later."
            );
          }
        } else if (error.message === "Network Error") {
          setErrorFromBooking(
            "Failed to fetch data. Please check your internet connection."
          );
        } else {
          setErrorFromBooking(
            "An unexpected error occurred. Please try again later."
          );
        }
      }
    }
  }

  useEffect(() => {
    fetchBooking();
  }, []);

  return (
    <BookingContext.Provider
      value={{ passenger, setPassenger, fetchBooking, errorFromBooking }}>
      {children}
    </BookingContext.Provider>
  );
};
