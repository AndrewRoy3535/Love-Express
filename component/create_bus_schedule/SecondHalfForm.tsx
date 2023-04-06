import React, { useContext, useState } from "react";
import {
  Box,
  FormLabel,
  TextField,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { CreateBusProps } from "../types/interfaces";
import ScheduleContext from "../../context/ScheduleContext";

function SecondHalfForm(props: CreateBusProps) {
  const { inputScheduleRef, handleChange } = props;

  const { handleOpenSchedules, schedules, isSuccSdl } =
    useContext(ScheduleContext);

  const [isFareValid, setIsFareValid] = useState(true);

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (event.target.name === "fare") {
      const isString = /^[a-zA-Z]+$/.test(event.target.value);
      setIsFareValid(!isString);
    }
  };

  return (
    <Box component='div' className='container_schedule_form'>
      <FormLabel
        id='demo-radio-buttons-group-label'
        sx={{ marginTop: "10px !important" }}>
        Registration Number
      </FormLabel>
      <TextField
        value={inputScheduleRef.registrationNumber}
        size='small'
        fullWidth
        label='Registration Number'
        name='registrationNumber'
        autoComplete='registrationNumber'
        autoFocus
        onChange={handleChange}
      />
      <FormLabel
        id='demo-radio-buttons-group-label'
        sx={{ margin: "10px !important" }}>
        Select Coach Class
      </FormLabel>
      <FormControl sx={{ width: "100%" }}>
        <InputLabel id='CoachClass' size='small'>
          Coach Class
        </InputLabel>
        <Select
          size='small'
          labelId='CoachClass'
          fullWidth
          required
          id='select_1'
          label='Coach Class'
          name='coachClass'
          value={inputScheduleRef.coachClass}
          onChange={handleChange}>
          <MenuItem value='E-Class'>E-Class</MenuItem>
          <MenuItem value='S-Class'>S-Class</MenuItem>
        </Select>
      </FormControl>
      <FormLabel
        id='demo-radio-buttons-group-label'
        sx={{ marginTop: "10px !important" }}>
        Fare/Price
      </FormLabel>
      <TextField
        error={!isFareValid}
        helperText={isFareValid ? "" : "Fare should be a number"}
        required
        onBlur={handleBlur}
        value={inputScheduleRef.fare}
        size='small'
        fullWidth
        name='fare'
        autoComplete='fare'
        autoFocus
        placeholder='ex: 1400'
        onChange={handleChange}
      />
      <FormControl fullWidth sx={{ marginTop: "10px" }} required>
        <InputLabel id='demo-simple-select-label' size='small'>
          Living from
        </InputLabel>
        <Select
          required
          size='small'
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          name='livingFrom'
          value={inputScheduleRef.livingFrom}
          label='Living from'
          onChange={handleChange}>
          <MenuItem value='Dhaka'>Dhaka</MenuItem>
          <MenuItem value='Chittagong'>Chittagong</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ marginTop: "10px" }} required>
        <InputLabel id='demo-simple-select-label' size='small'>
          Going To
        </InputLabel>
        <Select
          required
          size='small'
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          name='goingTo'
          value={inputScheduleRef.goingTo}
          label='Living from'
          onChange={handleChange}>
          <MenuItem value='Dhaka'>Dhaka</MenuItem>
          <MenuItem value='Chittagong'>Chittagong</MenuItem>
        </Select>
      </FormControl>
      <Typography
        sx={{
          margin: 1,
          fontSize: "14px",
          fontWeight: "bold",
          color: "#66749c",
        }}></Typography>
      <Box component='div' sx={{ gap: 1, display: "flex" }}>
        <Button
          type='submit'
          variant='outlined'
          color='primary'
          sx={{ marginTop: 1 }}>
          Create
        </Button>
        {schedules.length > 0 && (
          <Button
            onClick={handleOpenSchedules}
            type='button'
            variant='outlined'
            color='primary'
            sx={{ marginTop: 1 }}>
            Schedules
          </Button>
        )}
      </Box>
      {isSuccSdl && (
        <Box
          sx={{
            marginTop: "5px",
            color: "green",
            fontWeight: 300,
            fontSize: "14px",
          }}>
          <p>Successfully created schedule!</p>
        </Box>
      )}
    </Box>
  );
}

export default SecondHalfForm;
