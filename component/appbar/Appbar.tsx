import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { MenuRounded } from "@material-ui/icons";
import Link from "next/link";
import Drawer from "@mui/material/Drawer";
import Lists from "./Lists";
import { AppBarProps } from "../types/interfaces";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

const Appbar: React.FC<AppBarProps> = () => {
  const [toggle, setToggle] = React.useState<boolean>(false);
  const toggleDrawer = () => {
    setToggle(!toggle);
  };

  const { data: session } = useSession();
  console.log(session);

  const handlesin = async () => {
    await signIn();
  };
  const hadlesinout = async () => {
    await signOut();
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position='fixed'>
          <Toolbar>
            <IconButton
              size='small'
              color='inherit'
              aria-label='menu'
              onClick={toggleDrawer}>
              <MenuRounded fontSize='medium' />
            </IconButton>
            {session && (
              <Typography
                component='div'
                sx={{ flexGrow: 1, fontSize: "28px" }}>
                <Link href='/'>Hi, {session?.user?.name}</Link>
              </Typography>
            )}
            <Button color='inherit' variant='outlined' onClick={hadlesinout}>
              Sign Out
            </Button>
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
