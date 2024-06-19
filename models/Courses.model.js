import mongoose, { Schema } from "mongoose";

const CoursesSChema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your product name"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please enter your product description"],
    },
    price: {
      type: Number,
      required: [true, "Please enter your product price"],
      maxLength: [8, "Price cannot exced 8 characters"],
    },
    rating: {
      type: Number,
      default: 0,
    },
    courseImage: {
      type: String, // cloudinary image url
      required: [true, "Please enter your product image"], 
    },
    category: {
      type: String,
      required: [true, "Please enter your product category"],
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    students:[
      {
        type: mongoose.Types.ObjectId,
        ref:"Users"
      }
    ]

    // reviews:[
    //     {
    //         name:{
    //             type:String,
    //             required:true,
    //         },
    //         rating:{
    //             type:Number,
    //             required:true,
    //         },
    //         comment:{
    //             type:String,
    //             required:true
    //         }
    //     }
    // ],
    // user:{
    //     type:mongoose.Schema.ObjectId,
    //     ref:"user",
    //     required:true,
    // },
  },
  {
    timestamps: true,
  }
);

export const Courses = mongoose.model("Courses", CoursesSChema);
