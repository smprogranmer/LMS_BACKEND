
import catchAsyncError from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/apiResponseHandler.js";
import { Courses } from "../models/Courses.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";


/**
 * Handles the creation of a new course.
 * Validates input fields, checks for existing courses with the same name,
 * and creates a new course in the database if no existing course is found.
 * @param {Object} req - The request object containing course details in req.body.
 * @param {Object} res - The response object used to send back the HTTP response.
 * @param {Function} next - The next middleware function in the Express.js request-response cycle.
 */
export const createCourses = catchAsyncError(async (req, res, next) => {
  const { name, description, price, category } = req.body;

  if (!name || !description || !price || !category) {
    return next(new ErrorHandler(400, "All fields are required"));
  }

  const existingCourse = await Courses.findOne({ name });

  if (existingCourse) {
    return next(
      new ErrorHandler(409, "Course with the same name already exists")
    );
  }
  const courseImglocalPath = req.files?.courseImg[0]?.path;

  if(!courseImglocalPath)  next(new ErrorHandler(400,"coruse imge is required"))
  const uploadOnC = await uploadOnCloudinary(courseImglocalPath)


  const createdCourse = await Courses.create({
    name,
    description,
    price,
    category,
    courseImage: uploadOnC.secure_url,
  });

  res.status(201).json({
    success: true,
    message: "Course created",
    createdCourse,
  });
});

export const myCourses = catchAsyncError(async (req, res, next) => {
  const { user } = req.body;

  const myCourses = await Courses.find({ students: user });

  res.status(200).json({
    success: true,
    myCourses,
    message: "myCourses geted",
  });
});

export const getAllCourses = catchAsyncError(async (req, res, next) => {
  let courses = Courses.find().sort({ _id: -1 });

  const result = await courses;
  res.status(200).json({
    success: true,
    result,
  });
});

// Handles the purchase of a course by a user.
export const purchaseCourse = catchAsyncError(async (req, res, next) => {
  const { courseId } = req.params;

  // if (!mongoose.Types.ObjectId.isValid(courseId)) {
  //   return next(new ErrorHandler(400, "Invalid courseId"));
  // }

  // Find the course by its ID
  const existingCourse = await Courses.findById(courseId);

  if (!existingCourse)
    return next(new ErrorHandler(404, "Course is not found"));

  // Check if the course is already purchased by the user
  const isPurchased = existingCourse.students.includes(req.user);

  if (isPurchased)
    return next(new ErrorHandler(409, "already purchased the course"));

  // Add the user to the course's student list
  existingCourse.students.push(req.user);

  // Save the updated course
  const updatedCourse = await existingCourse.save();

  // Return a success response with the updated course information
  res.status(200).json({
    success: true,
    updatedCourse,
  });
});

export const userCourse = catchAsyncError(async (req, res, next) => {
  // Extract the user information from req.user
  const userCourses = await Courses.find({ students: req.user });

  // Send a JSON response with the retrieved courses
  res.status(200).json({
    success: true,
    userCourses,
  });
});

export const courseDetails = catchAsyncError(async (req, res, next) => {
  const { courseId } = req.params;
  const courseDetails = await Courses.findById(courseId);
  if (!courseDetails) return next(new ErrorHandler(400, "Invalid courseId"));
  res.status(200).json({
    success: true,
    courseDetails,
  });
});

export const getTandingProducts = catchAsyncError(async (req, res, next) => {
  const Products = await Products.find();

  res.status(200).json({
    success: true,
    Products,
  });
});

export const searchCourses = catchAsyncError(async (req, res, next) => {
  const { search } = req.params;
  const courses = await Courses.find({
    $or: [
      { name: { $regex: search, $options: "i" } },
      { category: { $regex: search, $options: "i" } },
    ],
  });
  res.status(200).json({
    success: true,
    courses,
  });
});
