import React from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import ScheduleContext from "../../context/ScheduleContext";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { useSession } from "next-auth/react";

type Props = {
  destinations: Array<{ place: string; _id: string }>;
};

function SearchBus({ destinations }: Props) {
  const { handleSubmitsb, searchBus, setSearchBus, totalTodaySale } =
    React.useContext(ScheduleContext);

  const { data: session } = useSession();

  const [value, setValue] = React.useState<Dayjs | null>(dayjs().add(0, "day"));

  const handleChange = (event: SelectChangeEvent) => {
    setSearchBus({
      ...searchBus,
      [event.target.name]: event.target.value as string,
    });
  };

  const setDate = (value: Dayjs) => {
    setValue(value);
    setSearchBus({ ...searchBus, date: value?.format("DD-MM-YYYY") as string });
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
          onChange={handleChange}
          MenuProps={{
            PaperProps: {
              className: "inputfieldClass",
            },
          }}>
          {destinations.map((el, i) => {
            return (
              <MenuItem key={el._id} value={el.place}>
                {el.place}
              </MenuItem>
            );
          })}
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
          onChange={handleChange}
          MenuProps={{
            PaperProps: {
              className: "inputfieldClass",
            },
          }}>
          {destinations.map((el, i) => {
            return (
              <MenuItem key={el._id} value={el.place}>
                {el.place}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <DatePicker
        disableMaskedInput
        inputFormat='D/M/YYYY'
        label='Select Date'
        value={value}
        disablePast={session?.user?._doc.admin ? false : true}
        onChange={(newValue) => setDate(newValue as Dayjs)}
        renderInput={(params) => <TextField {...params} />}
      />
      <Button
        variant='outlined'
        className='search_form_btn'
        onClick={handleSubmitsb}>
        Search
      </Button>
      <Typography className='todaySale'>
        Total Purchase: {totalTodaySale} tk/=
      </Typography>
    </Box>
  );
}

export default SearchBus;
