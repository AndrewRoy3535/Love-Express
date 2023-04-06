import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Menu as MenuIcon } from "@material-ui/icons";
import Link from "next/link";
import Drawer from "@mui/material/Drawer";
import Lists from "./Lists";
import { AppBarProps } from "../types/interfaces";

const Appbar: React.FC<AppBarProps> = () => {
  const [toggle, setToggle] = React.useState<boolean>(false);
  const toggleDrawer = () => {
    setToggle(!toggle);
  };
  console.log("Appbar");

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position='static'>
          <Toolbar>
            <IconButton
              size='large'
              edge='start'
              color='inherit'
              aria-label='menu'
              sx={{ mr: 2 }}
              onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
            <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
              <Link href='/'>Dashboard</Link>
            </Typography>
            <Button color='inherit'>Logout</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Drawer
        open={toggle}
        onClose={toggleDrawer}
        anchor='left'
        sx={{
          ".MuiDrawer-paperAnchorLeft": {
            width: 250,
          },
        }}>
        <Lists toggleDrawer={toggleDrawer} />
      </Drawer>
    </>
  );
};

export default Appbar;
