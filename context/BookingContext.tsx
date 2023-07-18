import React, { createContext, useState, useEffect } from "react";
import { PassengerType, BookingContextType } from "../component/types/types";
import axios from "axios";
import { apiUri } from "../utils/utility";

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

  const options = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "content-type": "application/json",
    },
  };

  async function fetchBooking() {
    await axios
      .get(`${apiUri}/api/bookings`, options)
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
