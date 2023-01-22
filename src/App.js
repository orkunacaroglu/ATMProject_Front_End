import { Box, Stack } from "@mui/material";
import Data from "./components/Data";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider} from '@mui/material/styles';
import CreateTheme from "./CreateTheme";
import Map from "./components/Map";
import "./css/App.css";
import Detail from "./components/Detail";


//https://mui.com/material-ui/react-stack/
//AXIOS API

function App() {
  return (
    <ThemeProvider theme={CreateTheme()}>
    <BrowserRouter>
    <Box style={{position: "relative"}}>
      <Navbar/>
      <Stack direction="row" spacing={2} justifyContent="space-between" >
        <Sidebar/>
        <Routes>
          <Route exact path="/map">
            <Route index element={<Map/>} />
          </Route>
          <Route exact path="/">
            <Route index element={<Data/>} />
          </Route>
          <Route exact path="/detail/:id">
            <Route index element={<Detail/>} />
          </Route>
        </Routes> 
      </Stack>
    </Box>
    </BrowserRouter>
    </ThemeProvider>

  );
}

export default App;
