import React, { useContext } from "react";
import { Box, Button, Modal } from "@mui/material";
import ScheduleContext from "../../context/ScheduleContext";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";

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

const ModalScheduleList = () => {
  const { handleCloseSchedules, showSchedules, schedules, setSchedules } =
    useContext(ScheduleContext);

  const classes = useStyles();

  const handleDelete = async (row: { _id: string }): Promise<void> => {
    const { _id } = row;
    try {
      const response = await axios.delete(
        "http://localhost:3000/api/schedule/schedules",
        {
          data: { id: _id },
        }
      );
      console.log(response.data);
      setSchedules(schedules.filter((row) => row._id !== _id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Modal
        open={showSchedules}
        onClose={handleCloseSchedules}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box sx={style}>
          <TableContainer component={Paper}>
            <Table
              size='small'
              className={classes.table}
              aria-label='data table'>
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
                  <TableCell className={classes.cell} align='right'>
                    Delete
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {schedules.map((row) => (
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
                    <TableCell align='right'>
                      {row.registrationNumber}
                    </TableCell>
                    <TableCell align='right'>{row.livingFrom}</TableCell>
                    <TableCell align='right'>{row.goingTo}</TableCell>
                    <TableCell align='right'>
                      <Button
                        onClick={() => handleDelete(row as { _id: string })}>
                        <DeleteIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalScheduleList;
