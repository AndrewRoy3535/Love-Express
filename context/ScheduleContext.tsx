import React, { createContext, useState, useEffect } from "react";
import dayjs from "dayjs";
import { CreateBusType, SearchBusTypes } from "../component/types/types";
import { SetBusScheduleType } from "../component/types/interfaces";
import axios from "axios";
import { useRouter } from "next/router";

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
  searchedBusData: [
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
  setSearchedBusData: () => {},
  handleSubmitsb: async () => {},
  searchBus: {
    livingFrom: "",
    goingTo: "",
    date: "",
  },
  setSearchBus: () => {},
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
  const [searchedBusData, setSearchedBusData] = useState<[CreateBusType]>([
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
  ]);
  const [searchBus, setSearchBus] = React.useState<SearchBusTypes>({
    livingFrom: "",
    goingTo: "",
    date: "",
  });

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

  const router = useRouter();
  const urifindSche: string = "/api/schedule/findSchedules";
  const handleSubmitsb = async () => {
    const { livingFrom, goingTo, date } = searchBus;
    axios
      .post(urifindSche, {
        livingFrom,
        goingTo,
        date,
      })
      .then((res) => {
        setSearchedBusData(res.data);
        router.push("/searches");
      })
      .catch((err) => console.log(err));
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
        searchedBusData,
        setSearchedBusData,
        handleSubmitsb,
        searchBus,
        setSearchBus,
      }}>
      {children}
    </ScheduleContext.Provider>
  );
};
