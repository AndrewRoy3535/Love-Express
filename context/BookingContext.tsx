import React, { createContext, useState, useEffect } from "react";
import { PassengerType, BookingContextType } from "../component/types/types";
import axios from "axios";

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

  async function fetchBooking() {
    await axios
      .get("api/bookings")
      .then((res) => setPassenger(res.data))
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    fetchBooking();
  }, []);

  return (
    <BookingContext.Provider value={{ passenger, setPassenger, fetchBooking }}>
      {children}
    </BookingContext.Provider>
  );
};
