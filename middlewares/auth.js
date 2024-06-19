import ErroHandler from "../utils/apiResponseHandler.js"
import catchAsyncError from "./catchAsyncError.js"
import {users} from '../models/Users.model.js'
import jwt from "jsonwebtoken"

const isAuthenticatedUser = catchAsyncError(async(req,res,next)=>{
    try {
        const {token} = req.cookies
        
        if(!token){
            return next(new ErroHandler(401,'please login to accesss'))
        }
    
        const  decodeDate = jwt.verify(token,process.env.JWT_SECRET)
        if(!decodeDate){
            throw next(new ErroHandler(401,"Invalied access token. Please login againg"))
        }
        req.user = decodeDate.id

        
        next()
    } catch (error) {
     console.log(error)   
    }
})




export default isAuthenticatedUser



