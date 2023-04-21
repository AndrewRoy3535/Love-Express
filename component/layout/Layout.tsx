import React from "react";
import Appbar from "../appbar/Appbar";
import { LayoutProps } from "../types/interfaces";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { BusScheduleProvider } from "../../context/ScheduleContext";
import { UserProvider } from "../../context/UserContext";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BookingProvider } from "../../context/BookingContext";

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  return (
    <BookingProvider>
      <UserProvider>
        <BusScheduleProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <ThemeProvider theme={darkTheme}>
              <Appbar />
              {children}
            </ThemeProvider>
          </LocalizationProvider>
        </BusScheduleProvider>
      </UserProvider>
    </BookingProvider>
  );
};

export default Layout;
