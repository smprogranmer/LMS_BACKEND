import catchAsyncError from "../middlewares/catchAsyncError.js";
import {Courses} from "../models/Courses.model.js";
export const courses = catchAsyncError(async (course) =>{
    const coursesPromise = []
    const coursesName = ["frontend","backend","Marn Stack","full Stack","PHP course","python course","javascript course",",c++ course","react.js course","node.js course",]
    const coursesImages = [img1,img2,img3,img4,img5,img6]

    for(let i=0; i< coursesName.length; i++){
        const tempCourse = Courses.create({
            name: coursesName[i],
            description: `lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ips amet, consectetur adipiscing elit. Lorem  sed diam nonum vul tell   amet, consectetur adipiscing elit. Lorem sed`,
            price:  Math.floor(Math.random() * (10000 - 5000 + 1)) + 5000,
            category: coursesName[i],

        })
        coursesPromise.push(tempCourse)
        console.log(tempCourse)
    }

    await Promise.all(coursesPromise)
    console.log("🚀 ~ courses ~ coursesPromise:", coursesPromise)
    console.log("🚀 ~ courses ~ courses:", courses)
    return courses;

})