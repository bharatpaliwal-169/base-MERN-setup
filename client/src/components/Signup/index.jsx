import React,{useState,useEffect} from 'react';
import { useAuthContext } from '../../Context/AuthProvider';
import {Container,Paper,Typography,TextField,InputAdornment, IconButton,Link} from '@mui/material';
import {Visibility,VisibilityOff} from "@mui/icons-material";
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
import useStyles from './style'


const Signup = () =>{
  const {SignupUser,newUser} = useAuthContext();

  const classes = useStyles();
  const [user,setUser] = useState({email : '' , password : '',fullName : ''});
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
    SignupUser(user);
  }
  useEffect(() => {
    setLoading(false);
    console.log(newUser);
  }, [SignupUser,newUser])
  
  return (
    <>
      <Container component="main" maxwidth="sm">
        <Paper elevation={3} className={classes.paper}>
          <Typography variant="h2" className={classes.heading}>
            Signup
          </Typography>

          <form onSubmit={handleSubmit}>

            <TextField style={{marginTop : '2rem'}}
              name = "fullName"
              onChange={handleChange}
              variant="outlined"
              required={true}
              fullWidth
              autoFocus={true}
              label="Your Full Name"
              type="text"
              />

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
                Already have a account, hop in ! <Link href='/auth/login' rel="nofollow" underline='none'>
                  <b>from here</b>
                </Link>
              </Typography>
          </form>
        </Paper>
      </Container>
    </>
  )
}

export default Signup;