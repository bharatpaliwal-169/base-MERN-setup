import React, {useState,useEffect} from 'react';
import { useAuthContext } from '../../Context/AuthProvider';

import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';
import {Card,CardContent,Box} from '@mui/material';
import useStyles from './styles';

const clientId = "399679497476-fieqgq0qbp850pamsdaqanshpg69egmg.apps.googleusercontent.com";

const GoogleOAuth = ({type}) => {

  const classes = useStyles();
  const [ profile, setProfile ] = useState( JSON.parse(localStorage.getItem('GUser')) );
  const {oauth} = useAuthContext();

  useEffect(() => {
    const initClient = () => {
        gapi.client.init({
            clientId: clientId,
            scope: ''
        });
    };
    gapi.load('client:auth2', initClient);
  });
  
  const onSuccess = (res) => {
    setProfile(res.profileObj);
    localStorage.setItem('GUser', JSON.stringify(res.profileObj));
    const save = {
      email : res.profileObj.email,
    }
    oauth(save);
  };

  const onFailure = (err) => {
    console.log('failed', err);
  };
  
  const logOut = () => {
    setProfile(null);
    localStorage.removeItem('GUser');
  };
  
  return (
    <>
      <Box style={{alignItems:'center',justifyContent: 'center',textAlign: 'center'}}>
        {profile ? (
            <Card elevation={0}>
              <CardContent>
                {/* <img src={profile.imageUrl} alt="user" />
                <Typography variant='h5'> Name: {profile.name}</Typography>
                <Typography variant='body1'>Email Address: {profile.email}</Typography> */}
                <GoogleLogout clientId={clientId} buttonText="Log out" onLogoutSuccess={logOut} />
              </CardContent>
            </Card>
        ) : (
            <Card className={classes.googleButton} elevation={0}>
              <GoogleLogin
                clientId={clientId}
                buttonText={type}
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
              />
            </Card>
        )}
      </Box>
    </>
  )
}

export default GoogleOAuth;