import jwt from 'jsonwebtoken'
const generateToken=(userId)=>
{
  try {
    let token= jwt.sign
    ((userId)    // ✅ payload as object
    ,process.env.JWT_TOKEN,// ✅ secret key
     {expiresIn:"7d"})
  return token;    
  } catch (error) {
    console.log(error);
    
  }

}
export default generateToken;