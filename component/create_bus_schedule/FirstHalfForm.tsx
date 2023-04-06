import React, { memo } from "react";
import {
  Box,
  FormLabel,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { CreateBusProps } from "../types/interfaces";

function FirstHalfForm(props: CreateBusProps) {
  const { handleChange, inputScheduleRef, handleDateChange } = props;

  console.log("firstHalfForm");

  return (
    <Box component='div' className='container_schedule_form'>
      <FormLabel
        id='demo-radio-buttons-group-label'
        sx={{ margin: "10px !important" }}>
        Bus Schedule
      </FormLabel>
      <DateTimePicker
        ampmInClock
        ampm={true}
        disableMaskedInput
        renderInput={(props) => <TextField {...props} />}
        label='Date And Time'
        inputFormat='D/M/YYYY hh:mm A'
        value={inputScheduleRef.dateAndTime}
        onChange={handleDateChange}
      />
      <FormLabel
        id='demo-radio-buttons-group-label'
        sx={{ margin: "10px !important" }}>
        Select Coach Type
      </FormLabel>
      <FormControl sx={{ width: "100%" }}>
        <InputLabel id='CoachType' size='small'>
          Coach Type
        </InputLabel>
        <Select
          size='small'
          labelId='CoachType'
          fullWidth
          id='select'
          label='Coach Type'
          name='coachType'
          value={inputScheduleRef.coachType}
          onChange={handleChange}>
          <MenuItem value='Ac'>Ac</MenuItem>
          <MenuItem value='None-Ac'>None-Ac</MenuItem>
        </Select>
      </FormControl>
      <FormLabel
        id='demo-radio-buttons-group-label'
        sx={{ marginTop: "10px !important" }}>
        Coach No
      </FormLabel>
      <TextField
        value={inputScheduleRef.coachNo}
        required
        fullWidth
        size='small'
        label='Coach No '
        name='coachNo'
        autoComplete='coachNo'
        autoFocus
        onChange={handleChange}
      />
      <FormLabel
        id='demo-radio-buttons-group-label'
        sx={{ marginTop: "10px !important" }}>
        Starting Counter
      </FormLabel>
      <TextField
        value={inputScheduleRef.startingCounter}
        required
        fullWidth
        size='small'
        label='Starting Counter '
        name='startingCounter'
        autoComplete='startingCounter'
        autoFocus
        onChange={handleChange}
      />
      <FormLabel
        id='demo-radio-buttons-group-label'
        sx={{ marginTop: "10px !important" }}>
        End Counter
      </FormLabel>
      <TextField
        value={inputScheduleRef.endCounter}
        required
        fullWidth
        size='small'
        label='End Counter'
        name='endCounter'
        autoComplete='endCounter'
        autoFocus
        onChange={handleChange}
      />
    </Box>
  );
}

export default FirstHalfForm;
