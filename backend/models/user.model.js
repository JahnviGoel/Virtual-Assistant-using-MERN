import mongoose, { Types } from "mongoose";
const userSchema= new mongooseSchema
(
  {
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true
  },
  assistantName:{
    type:String
  },
  assistantImage:{
    type:String
  },
  history:[
    {ype:String}
  ]
  },{timestamps:true}
)

const User=mongoose.model("User",userSchema);

export default User;