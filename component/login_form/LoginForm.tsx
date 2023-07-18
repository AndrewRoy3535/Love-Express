import React, { useState, useContext } from "react";
import { Box, TextField, Button, Typography, FormLabel } from "@mui/material";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import BookingContext from "../../context/BookingContext";

function LoginForm() {
  const router = useRouter();
  const [loginInfo, setLoginInfo] = React.useState<{
    name: string;
    password: string;
  }>({
    name: "",
    password: "",
  });

  const [loginError, setloginError] = useState<boolean>(false);
  const { errorFromBooking } = useContext(BookingContext);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    const { name, value } = e.target;
    setLoginInfo((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    try {
      setloginError(false);
      const logInRes = await signIn("credentials", {
        redirect: false,
        name: loginInfo.name,
        password: loginInfo.password,
      });
      if (logInRes && !logInRes.ok) {
        setloginError(true);
      } else {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      component='form'
      onSubmit={handleSubmit}
      display='flex'
      justifyContent='center'
      alignItems='center'
      flexDirection='column'
      height='100vh'
      position='relative'
      overflow='hidden'
      sx={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <Head>
        <style>{`
          body {
            padding-top: 0 !important;
          }
        `}</style>
      </Head>
      <Image
        src={"/body_bg.jpeg"}
        width={0}
        height={0}
        sizes='100vw'
        alt='me'
        quality={50}
        style={{ width: "100%", position: "absolute", zIndex: -1 }}
      />
      <Typography>{errorFromBooking}</Typography>
      <Box
        className='frosty'
        display='flex'
        justifyContent='center'
        alignItems='center'
        flexDirection='column'
        gap={2}
        padding='10px'
        borderRadius='10px'>
        <Typography variant='h6' fontWeight='bold'>
          Employee Login
        </Typography>
        <Typography>Sign in with your provider name and password</Typography>
        {loginError && (
          <Typography color='#f67402' textAlign='center'>
            Wrong name or password
          </Typography>
        )}
        <Box display='flex' gap={1} flexDirection='column' width='100%'>
          <Box width='100%'>
            <FormLabel
              id='demo-radio-buttons-group-label'
              sx={{ width: "100%" }}>
              Name
            </FormLabel>
            <TextField
              fullWidth
              type='text'
              value={loginInfo.name}
              name='name'
              size='small'
              placeholder='Name'
              onChange={handleChange}
            />
          </Box>
          <Box width='100%'>
            <FormLabel
              id='demo-radio-buttons-group-label'
              sx={{ width: "100%" }}>
              Password
            </FormLabel>
            <TextField
              fullWidth
              type='password'
              value={loginInfo.password}
              name='password'
              size='small'
              placeholder='Password'
              onChange={handleChange}
            />
          </Box>
          <Button type='submit' variant='outlined' fullWidth>
            Login
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default LoginForm;
