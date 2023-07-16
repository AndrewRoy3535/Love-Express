import React from "react";
import {
  Box,
  FormLabel,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  Button,
  Typography,
} from "@mui/material";
import { BookingContextType } from "../types/types";
import axios from "axios";
import ScheduleContext from "../../context/ScheduleContext";
import BookingContext from "../../context/BookingContext";
import { apiUri } from "../../utils/utility";

function CustomerForm({
  passenger,
  setPassenger,
  scheduleId,
  totalPrice,
}: BookingContextType) {
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent
  ) => {
    e.preventDefault();
    const { name, value } = e.target;
    setPassenger((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const { handleSubmitsb } = React.useContext(ScheduleContext);
  const { fetchBooking } = React.useContext(BookingContext);
  const [btnstate, setBtnSate] = React.useState(true);
  const [seatwarning, setSeatwarning] = React.useState(false);
  const customerFromSubmit = async (e: React.FocusEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBtnSate(false);
    if (passenger.seats.length === 0) {
      setSeatwarning(true);
      setBtnSate(true);
      return;
    }
    try {
      await axios
        .post(`${apiUri}/api/bookings`, {
          scheduleId,
          passengername: passenger.passengername,
          gender: passenger.gender,
          address: passenger.address,
          boardngpoint: passenger.boardngpoint,
          dropingpoint: passenger.dropingpoint,
          totalamonut: totalPrice,
          mobile: passenger.mobile,
          email: passenger.email,
          age: passenger.age,
          seats: passenger.seats,
          cancel: passenger.cancel,
        })
        .then((res) => {
          const { scheduleId } = res.data;
          const idd = res.data.id;

          axios.patch(`${apiUri}/api/schedule/${scheduleId}`, {
            id: scheduleId,
            passengersId: idd,
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }

    setPassenger({
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
    setTimeout(() => {
      handleSubmitsb();
      if (fetchBooking !== undefined) fetchBooking();
    }, 1000);
    setSeatwarning(false);
    setBtnSate(true);
  };

  return (
    <Box
      component='form'
      className='container_schedule_form'
      onSubmit={customerFromSubmit}>
      <TextField
        required
        fullWidth
        size='small'
        label='Passenger Name'
        autoComplete='coachNo'
        autoFocus
        name='passengername'
        value={passenger.passengername}
        onChange={handleChange}
      />
      <FormControl sx={{ width: "100%" }}>
        <InputLabel id='CoachType' size='small'>
          Gender
        </InputLabel>
        <Select
          size='small'
          labelId='gender'
          fullWidth
          id='select'
          label='Gender'
          name='gender'
          value={passenger.gender}
          onChange={handleChange}>
          <MenuItem value='Male'>Male</MenuItem>
          <MenuItem value='Female'>Female</MenuItem>
          <MenuItem value='---'>---</MenuItem>
        </Select>
      </FormControl>
      <TextField
        required
        fullWidth
        size='small'
        label='Address'
        autoComplete='address'
        autoFocus
        name='address'
        value={passenger.address}
        onChange={handleChange}
      />
      <TextField
        required
        fullWidth
        size='small'
        label='Boarding point'
        autoComplete='boardngpoint'
        autoFocus
        name='boardngpoint'
        value={passenger.boardngpoint}
        onChange={handleChange}
      />

      <TextField
        required
        fullWidth
        size='small'
        label='Dropping point'
        autoComplete='dropingpoint'
        autoFocus
        name='dropingpoint'
        value={passenger.dropingpoint}
        onChange={handleChange}
      />

      <TextField
        required
        fullWidth
        size='small'
        label='Mobile no'
        autoComplete='mobile'
        autoFocus
        name='mobile'
        value={passenger.mobile}
        onChange={handleChange}
      />

      <TextField
        required
        fullWidth
        size='small'
        label='Email'
        autoComplete='email'
        autoFocus
        name='email'
        value={passenger.email}
        onChange={handleChange}
      />
      <TextField
        required
        fullWidth
        size='small'
        label='Age'
        autoComplete='age'
        autoFocus
        name='age'
        value={passenger.age}
        onChange={handleChange}
      />
      <Button
        type='submit'
        variant='outlined'
        color='inherit'
        style={{
          color: "#7f1d1d",
        }}
        disabled={btnstate ? false : true}>
        {btnstate ? "Submit" : "Proccessing..."}
      </Button>
      <Typography sx={{ textTransform: "uppercase" }} color='rgb(127, 29, 29)'>
        {seatwarning && "Seats are empty!"}
      </Typography>
    </Box>
  );
}

export default CustomerForm;
