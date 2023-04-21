import React, { createContext, useState, useEffect } from "react";
import { PassengerType, BookingContextType } from "../component/types/types";

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

  return (
    <BookingContext.Provider value={{ passenger, setPassenger }}>
      {children}
    </BookingContext.Provider>
  );
};
