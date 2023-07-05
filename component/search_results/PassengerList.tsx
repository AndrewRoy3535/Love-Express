import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Typography } from "@mui/material";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";
import ScheduleContext from "../../context/ScheduleContext";

export default function PassengerList({ passengers }: any) {
  const { handleSubmitsb } = React.useContext(ScheduleContext);

  const deletePass = (_id: string) => {
    axios
      .delete("api/bookings", {
        data: { id: _id },
      })
      .catch((er) => console.log(er));
    handleSubmitsb();
  };

  let totalSale = 0;

  for (var i = 0; i < passengers.length; i++) {
    totalSale += passengers[i].totalamonut;
  }

  return (
    <Box>
      <Box padding='5px'>
        <Typography>Passenger List</Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align='right'>Mobile</TableCell>
              <TableCell align='right'>Seats</TableCell>
              <TableCell align='right'>Email</TableCell>
              <TableCell align='right'>TotalPrice</TableCell>
              <TableCell align='right'>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {passengers?.map((row: any) => (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component='th' scope='row'>
                  {row.passengername}
                </TableCell>
                <TableCell align='right'>{row.mobile}</TableCell>
                <TableCell align='right'>
                  {row.seats.slice(" ").join(", ")}
                </TableCell>
                <TableCell align='right'>{row.email}</TableCell>
                <TableCell align='right'>{row.totalamonut}</TableCell>
                <TableCell align='right'>
                  <Button color='warning' onClick={() => deletePass(row._id)}>
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            <Typography style={{ padding: "5px" }}>
              Total Sale: {totalSale} tk/=
            </Typography>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
