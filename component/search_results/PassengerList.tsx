import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Typography } from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";
import ScheduleContext from "../../context/ScheduleContext";
import { useSession } from "next-auth/react";
import { apiUri } from "../../utils/utility";

export default function PassengerList({ passengers }: any) {
  const { handleSubmitsb } = React.useContext(ScheduleContext);
  const { data: session } = useSession();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage: any = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const deletePass = (_id: string) => {
    axios
      .delete(`${apiUri}/api/bookings`, {
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
      <TableContainer component={Paper} className='passengerList'>
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell className='fontStyle'>Name</TableCell>
              <TableCell align='center' className='fontStyle'>
                Mobile
              </TableCell>
              <TableCell align='center' className='fontStyle'>
                Seats
              </TableCell>
              <TableCell align='center' className='fontStyle'>
                Email
              </TableCell>
              <TableCell align='center' className='fontStyle'>
                TotalPrice
              </TableCell>
              <TableCell align='right' className='fontStyle'>
                Delete
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {passengers
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: any) => (
                <TableRow
                  className='fontStyleInfo'
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell
                    component='th'
                    scope='row'
                    className='fontStyleInfo'>
                    {row.passengername}
                  </TableCell>
                  <TableCell align='center' className='fontStyleInfo'>
                    {row.mobile}
                  </TableCell>
                  <TableCell align='center' className='fontStyleInfo'>
                    {row.seats.slice(" ").join(", ")}
                  </TableCell>
                  <TableCell align='center' className='fontStyleInfo'>
                    {row.email}
                  </TableCell>
                  <TableCell align='center' className='fontStyleInfo'>
                    {row.totalamonut}
                  </TableCell>
                  <TableCell align='right'>
                    <Button
                      disabled={!session?.user?.admin ? true : false}
                      color='warning'
                      onClick={() => deletePass(row._id)}>
                      <DeleteIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 40]}
        component='div'
        count={passengers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Typography
        style={{ padding: "5px" }}
        textAlign='right'
        textTransform='uppercase'>
        Total Sale: {totalSale} tk/=
      </Typography>
    </Box>
  );
}
