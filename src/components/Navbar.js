import { AppBar, styled, Toolbar } from "@mui/material";
import React from "react";

const ToolbarStyled = styled(Toolbar)({
  display: "flex",
  justifyContent: "center",
  backgroundColor: "#79BAEC",
  color: "#1e81b0",
  position: "absolute",
  width: "100%",
});

const Navbar = () => {
  return (
    <AppBar position="sticky">
      <ToolbarStyled>ATM PROJECT</ToolbarStyled>
    </AppBar>
  );
};

export default Navbar;
