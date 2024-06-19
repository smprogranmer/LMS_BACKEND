import validator from "validator"
import mongoose,{Schema} from "mongoose"
import bcrypt from "bcrypt"
import JWT from "jsonwebtoken"
const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please Enter your name"],
      maxLength: [30, "name should be less than 30 charator"],
      minLength: [4, "name should be grather than 4 charator"],
      trim:true,
    },
    lastName: {
      type: String,
      required: [true, "Please Enter your name"],
      maxLength: [30, "name should be less than 30 charator"],
      minLength: [4, "name should be grather than 4 charator"],
      trim:true,
    },
    phone: {
      type: Number,
      unique:true,
      required: false,
      trim:true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Please Enter your email"],
      validate: [validator.isEmail, "Please Enter valid email"],
      trim:true,
    },
    password: {
      type: String,
      required: false,
      minLength: [4, "name should be grather than 4 charator"],
      select: false,
      trim:true,
    },
    gender:{
      type:String,
      enum:["male","female"],
    },
    // googleId:{
    //   type:String,
    //   requied:false,
    //   uniqe:true
    // },
    // avatar:{

    //         public_id:{
    //             type:String,
    //             required:true
    //         },
    //         url:{
    //             type:String,
    //             required:true
    //         }

    // },
    role: {
      type: String,
      enum:["admin","user"],
      default: "user",
    },
    verified:{
      type:Boolean,
      default:false,
      required:true,
    },
    myCourses:[
      {
        type: mongoose.Types.ObjectId,
        ref:"Courses"
      }
    ],
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
  }
);

// password hasing with bcrypt
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// json web token
UserSchema.methods.getJwtToken = function () {
  return JWT.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};


  UserSchema.methods.comperPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };

// userModel.methods.comparePassword = async function(enterdPasswrod){

//     return await bcrypt.compare(enterdPasswrod,this.password)
// }

export const  users = mongoose.models.EmailVerify || mongoose.model("Users", UserSchema);
