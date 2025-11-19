"use server";

import { auth } from "@/lib/auth";
import { generateSignedUrl } from "@/lib/storage";
import  prisma  from "@/db/db";

export async function initiateUpload(request: {fileName: string, contentType: string, fileSize: number}) {
    const {fileName, contentType, fileSize} = request;

    // Get the user's session
    const session = await auth();
    
    if(!session){
        return {
            status: 401,
            message: "Unauthorized",
        };
    }

    if(!fileName || !contentType || !fileSize){
        return {
            status: 400,
            message: "Missing required fields",
        };
    }

    const allowedFileTypes = ["video/mp4", "image/jpeg", "image/png"];
    if(!allowedFileTypes.includes(contentType)){
        return{
            status: 402,
            message: "Invalid file type",
        };
    }

    const maxFileSize = 2 * 1024 * 1024 * 1024; // 2GB in bytes
        if (fileSize > maxFileSize) {
            return{
                status: 403,
                message: "File size exceeds the 2GB limit",
            }
        }

    const uniqueFileName = `${session?.user?.email}-${Date.now()}`;
    
    const signedUrl = await generateSignedUrl(uniqueFileName, contentType);

    // Save the file name and signed url to the database
            // Save the file name and signed url to the database
        const upload = await prisma.videoUpload.create({
            data: {
                fileName: uniqueFileName,
                originalName: fileName,
                fileSize: fileSize,
                fileType: contentType,
                storageUrl: signedUrl,
                status: "PENDING",
                uploadedBy: session?.user?.email || "Anonymous",
                    
            }
        })

        return {
            status: 200,
            message: "Upload initiated successfully",
            data: {
                uploadId: upload.id,
                signedUrl: signedUrl,
                fileName: uniqueFileName,
            },
        };




}

