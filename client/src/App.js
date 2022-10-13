import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {CssBaseline,Box} from '@mui/material';
import DashBoard from './components/Dashboard';
import Login from './components/Login';
import Signup from './components/Signup';
import Google from './components/Google';
import Pic from './components/PicKeeper'
const App = () => {
  return (
    <BrowserRouter>
      <Box>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<DashBoard />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<Signup />} />
          <Route path="/auth/googleoauth" element={<Google />} />
          <Route path="/pic" element={<Pic />} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
}

export default App;