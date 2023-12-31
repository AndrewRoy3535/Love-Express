import React, { useMemo, useCallback, useContext, Fragment } from "react";
import { Box, SelectChangeEvent } from "@mui/material";
import dayjs from "dayjs";
import FirstHalfForm from "./FirstHalfForm";
import SecondHalfForm from "./SecondHalfForm";
import ScheduleContext from "../../context/ScheduleContext";
import { SetBusScheduleType } from "../types/interfaces";
import ModalScheduleList from "../modals/ModalScheduleList";
import axios from "axios";
import { apiUri } from "../../utils/utility";

type Props = {
  destinations: Array<{ place: string; _id: string }>;
};

const CreateBusSchedule = ({ destinations }: Props) => {
  const { busSchedule, setBusSchedule, setIsSuccSdl, fetchDataSchedule } =
    useContext<SetBusScheduleType>(ScheduleContext);

  const inputScheduleRef = useMemo(() => busSchedule, [busSchedule]);

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
          setBusSchedule((prevState) => {
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    axios
      .post(`${apiUri}/api/schedule/schedules`, {
        date: busSchedule.dateAndTime?.format("DD-MM-YYYY") as string,
        time: busSchedule.dateAndTime?.format("HH:mm") as string,
        coachType: inputScheduleRef.coachType,
        coachCategory: inputScheduleRef.coachCategory,
        coachNo: inputScheduleRef.coachNo,
        startingCounter: inputScheduleRef.startingCounter,
        endCounter: inputScheduleRef.endCounter,
        registrationNumber: inputScheduleRef.registrationNumber,
        coachClass: inputScheduleRef.coachClass,
        fare: inputScheduleRef.fare,
        livingFrom: inputScheduleRef.livingFrom,
        goingTo: inputScheduleRef.goingTo,
      })
      .then((res) => console.log(res))
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        console.log(error.config);
      });

    setBusSchedule({
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

    setIsSuccSdl(true);
    setTimeout(() => {
      setIsSuccSdl(false);
    }, 5000);
    fetchDataSchedule();
  };

  const handleDateChange = useCallback((date: Date | null) => {
    if (date) {
      setBusSchedule({ ...busSchedule, dateAndTime: dayjs(date) });
    } else {
      setBusSchedule({ ...busSchedule, dateAndTime: null });
    }
  }, []);

  return (
    <Fragment>
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
          destinations={destinations}
        />
      </Box>
      <ModalScheduleList />
    </Fragment>
  );
};
export default CreateBusSchedule;
