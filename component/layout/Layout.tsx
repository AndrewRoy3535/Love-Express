import React from "react";
import Appbar from "../appbar/Appbar";
import { LayoutProps } from "../types/interfaces";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { BusScheduleProvider } from "../../context/ScheduleContext";
import { UserProvider } from "../../context/UserContext";
import { BookingProvider } from "../../context/BookingContext";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { status } = useSession();
  // const router = useRouter();
  // const { pathname } = router;
  // let showNavbar = true;
  // if (pathname === "/login") {
  //   showNavbar = false;
  // }
  return (
    <BookingProvider>
      <UserProvider>
        <BusScheduleProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            {status === "authenticated" && <Appbar />}
            {children}
          </LocalizationProvider>
        </BusScheduleProvider>
      </UserProvider>
    </BookingProvider>
  );
};

export default Layout;
