import {v2 as cloudinary} from 'cloudinary'; 
import fs from 'fs';  // Node.js file system module


// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME || 'Name', 
    api_key: process.env.CLOUDINARY_KEY || 'Key',
    api_secret: process.env.CLOUDINARY_SECRET || 'secr3t'
});

// Upload Video to cloudinary

const uploadOnCloudinary = async (filePath: string)=>{
    try{

        const response = await cloudinary.uploader.upload(filePath, 
            { resource_type: "video"},
        );

        return response.secure_url;

    }catch(err){
        console.log(err);
        fs.unlinkSync(filePath); // remove the file from the server
    }
}


export {uploadOnCloudinary};
