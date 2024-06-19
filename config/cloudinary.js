const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
  cloud_name: 'dlmjkprba', 
  api_key: '516442183868363', 
  api_secret: '0h5n9KPUr7CSztPQMY0HiKPIifs' 
});


 export const uploadOnCloudinary = async (localFile) =>{

    try {
        if(!localFile)return null
        // upload file on cloudinary 
       const res = await cloudinary.uploader.upload(localFile,{
            resource_type: "auto",
            folder:"NIBH_IMAGES"
        })
        return res
    } catch (error) {
        console.log(error)
    }
}

const multiple = (images) =>{
    try {
        const uploads = images.map((base) => {
            const base64Data = base.buffer.toString('base64');
            uploadOnCloudinary(base64Data)
            
            return uploads
        }
        
        )
        return uploads
    } catch (error) {
        
    }
}

const uploadPromises = (files) =>{
    files.map(async (file) => {
        try {
          const base64Data = file.buffer.toString('base64');
          const result = await cloudinary.uploader.upload(`data:${file.mimetype};base64,${base64Data}`, {
            folder: 'your-folder',
          });
          return result;
        } catch (error) {
          console.error('Cloudinary Upload Error:', error);
          throw error; // Propagate the error to the outer try/catch block
        }
      });
}
exports = {
    uploadOnCloudinary,
    multiple,
    uploadPromises
}