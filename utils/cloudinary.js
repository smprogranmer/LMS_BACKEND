import { v2 as cloudinary} from 'cloudinary';
import fs from 'fs';
// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
//   });

  cloudinary.config({ 
    cloud_name: "dlmjkprba", 
    api_key: "516442183868363", 
    api_secret: "0h5n9KPUr7CSztPQMY0HiKPIifs" // Click 'View Credentials' below to copy your API secret
});

  
console.log(`${process.env.PORT}`)
console.log(process.env.CLOUDINARY_CLOUD_NAME)
export const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null;
        //upload the file on cloudinary
        const res = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
            folder: "LMS_IMAGES"
        });
        fs.unlinkSync(localFilePath);
        // console.log(`file uploaded on cloudinary => ${res.url}`);
        return res
    } catch (error) {
        console.log("🚀 ~ uploadOnCloudinary ~ error:", error)
        fs.unlinkSync(localFilePath)
    }
}

const uploadResult = await cloudinary.uploader.upload("https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg", {
    public_id: "shoes"
}).catch((error)=>{console.log(error)});