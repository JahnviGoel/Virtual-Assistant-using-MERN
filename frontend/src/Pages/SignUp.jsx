import React, { useContext, useState } from 'react'
import authBg from '../assets/authBg.png'
import { IoEye, IoEyeOff } from "react-icons/io5"
import { useNavigate } from 'react-router';
import { UserDataContext } from '../context/UserContext';
import axios from "axios";
function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  // we the server url
  const {serverUrl}=useContext(UserDataContext)
  const navigate=useNavigate();
  //use state to fetch API
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // usestate for error
  const [err,setErr]= useState("")

  //fetch API for sign up using axions
  const handleSignUp=async (e) => {
    e.preventDefault();
    setErr("");
    try {
      let result=await axios.post(`${serverUrl}/api/auth/signup`,{name,email,password},
        {withCredentials:true})
        console.log(result)
    } catch (error) {
      console.log(error);
      setErr(error.response.data.message)
    }
  }

  return (
    <div
      className="w-full min-h-screen bg-center bg-cover flex justify-center items-center"
      style={{ backgroundImage: `url(${authBg})` }}
    >
      <form className="w-[90%] max-w-125 h-[600px] bg-black/40 backdrop-blur-md shadow-lg shadow-black flex flex-col justify-center items-center gap-5 px-4 py-5 rounded-2xl"
      onSubmit={handleSignUp}>

        <h1 className="text-white text-xl font-semibold text-[30px] mb-6">
          Register to <span className="text-blue-500">Virtual Assistant</span>
        </h1>

        <input
          type="text"
          placeholder="Enter your name"
          className="w-full h-15 border-2 border-white bg-transparent text-white placeholder-gray-300 px-4 py-2.5 rounded-full outline-none text-[18px]" 
          required onChange={(e)=>setName(e.target.value)} value={name}
        />

        <input
          type="email"
          placeholder="Enter Email"
          className="w-full h-15 border-2 border-white bg-transparent text-white text-[18px] placeholder-gray-300 px-4 rounded-full outline-none"
          required onChange={(e)=>setEmail(e.target.value)} value={email}
        />

        {/* Password field */}
        <div className="w-full h-15 border-2 border-white bg-transparent rounded-full flex items-center px-4 relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full h-full bg-transparent text-white placeholder-gray-300 outline-none pr-10"
            required onChange={(e)=>setPassword(e.target.value)} value={password}
          />

          {showPassword ? (
            <IoEyeOff
              className="absolute right-4 text-white text-[18px] cursor-pointer h-6.25 w-6.25"
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <IoEye
              className="absolute right-4 text-white text-[18px] cursor-pointer h-6.25 w-6.25"
              onClick={() => setShowPassword(true)}
            />
          )}
        </div>
            {err.length>0 && <p className='text-red-500'>
              *{err}
            </p>}

           <button
            className='min-w-27.5 h-15 mt-[20px] text-black bg-white rounded-full font-semibold bg-white text-50px'>Sign Up</button>

           <p 
           className='text-white text-[18px] cursor-pointer'
            onClick={()=>
           {
            navigate("/signin")
           }}
           >Already have an account ?
           <span className='text-blue-400'> Sign In</span></p>
      </form>
    </div>
  )
}

export default SignUp
