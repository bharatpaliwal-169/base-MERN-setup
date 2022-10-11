import React,{createContext,useContext,useState} from 'react';
import * as api from '../API';
const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
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
  return (
    <AuthContext.Provider value = {{LoginUser,SignupUser,result,newUser}}>
      {children}
    </AuthContext.Provider>
  )

}

export const useAuthContext = () => useContext(AuthContext);