//function related to authentication
import generateToken from "../configuration/token.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

//we are making sign up controller
console.log("Auth controller loaded");

export const signUp=async(req,res)=>
{
  try {
  
    // take input value(will come in body)
    const {name,email,password}=req.body; 

    //if any field is empty
    if(!name||!email||!password)
    {
      return res.status(400).json({message:"send all details"});
    }
  
    // particular user exist pehle se ya nhi(by email or username )
    let existEmail=await User.findOne({email})
    if(existEmail)
    {
      return res.status(400).json({message:"Email already exist"});
    }
    if(password.length<6)
    {
      return res
      .status(400)
      .json({message:"password must be atleast 6 character"});
    }

    // hash the password(using bcryptjs package)
    const hashedPassword=await bcrypt.hash(password,10)
  
    //create user
    const user=await User.create({
      name,
      email,
      password:hashedPassword,
      })
      
      console.log(user);
      // Generate token and pass it to cookies using JWT(json web token)
      let token;
      try {
       token=generateToken(user._id); 
      } catch (error) {
        console.log(error)
      }

      // parse the token into cookies(by cookie-parser package)
       res.cookie("token",token,
        {
          httpOnly:true,
          secure:process.env.NODE_ENVIRONMENT == "production",
          sameSite:"strict",
          // maxAge should be in millisecond
          maxAge:7*24*60*60*1000
        }
       )
    return res.status(201).json({
      message: "Signup successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  }
   catch (error) {
    return res.status(500).json({message:"sign up error"})
  }
}

export const login=async (req,res) => {
  try {
    const {email,password}=req.body;
    let user=await User.findOne({email}).select("+password");
    if(!user)
    {
       return res.status(400).json({message:"email does not exist"})
    }
    // match the password with hashes password
    let match=await bcrypt.compare(password,user.password)
    if(!match)
    {
       return res.status(400).json({message:"password is incorrect"})
    }
    // Generate token and pass it to cookies using JWT(json web token)
      let token;
      try {
       token=generateToken(user._id); 
      } catch (error) {
        console.log(error)
      }

      // parse the token into cookies(by cookie-parser package)
       res.cookie("token",token,
        {
          httpOnly:true,
          secure:process.env.NODE_ENVIRONMENT == "production",
          sameSite:"strict",
          // maxAge should be in millisecond
          maxAge:7*24*60*60*1000
        }
       )
    return res.status(200).json({message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({message:'log in error'})
  }
  
}

export const logout=async (req,res) => {
  //clear cookie
  try {
    res.clearCookie("token")
     return res.status(200).json({message:"logout successful"})  
  } catch (error) {
        return res.status(500).json(error)

  }
}