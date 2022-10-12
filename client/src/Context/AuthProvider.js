import React,{createContext,useContext,useState} from 'react';
import * as api from '../API';
const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
  // const [currentUser,setCurrentUser] = useState(JSON.parse(localStorage.getItem('currentUser')));
  const [result,setResult] = useState([]);
  const [newUser,setNewUser] = useState([]);

  const LoginUser = async (user) => {
    try {
      const res = await api.login(user);
      // const data = await res.json();
      setResult(res);
      // console.log(res);
    } catch (error) {
      console.log("Error in Login Context Method");
      console.log(error);
    }
  }


  const SignupUser = async (user) => {
    try {
      const res = await api.signup(user);
      setNewUser(res);
    } catch (error) {
      console.log("error in Signup Context Method");
    }
  }

  const oauth = async (user) => {
    try {
      const res = await api.oauth(user);
      console.log(res);
    } catch (error) {
      console.log("error in Oauth Context Method");
    }
  }
  
  return (
    <AuthContext.Provider value = {{LoginUser,SignupUser,oauth,result,newUser}}>
      {children}
    </AuthContext.Provider>
  );

}

export const useAuthContext = () => useContext(AuthContext);