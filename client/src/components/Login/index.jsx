import React,{useState,useEffect} from 'react';
import { useAuthContext } from '../../Context/AuthProvider';

import {Container,Paper,Typography,TextField,
  InputAdornment, IconButton,Link, Divider} from '@mui/material';
import {Visibility,VisibilityOff} from "@mui/icons-material";
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
import useStyles from './style'
import GoogleOAuth from '../Google';

const Login = () => {
  const {LoginUser,result} = useAuthContext();

  const classes = useStyles();
  const [user,setUser] = useState({email : '' , password : '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const handleChange = (e) =>{
    setUser({...user,[e.target.name] : e.target.value});
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    setLoading(true);
    console.log(user);
    LoginUser(user);
  }
  useEffect(() => {
    setLoading(false);
    console.log(result);
    localStorage.setItem('user', JSON.stringify(result));
  }, [LoginUser,result])
  


  return (
    <Container component="main" maxwidth="sm">
      <Paper elevation={3} className={classes.paper}>
        <Typography variant="h2" className={classes.heading}>
          Login
        </Typography>

        <GoogleOAuth type= "Log in with Google" />

        <Typography variant="h6" >
          OR
        </Typography>
        <Divider />
        <form onSubmit={handleSubmit}>

          <TextField style={{marginTop : '2rem',marginBottom : '2rem'}}
            name = "email"
            onChange={handleChange}
            variant="outlined"
            required={true}
            fullWidth
            autoFocus={true}
            label="Email ID"
            type="email"
            />
        

          <TextField name = "password" label='password' variant="outlined" type={showPassword ? "text" : "password"} 
            onChange={handleChange} fullWidth style={{marginBottom : '2rem'}}
            InputProps={{ // <-- This is where the toggle button is added.
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )
            }}
            />

            <LoadingButton loading={loading} variant="contained" color="primary" type="submit" fullWidth endIcon={<SendIcon />}>
              Submit
            </LoadingButton>
            
            <Typography variant='body2' style={{marginTop : '1rem'}}>
              Don't have a account, make one <Link href='/auth/signup' rel="nofollow" underline='none'>
                <b>Here</b>
              </Link>
            </Typography>
        </form>
      </Paper>
    </Container>
  )
}

export default Login;