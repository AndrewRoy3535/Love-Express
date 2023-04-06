import React from "react";
import { Box, TextField, Button } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import ScheduleContext from "../../context/ScheduleContext";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from "dayjs";

function SearchBus() {
  const { schedules } = React.useContext(ScheduleContext);
  const [searchBus, setSearchBus] = React.useState({
    livingFrom: "",
    goingTo: "",
    date: "",
  });
  const [value, setValue] = React.useState<Dayjs | null>(null);

  const handleChange = (event: SelectChangeEvent) => {
    setSearchBus({
      ...searchBus,
      [event.target.name]: event.target.value as string,
    });
  };

  return (
    <Box component='form' className='search_form_container'>
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
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
      <Button variant='outlined' type='button' className='search_form_btn'>
        Search
      </Button>
    </Box>
  );
}

export default SearchBus;
