import * as React from "react";
import {
  List,
  Box,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Gamepad, Home, Update } from "@material-ui/icons";
import Link from "next/link";
import { AppBarProps } from "../types/interfaces";

const Lists: React.FC<AppBarProps> = ({ toggleDrawer }) => {
  const routes = [
    { route: "/", name: "Home", icon: <Home /> },
    { route: "/utility", name: "Utility", icon: <Update /> },
  ];
  return (
    <Box role='presentation'>
      <List>
        {routes.map(({ route, name, icon }) => (
          <Link href={route} onClick={toggleDrawer} key={name}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText
                  primary={name}
                  sx={{ textTransform: "capitalize" }}
                />
              </ListItemButton>
            </ListItem>
            <Divider />
          </Link>
        ))}
      </List>
    </Box>
  );
};

export default Lists;
