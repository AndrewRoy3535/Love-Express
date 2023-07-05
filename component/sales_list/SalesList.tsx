import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";
import BookingContext from "../../context/BookingContext";
import { formatedCreatedDate, fomattedDate } from "../../utils/utility";

export default function SalesList() {
  const { passenger } = React.useContext(BookingContext);

  if (!Array.isArray(passenger)) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          height: "60vh",
        }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <TableContainer>
      <Table aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell align='left' className='fontStyle'>
              Name
            </TableCell>
            <TableCell align='center' className='fontStyle'>
              Seats
            </TableCell>
            <TableCell align='center' className='fontStyle'>
              Mobile
            </TableCell>
            <TableCell align='center' className='fontStyle'>
              Journey Date
            </TableCell>
            <TableCell align='center' className='fontStyle'>
              Living From
            </TableCell>
            <TableCell align='center' className='fontStyle'>
              Going To
            </TableCell>
            <TableCell align='center' className='fontStyle'>
              Total Purchase
            </TableCell>
            <TableCell align='right' className='fontStyle'>
              email
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {passenger.map((row: any) => {
            if (formatedCreatedDate(row.createdAt) === fomattedDate()) {
              return (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component='th' scope='row'>
                    {row.passengername}
                  </TableCell>
                  <TableCell align='center'>
                    {row.seats.slice(" ").join(", ")}
                  </TableCell>
                  <TableCell align='center'>{row.mobile}</TableCell>
                  <TableCell align='center'>{row.scheduleId.date}</TableCell>
                  <TableCell align='center'>
                    {row.scheduleId.livingFrom}
                  </TableCell>
                  <TableCell align='center'>{row.scheduleId.goingTo}</TableCell>
                  <TableCell align='center'>{row.totalamonut}</TableCell>
                  <TableCell align='right'>{row.email}</TableCell>
                </TableRow>
              );
            }
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
