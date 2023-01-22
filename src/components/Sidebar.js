import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import { AccountBalance, Map } from "@mui/icons-material";
import { Link } from "react-router-dom";


const Sidebar = () => {
  return (
    <Box height="100vh" style={{paddingTop: "64px"}} bgcolor={"#C3F9EF"} flex={2} p={2} >
      <List className="a">
        <ListItem  disablePadding component={Link} to="/">
          <ListItemButton>
            <ListItemIcon>
              <AccountBalance />
            </ListItemIcon>
            <ListItemText primary="ATM Information" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding component={Link} to="/map">
          <ListItemButton>
            <ListItemIcon>
              <Map/>
            </ListItemIcon>
            <ListItemText primary="Map"/>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
