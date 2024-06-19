
const sendToken = (users,statusCode,res)=>{
    const token = users.getJwtToken()
    const options ={
        expire: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 *60*60*1000
        ),
        httpOnly:true,
        sameSite: "none",
        secure: true,
    }

    res.status(statusCode).cookie('token',token,options).json({
        success:true,
        message:"User Login Successfuly",
        users,
        token
    })   
}
export default sendToken