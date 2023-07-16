import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import BookingContext from "../../context/BookingContext";
import { formatedCreatedDate, fomattedDate } from "../../utils/utility";
import ScheduleContext from "../../context/ScheduleContext";
import Loading from "../loading/Loading";

export default function SalesList() {
  const { passenger } = React.useContext(BookingContext);
  const { setTotalTodaySale } = React.useContext(ScheduleContext);

  React.useEffect(() => {
    if (Array.isArray(passenger)) {
      const sum = passenger.reduce(
        (accumulator, row) =>
          formatedCreatedDate(row.createdAt) === fomattedDate()
            ? accumulator + row.totalamonut
            : accumulator,
        0
      );
      setTotalTodaySale(sum);
    }
  }, [passenger]);

  if (!Array.isArray(passenger)) {
    return <Loading />;
  }

  return (
    <TableContainer className='tableStyle'>
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
              Coach No
            </TableCell>
            <TableCell align='right' className='fontStyle'>
              email
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {passenger?.map((row: any) => {
            if (formatedCreatedDate(row.createdAt) === fomattedDate()) {
              return (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell
                    component='th'
                    scope='row'
                    className='fontStyleInfo'>
                    {row.passengername}
                  </TableCell>
                  <TableCell align='center' className='fontStyleInfo'>
                    {row.seats.slice(" ").join(", ")}
                  </TableCell>
                  <TableCell align='center' className='fontStyleInfo'>
                    {row.mobile}
                  </TableCell>
                  <TableCell align='center' className='fontStyleInfo'>
                    {row.scheduleId?.date}
                  </TableCell>
                  <TableCell align='center' className='fontStyleInfo'>
                    {row.scheduleId?.livingFrom}
                  </TableCell>
                  <TableCell align='center' className='fontStyleInfo'>
                    {row.scheduleId?.goingTo}
                  </TableCell>
                  <TableCell align='center' className='fontStyleInfo'>
                    {row.totalamonut}
                  </TableCell>
                  <TableCell align='right' className='fontStyleInfo'>
                    {row.scheduleId?.coachNo}
                  </TableCell>
                  <TableCell align='right' className='fontStyleInfo'>
                    {row.email}
                  </TableCell>
                </TableRow>
              );
            }
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
