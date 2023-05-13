import React from "react";
import { CreateBusType, SearchedDataType } from "../types/types";
import {
  Box,
  TableContainer,
  TableHead,
  Table,
  TableRow,
  TableCell,
  Paper,
  TableBody,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "1px solid #000",
  borderRadius: "10px",
  boxShadow: 24,
  p: 2,
};

const useStyles = makeStyles({
  table: {
    minWidth: 1224,
  },
  cell: {
    fontWeight: "bold",
  },
});

function SearchedData({ data }: SearchedDataType) {
  const classes = useStyles();

  return (
    <Box sx={style}>
      <TableContainer component={Paper}>
        <Table size='small' className={classes.table} aria-label='data table'>
          <TableHead>
            <TableRow>
              <TableCell className={classes.cell}>Date</TableCell>
              <TableCell className={classes.cell} align='right'>
                Time
              </TableCell>
              <TableCell className={classes.cell} align='right'>
                Starting counter
              </TableCell>
              <TableCell className={classes.cell} align='right'>
                Ending counter
              </TableCell>
              <TableCell className={classes.cell} align='right'>
                Fare
              </TableCell>
              <TableCell className={classes.cell} align='right'>
                Coach type
              </TableCell>
              <TableCell className={classes.cell} align='right'>
                Coach Category
              </TableCell>
              <TableCell className={classes.cell} align='right'>
                Coach class
              </TableCell>
              <TableCell className={classes.cell} align='right'>
                Reg no.
              </TableCell>
              <TableCell className={classes.cell} align='right'>
                From
              </TableCell>
              <TableCell className={classes.cell} align='right'>
                To
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row: CreateBusType) => (
              <TableRow key={row._id}>
                <TableCell component='th' scope='row'>
                  {row.date}
                </TableCell>
                <TableCell align='right'>{row.time}</TableCell>
                <TableCell align='right'>{row.startingCounter}</TableCell>
                <TableCell align='right'>{row.endCounter}</TableCell>
                <TableCell align='right'>{row.fare}</TableCell>
                <TableCell align='right'>{row.coachType}</TableCell>
                <TableCell align='right'>{row.coachCategory}</TableCell>
                <TableCell align='right'>{row.coachClass}</TableCell>
                <TableCell align='right'>{row.registrationNumber}</TableCell>
                <TableCell align='right'>{row.livingFrom}</TableCell>
                <TableCell align='right'>{row.goingTo}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default SearchedData;
