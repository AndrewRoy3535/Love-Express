import React from "react";
import { Box, CircularProgress } from "@mui/material";

function Loading() {
  return (
    <Box
      display='flex'
      alignItems='center'
      justifyContent='center'
      height='100vh'>
      <CircularProgress />
    </Box>
  );
}

export default Loading;
