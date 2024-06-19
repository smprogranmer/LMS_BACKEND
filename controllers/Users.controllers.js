import catchAsyncError from "../middlewares/catchAsyncError.js";
import { users } from "../models/Users.model.js";

import ErrorHandler from "../utils/apiResponseHandler.js";

import sendToken from "../utils/sendToken.js";




/**
 * Handles user registration by validating input fields, checking for existing users,
 * creating a new user, and sending a response with a token if successful.
 */
const registerUsers = catchAsyncError(async (req, res, next) => {
  const { firstName, lastName, email,phone, password, gender } = req.body;
  console.log(firstName,lastName, email,phone, password, gender)

  if (!firstName || !lastName || !email || !phone || !password || !gender) {
    return next(new ErrorHandler(400, "All fields are required"));
  }

  const existingUser = await users.findOne({ email });

  if (existingUser) {
    return next(new ErrorHandler(409, "User with email already exists. Please login."));
  }

  const newUsers = await users.create({ firstName,lastName, email,phone, password, gender });
  console.log("🚀 ~ registerUsers ~ newUsers:", newUsers)

  // sendToken(newUsers, 201, res);
  
  res.status(200).json({
    success: true,
    message: "Account created successfully",
    newUsers,
  });

});

const loginUsers = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler(500, "Invalid email or password"));
  }

  const user = await users.findOne({ email }).select("+password");
  console.log("🚀 ~ loginUsers ~ user:", user)

  if (!user || !(await user.comperPassword(password))) {
    return next(new ErrorHandler(500, "Invalid user credentials"));
  }

  sendToken(user, 200, res);
});

/**
 * Handles user logout by clearing the authentication token cookie and sending a JSON response indicating successful logout.
 */
const logOutUsers = catchAsyncError(async (req, res, next) => {
  // Clear the token cookie with immediate expiration and make it httpOnly
  res.cookie("token", null, { expires: new Date(0), httpOnly: true });

  // Send a JSON response indicating successful user logout
  res.status(200).json({ success: true, message: "User logged out successfully" });
});



const chengePassword = catchAsyncError(async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;

  const user = await users.findById(req.user).select("+password");
  console.log("🚀 ~ chengePassword ~ Users:", user)
  // console.log(Users)

  const isPasswordMatch = await user.comperPassword(oldPassword);
  console.log("🚀 ~ chengePassword ~ isPasswordMatch:", isPasswordMatch)

  if (!isPasswordMatch) {
    return next(new ErrorHandler(401,"Invalid oldPassword") );
  }
 const check =  user.password = newPassword;
  console.log("🚀 ~ chengePassword ~ check:", check)
  // console.log(hashedPassword)
  await user.save();

  sendToken(user, 200, res);

  res.status(200).json({success: true, message:"password change successfully"})
});

const getAllUsers = catchAsyncError(async (req, res, next) => {
  const Users = await users.find();
  console.log("🚀 ~ getAllUsers ~ Users:", Users);

  res.status(200).json({
    success: true,
    Users,
  });
});

const getSingleUser = catchAsyncError(async (req, res, next) => {
  const Users = await users.findById(req.users._id);

  res.status(200).json({
    success: true,
    Users,
  });
});


const upgradeProfile = catchAsyncError(async (req, res, next) => {
  const { name, email, role } = req.body;

  const Users = await users.findById(req.users.id);

  if (name) Users.name = name;
  if (email) Users.email = email;
  if (role) Users.role = role;
  // console.log(Users)

  await Users.save();

  sendToken(Users, 200, res);
});

const deleteUsers = catchAsyncError(async (req, res, next) => {
  const Users = await users.findById(req.params.id);

  if (!Users) {
    return next(new ErrorHandler("user dose not exit"), 404);
  }

  await Users.remove();

  sendToken(Users, 200, res);
});

export {
  getAllUsers,
  registerUsers,
  loginUsers,
  logOutUsers,
  chengePassword,
  upgradeProfile,
  getSingleUser,
  deleteUsers,
};
