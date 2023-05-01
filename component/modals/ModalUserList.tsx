import React, { useContext } from "react";
import { Box, Modal, Button } from "@mui/material";
import UserContext from "../../context/UserContext";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

const useStyles = makeStyles({
  table: {
    minWidth: 1224,
  },
  cell: {
    fontWeight: "bold",
  },
});

function ModalUserList() {
  const { handleCloseUsers, showUser, users, setUsers } =
    useContext(UserContext);

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

  const classes = useStyles();

  const handleDelete = async (row: { _id: string }): Promise<void> => {
    const { _id } = row;
    try {
      const response = await axios.delete("http://localhost:3000/api/users", {
        data: { id: _id },
      });
      console.log(response.data);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== _id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Modal
        open={showUser}
        onClose={handleCloseUsers}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box sx={style}>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              size='small'
              aria-label='a dense table'>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.cell}>Name</TableCell>
                  <TableCell align='right' className={classes.cell}>
                    Admin
                  </TableCell>
                  <TableCell align='right' className={classes.cell}>
                    Delete
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((row, index: number) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell component='th' scope='row'>
                      {row.name}
                    </TableCell>
                    {row.admin === true ? (
                      <TableCell align='right'>Yes</TableCell>
                    ) : (
                      <TableCell align='right'>No</TableCell>
                    )}
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
}

export default ModalUserList;
