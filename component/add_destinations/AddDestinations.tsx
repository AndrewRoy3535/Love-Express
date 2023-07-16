import React, { Dispatch, SetStateAction } from "react";
import { Box, Input, Button, Typography } from "@mui/material";
import axios from "axios";
import DeleteIcon from "@material-ui/icons/Delete";

type Props = {
  fetchDes: () => Promise<void>;
  addDes: () => Promise<void>;
  changevalue: string;
  setChangevalue: React.Dispatch<React.SetStateAction<string>>;
  destination: Array<{ place: string; _id: string }>;
};

function AddDestinations({
  fetchDes,
  addDes,
  setChangevalue,
  changevalue,
  destination,
}: Props) {
  const deleteDes = async (_id: string) => {
    await axios
      .delete("api/destinations", {
        data: { id: _id },
      })
      .catch((err) => console.log(err));
    fetchDes();
  };

  React.useEffect(() => {
    fetchDes();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setChangevalue(e.target.value);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 5,
        margin: "10px",
        backgroundColor: "white",
        padding: 2,
        borderRadius: 3,
      }}>
      <Box
        sx={{
          border: "1px solid #ccc",
          borderRadius: 2,
          width: "50%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "5px",
        }}>
        {destination?.map((des, i) => {
          return (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                border: "1px solid #ccc",
                marginBottom: 1,
                justifyContent: "space-between",
                borderRadius: 2,
                padding: 1,
              }}
              key={des._id}>
              <Typography>{des.place}</Typography>
              <Button
                color='warning'
                disabled={i === 0 ? true : false}
                onClick={() => deleteDes(des._id)}>
                <DeleteIcon />
              </Button>
            </Box>
          );
        })}
      </Box>
      <Box
        sx={{
          margin: "5px",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "20%",
        }}>
        <Input
          placeholder='Add place'
          value={changevalue}
          onChange={handleChange}
        />
        <Button variant='outlined' onClick={addDes}>
          Add
        </Button>
      </Box>
    </Box>
  );
}

export default AddDestinations;
