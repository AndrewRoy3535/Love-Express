import React, { useState, useCallback, useMemo, useContext } from "react";
import {
  Button,
  FormControlLabel,
  Radio,
  Box,
  TextField,
  FormLabel,
} from "@mui/material";
import UserContext from "../../context/UserContext";
import ModalUserList from "../modals/ModalUserList";
import axios from "axios";

const CreateUser = () => {
  const { user, setUser, users, setUsers, handleOpenUsers } =
    useContext(UserContext);

  const [isMatch, setIsMatch] = useState<boolean>(true);
  const [isSuccessful, setIsSuccessful] = useState<boolean>(false);

  const inputUserRef = useMemo(() => user, [user]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (user.password !== user.confirmpassword) {
      setIsMatch(false);
      setIsSuccessful(false);
    } else {
      setIsMatch(true);
      await axios
        .post("http://localhost:3000/api/users", {
          name: inputUserRef.name,
          password: inputUserRef.password,
          admin: inputUserRef.admin,
        })
        .then((res) => console.log(res))
        .catch((error) => {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }
          console.log(error.config);
        });
      setIsSuccessful(true);
      setUser({ name: "", password: "", confirmpassword: "", admin: false });
    }
  };

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setUser({ ...user, [event.target.name]: event.target.value });
    },
    [user]
  );
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, admin: event.target.value === "true" });
  };

  console.log("CreateUeser");

  return (
    <Box component='form' className='container_user' onSubmit={handleSubmit}>
      <FormLabel
        id='demo-radio-buttons-group-label'
        sx={{ marginTop: "10px !important" }}>
        Create new user name
      </FormLabel>
      <TextField
        value={inputUserRef.name}
        size='small'
        margin='dense'
        required
        label='New user'
        name='name'
        autoComplete='name'
        autoFocus
        onChange={handleChange}
      />
      <FormLabel
        id='demo-radio-buttons-group-label'
        sx={{ marginTop: "10px !important" }}>
        Create new user password
      </FormLabel>
      <TextField
        value={inputUserRef.password}
        size='small'
        margin='dense'
        type='password'
        required
        id='password'
        label='Password'
        name='password'
        error={!isMatch}
        autoFocus
        onChange={handleChange}
      />
      <TextField
        value={inputUserRef.confirmpassword}
        size='small'
        margin='dense'
        type='password'
        required
        id='confirmpassword'
        label='Confirm Password'
        name='confirmpassword'
        error={!isMatch}
        autoFocus
        onChange={handleChange}
      />
      <FormLabel
        id='demo-radio-buttons-group-label'
        sx={{ marginTop: "10px !important" }}>
        Select as admin
      </FormLabel>
      <FormControlLabel
        control={
          <Radio
            checked={inputUserRef.admin}
            onChange={handleRadioChange}
            value='true'
            name='isChecked'
          />
        }
        label='Yes'
      />
      <FormControlLabel
        control={
          <Radio
            checked={!inputUserRef.admin}
            onChange={handleRadioChange}
            value='false'
            name='isChecked'
          />
        }
        label='No'
      />
      <Box component='div' sx={{ display: "flex", gap: 1 }}>
        <Button type='submit' variant='outlined' color='primary'>
          Create
        </Button>
        {users.length > 0 && (
          <Button
            type='button'
            onClick={handleOpenUsers}
            variant='outlined'
            color='primary'>
            Users
          </Button>
        )}
      </Box>
      {isMatch ? (
        <></>
      ) : (
        <Box
          sx={{
            marginTop: "5px",
            color: "red",
            fontWeight: 300,
            fontSize: "14px",
          }}>
          <p>Password does not match!</p>
        </Box>
      )}
      {isSuccessful && (
        <Box
          sx={{
            marginTop: "5px",
            color: "green",
            fontWeight: 300,
            fontSize: "14px",
          }}>
          <p>Successfully created a new user !</p>
        </Box>
      )}
      <ModalUserList />
    </Box>
  );
};

export default CreateUser;
