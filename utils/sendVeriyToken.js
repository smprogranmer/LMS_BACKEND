
// const JWT  =  require("jsonwebtoken")
import jwt from "jsonwebtoken"
const sendVeryToken = (payload) =>{
    return  jwt.sign(payload,process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_VERY_EXPIRE,
    })
}

export default sendVeryToken