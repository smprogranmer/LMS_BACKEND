import { Verify } from "../models/UsersVerify.model.js";
import crypto from "crypto";
import sendEmail from "./sendEmail.js";
import apiErrorHandler from "./apiResponseHandler.js";

export const sendOtp = async (emailId,name) => {

    const sentOtp = await Verify.findOne({ userEmail: emailId });

    if (sentOtp) throw new apiErrorHandler(409, "otp was already send to this email,Please try again after 2 minute");

    const emailOtp = crypto.randomInt(100000, 999999).toString();

    const otp = await Verify.create({ userEmail: emailId, emailOtp });
    
     // prepare email
  const emailData ={
    emailId,
    subject:"Account Activation Email",
    html:` <h2>Hello ${name} !</h2> <p>Click the following link to verify your email: ${emailOtp}hello</a> </p>`,
}

await sendEmail(emailData)
  // console.log("🚀 ~ sendOtp ~ otp:", otp)

  // console.log("🚀 ~ registerUsers ~ otp:", otp)

  // await sendEmail(emailData);
};
