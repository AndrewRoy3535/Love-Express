import React, { createContext, useState, useEffect } from "react";
import dayjs from "dayjs";
import { CreateBusType } from "../component/types/types";
import { SetBusScheduleType } from "../component/types/interfaces";
import axios from "axios";

const ScheduleContext = createContext<SetBusScheduleType>({
  busSchedule: {
    dateAndTime: dayjs().add(1, "day"),
    date: "",
    time: "",
    coachType: "",
    coachCategory: "",
    coachNo: "",
    startingCounter: "",
    endCounter: "",
    registrationNumber: "",
    coachClass: "",
    fare: 0,
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
      coachCategory: "",
      coachNo: "",
      startingCounter: "",
      endCounter: "",
      registrationNumber: "",
      coachClass: "",
      fare: 0,
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

export const BusScheduleProvider: React.FC<React.PropsWithChildren> = (
  { children },
  props
) => {
  const [busSchedule, setBusSchedule] = useState<CreateBusType>({
    dateAndTime: dayjs().add(1, "day"),
    date: "",
    time: "",
    coachType: "",
    coachCategory: "",
    coachNo: "",
    startingCounter: "",
    endCounter: "",
    registrationNumber: "",
    coachClass: "",
    fare: 0,
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
  const uri: string = "http://localhost:3000/api/schedule/schedules";

  useEffect(() => {
    async function fetchData() {
      await axios
        .get(uri)
        .then((res) => {
          setSchedules(res.data);
        })
        .catch((e) => console.log(e));
    }
    fetchData();
  }, []);

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
