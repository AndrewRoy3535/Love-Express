import React, { useMemo, useCallback, useContext } from "react";
import { Box, SelectChangeEvent } from "@mui/material";
import dayjs from "dayjs";
import FirstHalfForm from "./FirstHalfForm";
import SecondHalfForm from "./SecondHalfForm";
import ScheduleContext from "../../context/ScheduleContext";
import { SetBusScheduleType } from "../types/interfaces";
import ModalScheduleList from "../modals/ModalScheduleList";

const CreateBusSchedule = () => {
  const { busSchedule, setBusSchedule, schedules, setSchedules, setIsSuccSdl } =
    useContext<SetBusScheduleType>(ScheduleContext);

  const inputScheduleRef = useMemo(() => busSchedule, [busSchedule]);
  console.log(schedules);
  const handleChange = useCallback(
    (
      event:
        | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        | SelectChangeEvent
    ) => {
      if (busSchedule) {
        if (event.target.name) {
          setBusSchedule({
            ...busSchedule,
            [event.target.name]: event.target.value,
          });
        } else {
          const { value, name } = event.target;
          setBusSchedule((prevState: SetBusScheduleType) => {
            return {
              ...prevState,
              [name]: value,
            };
          });
        }
      }
    },
    [busSchedule]
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const schedule = {
      ...busSchedule,
      date: busSchedule.dateAndTime?.format("DD-MM-YYYY") as string,
      time: busSchedule.dateAndTime?.format("HH:mm") as string,
    };

    setSchedules([...schedules, schedule]);

    setBusSchedule({
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
      avaiable: 40,
      livingFrom: "",
      goingTo: "",
    });

    setIsSuccSdl(true);
    setTimeout(() => {
      setIsSuccSdl(false);
    }, 5000);
  };

  const handleDateChange = useCallback((date: Date | null) => {
    if (date) {
      setBusSchedule({ ...busSchedule, dateAndTime: dayjs(date) });
    } else {
      setBusSchedule({ ...busSchedule, dateAndTime: null });
    }
  }, []);

  return (
    <>
      <Box
        component='form'
        className='container_schedule'
        onSubmit={handleSubmit}>
        <FirstHalfForm
          handleChange={handleChange}
          handleDateChange={handleDateChange}
          inputScheduleRef={inputScheduleRef}
        />
        <SecondHalfForm
          handleChange={handleChange}
          inputScheduleRef={inputScheduleRef}
        />
      </Box>
      <ModalScheduleList />
    </>
  );
};
export default CreateBusSchedule;
