import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import auth from "../models/auth.js"
import Gauth from "../models/Gauth.js"
import dotenv from 'dotenv';
dotenv.config()
const SECRET = process.env.SECRET;

export const login = async (req, res) => {
  //get required vars from frontend request
  const {email,password} = req.body;

  try{
    const existingUser = await auth.findOne({email});
    
    if(!existingUser) {
      return res.status(404).json({message: 'User does not exist'});
    }
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if(!isPasswordCorrect) {
      return res.status(400).json({message: 'Password is incorrect'});
    }

    const token = jwt.sign({id:existingUser._id}, SECRET, { expiresIn: "1h" });
    
    res.status(200).json({result : existingUser,token:token });
  }
  catch(err) {
    res.status(500).json({message: "something went wrong" + err});
  }
}

export const signup = async (req, res) => {
  const {fullName,email,password} = req.body;
  try {
    const existingUser = await auth.findOne({email});
    
    if(existingUser){
      return res.status(400).json({message : "user already exists"});
    }

    const hashPassword = await bcrypt.hash(password,12);

    const result = await auth.create({email, password: hashPassword,fullName });
    console.log(result);
    const token = jwt.sign({email : result.email, id:result._id}, SECRET, { expiresIn: "1h" });
    res.status(200).json({result,token});
  } catch (error) {
    res.status(500).json({message: "something went wrong " + error.message});
  }
}

export const oauth = async (req, res) => {
  const {email} = req.body;

  try {
    const existingUser = await Gauth.findOne({email});
    if(!existingUser) {
      await Gauth.create({email})
    }
    res.status(200).json({result : "ok"});
  } catch (error) {
    res.status(500).json({message: "something went wrong"});
  }
}