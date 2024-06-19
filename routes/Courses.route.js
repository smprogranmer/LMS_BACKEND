import express from "express";
import {
  courseDetails,
  createCourses,
  getAllCourses,
  purchaseCourse,
  searchCourses,
  userCourse,
} from "../controllers/Courses.controllers.js";
import isAuthenticatedUser from "../middlewares/auth.js";
import upload from "../middlewares/uploadFile.js";
const Router = express.Router();
Router.get("/courses", getAllCourses)
  .post(
    "/newCourses",
    isAuthenticatedUser,
    upload.fields([{ name: "courseImg", maxCount: 1 }]),
    createCourses
  )
  .put("/purchase-course/:courseId", isAuthenticatedUser, purchaseCourse);

Router.get("/my-courses", isAuthenticatedUser, userCourse);
Router.get("/course-details/:courseId", courseDetails);
Router.get("/search-course/:search", searchCourses);

export default Router;
