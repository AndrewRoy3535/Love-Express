import React from "react";
import Appbar from "../appbar/Appbar";
import { LayoutProps } from "../types/interfaces";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { BusScheduleProvider } from "../../context/ScheduleContext";
import { UserProvider } from "../../context/UserContext";
import { BookingProvider } from "../../context/BookingContext";

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <BookingProvider>
      <UserProvider>
        <BusScheduleProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Appbar />
            {children}
          </LocalizationProvider>
        </BusScheduleProvider>
      </UserProvider>
    </BookingProvider>
  );
};

export default Layout;
