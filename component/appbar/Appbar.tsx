"use client";
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
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const Appbar: React.FC<AppBarProps> = () => {
  const [toggle, setToggle] = React.useState<boolean>(false);
  const toggleDrawer = () => {
    setToggle(!toggle);
  };

  const { data: session, update } = useSession({ required: true });

  const hadlesinout = async () => {
    try {
      await signOut();
    } catch (e) {
      console.log(e);
      redirect("/");
    }
  };
  console.log(session);

  return (
    <>
      <AppBar
        position='fixed'
        color='transparent'
        sx={{ backgroundColor: "rgba(0,0,0,0.5)", color: "#ccc" }}>
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
              sx={{
                flexGrow: 1,

                textTransform: "capitalize",
              }}>
              <Link href='/'>HI, {session?.user?.name}</Link>
            </Typography>
          )}
          <Button color='inherit' variant='outlined' onClick={hadlesinout}>
            Sign Out
          </Button>
        </Toolbar>
      </AppBar>
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
