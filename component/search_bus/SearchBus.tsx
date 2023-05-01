import React, { useCallback } from "react";
import { Box, TextField, Button } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import ScheduleContext from "../../context/ScheduleContext";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import axios from "axios";

type SearchBusTypes = {
  livingFrom: string;
  goingTo: string;
  date: string | null;
};

function SearchBus() {
  const { schedules } = React.useContext(ScheduleContext);
  const [searchBus, setSearchBus] = React.useState<SearchBusTypes>({
    livingFrom: "",
    goingTo: "",
    date: "",
  });
  const [value, setValue] = React.useState<Dayjs | null>(dayjs().add(0, "day"));

  const handleChange = (event: SelectChangeEvent) => {
    setSearchBus({
      ...searchBus,
      [event.target.name]: event.target.value as string,
    });
  };

  const uri: string = "http://localhost:3000/api/schedule/findSchedules";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { livingFrom, goingTo, date } = searchBus;
    axios
      .post(uri, {
        livingFrom,
        goingTo,
        date,
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  const setDate = (value: Dayjs) => {
    setValue(value);
    setSearchBus({ ...searchBus, date: value?.format("DD-MM-YYYY") as string });
  };

  return (
    <Box
      component='form'
      className='search_form_container'
      onSubmit={handleSubmit}>
      <FormControl>
        <InputLabel id='demo-simple-select-label' size='small'>
          Living From
        </InputLabel>
        <Select
          size='small'
          sx={{ width: "200px" }}
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          name='livingFrom'
          value={searchBus.livingFrom}
          label='Living from'
          onChange={handleChange}>
          <MenuItem value='Dhaka'>Dhaka</MenuItem>
          <MenuItem value='Chittagong'>Chittagong</MenuItem>
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel id='demo-simple-select-label' size='small'>
          Going To
        </InputLabel>
        <Select
          size='small'
          sx={{ width: "200px" }}
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          name='goingTo'
          value={searchBus.goingTo}
          label='Living from'
          onChange={handleChange}>
          <MenuItem value='Dhaka'>Dhaka</MenuItem>
          <MenuItem value='Chittagong'>Chittagong</MenuItem>
        </Select>
      </FormControl>
      <DatePicker
        disableMaskedInput
        inputFormat='D/M/YYYY'
        label='Select Date'
        value={value}
        onChange={(newValue) => setDate(newValue as Dayjs)}
        renderInput={(params) => <TextField {...params} />}
      />
      <Button variant='outlined' type='submit' className='search_form_btn'>
        Search
      </Button>
    </Box>
  );
}

export default SearchBus;
