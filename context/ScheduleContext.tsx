import React, { createContext, useState } from "react";
import dayjs from "dayjs";
import { CreateBusType } from "../component/types/types";
import { SetBusScheduleType } from "../component/types/interfaces";

const ScheduleContext = createContext<SetBusScheduleType>({
  busSchedule: {
    dateAndTime: dayjs().add(1, "day"),
    date: "",
    time: "",
    coachType: "",
    coachNo: "",
    startingCounter: "",
    endCounter: "",
    registrationNumber: "",
    coachClass: "",
    fare: 0,
    sold: 0,
    booked: 0,
    available: 40,
    livingFrom: "",
    goingTo: "",
  },
  setBusSchedule: () => {},
  schedules: [
    {
      dateAndTime: dayjs().add(1, "day"),
      date: "",
      time: "",
      coachType: "",
      coachNo: "",
      startingCounter: "",
      endCounter: "",
      registrationNumber: "",
      coachClass: "",
      fare: 0,
      sold: 0,
      booked: 0,
      available: 40,
      livingFrom: "",
      goingTo: "",
    },
  ],
  setSchedules: () => [{}],
  showSchedules: false,
  setShowSchedules: () => {},
  handleOpenSchedules: () => {},
  handleCloseSchedules: () => {},
  isSuccSdl: false,
  setIsSuccSdl: () => {},
});

export default ScheduleContext;

export const BusScheduleProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [busSchedule, setBusSchedule] = useState<CreateBusType>({
    dateAndTime: dayjs().add(1, "day"),
    date: "",
    time: "",
    coachType: "",
    coachNo: "",
    startingCounter: "",
    endCounter: "",
    registrationNumber: "",
    coachClass: "",
    fare: 0,
    sold: 0,
    booked: 0,
    available: 40,
    livingFrom: "",
    goingTo: "",
  });

  const [schedules, setSchedules] = useState<CreateBusType[]>([]);
  const [showSchedules, setShowSchedules] = useState<boolean>(false);
  const [isSuccSdl, setIsSuccSdl] = useState<boolean>(false);
  const handleOpenSchedules = () => setShowSchedules(true);
  const handleCloseSchedules = () => {
    setShowSchedules(false);
  };

  return (
    <ScheduleContext.Provider
      value={{
        busSchedule,
        setBusSchedule,
        schedules,
        setSchedules,
        showSchedules,
        setShowSchedules,
        handleOpenSchedules,
        handleCloseSchedules,
        isSuccSdl,
        setIsSuccSdl,
      }}>
      {children}
    </ScheduleContext.Provider>
  );
};
