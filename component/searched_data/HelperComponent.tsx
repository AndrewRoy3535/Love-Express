import React from "react";
import { Box, Typography } from "@mui/material";
function HelperComponent() {
  return (
    <Box
      sx={{
        display: "flex",
        height: "60vh",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Typography>No Schedule Found</Typography>
    </Box>
  );
}

export default HelperComponent;
