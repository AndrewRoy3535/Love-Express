import React, { useContext } from "react";
import BookingContext from "../../context/BookingContext";
import {
  Box,
  FormLabel,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";

function CustomerForm() {
  const { passenger, setPassenger } = useContext(BookingContext);

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

  return (
    <Box component='div' className='container_schedule_form'>
      <FormLabel
        id='demo-radio-buttons-group-label'
        sx={{ marginTop: "10px !important" }}>
        Passenger Name
      </FormLabel>
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
      <FormControl sx={{ width: "100%", marginTop: "15px" }}>
        <InputLabel id='CoachType' size='small'>
          Coach Type
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
      <FormLabel
        id='demo-radio-buttons-group-label'
        sx={{ marginTop: "10px !important" }}>
        Address
      </FormLabel>
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
      <FormLabel
        id='demo-radio-buttons-group-label'
        sx={{ marginTop: "10px !important" }}>
        Boarding point
      </FormLabel>
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
      <FormLabel
        id='demo-radio-buttons-group-label'
        sx={{ marginTop: "10px !important" }}>
        Dropping point
      </FormLabel>
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
      <FormLabel
        id='demo-radio-buttons-group-label'
        sx={{ marginTop: "10px !important" }}>
        Mobile no
      </FormLabel>
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
      <FormLabel
        id='demo-radio-buttons-group-label'
        sx={{ marginTop: "10px !important" }}>
        Email
      </FormLabel>
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
      <FormLabel
        id='demo-radio-buttons-group-label'
        sx={{ marginTop: "10px !important" }}>
        Age
      </FormLabel>
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
    </Box>
  );
}

export default CustomerForm;
