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
import { Home, Update } from "@material-ui/icons";
import Link from "next/link";
import { AppBarProps } from "../types/interfaces";
import { useSession } from "next-auth/react";

const Lists: React.FC<AppBarProps> = ({ toggleDrawer }) => {
  const routes = [
    { route: "/", name: "Home", icon: <Home /> },
    { route: "/utility", name: "Utility", icon: <Update /> },
  ];

  const { data: session } = useSession();

  return (
    <Box role='presentation'>
      <List>
        {routes.map(({ route, name, icon }) => (
          <Box key={name}>
            <ListItem disablePadding>
              <ListItemButton
                disabled={
                  !session?.user?.admin && name === "Utility" ? true : false
                }>
                <Link
                  href={route}
                  onClick={toggleDrawer}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                  }}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText
                    primary={name}
                    sx={{ textTransform: "capitalize" }}
                  />
                </Link>
              </ListItemButton>
            </ListItem>
            <Divider />
          </Box>
        ))}
      </List>
    </Box>
  );
};

export default Lists;
