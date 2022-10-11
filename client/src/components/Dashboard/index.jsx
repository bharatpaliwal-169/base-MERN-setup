import React from 'react';
import {Box,Container,Link} from '@mui/material';

const Dashboard = () => {
  return (
    <Box>
      <Container maxWidth="sm">
        <h1>Hi user</h1>
        <Link href='/auth/login' underline="none"> Login </Link>
        <Link href='/auth/signup' underline="none"> Signup </Link>
        <Link href='/auth/googleoauth' underline="none"> Google Login/Signup </Link>
      </Container>
    </Box>
  )
}

export default Dashboard;