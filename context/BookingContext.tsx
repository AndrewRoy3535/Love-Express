import React, { createContext, useState, useEffect } from "react";
import { PassengerType, BookingContextType } from "../component/types/types";
import axios from "axios";
import { apiUri, axiosOption } from "../utils/utility";
import { useRouter } from "next/router";

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
  const router = useRouter();
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
      console.log(error);
      router.push("/not-found");
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
