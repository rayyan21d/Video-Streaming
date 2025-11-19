import { NextRequest, NextResponse } from "next/server";

import  prisma  from "@/db/db";
import { getServerSession } from "next-auth";
import {generateSignedUrl }from "@/lib/storage";

import { authOptions } from "../../auth/[...nextauth]/route";



const handler = async (req: NextRequest) => {
    try{

        const session = await getServerSession(authOptions);

        if(!session || !session.user){
            return NextResponse.json({
                status: 401,
                message: "Unauthorized",
            });
        }

        const {fileName, contentType, fileSize,} = await req.json();
        

        if(!fileName || !contentType || !fileSize){
            return NextResponse.json({
                status: 400,
                message: "Missing required fields",
            });
        }

        const allowedFileTypes = ["video/mp4"];
        if(!allowedFileTypes.includes(contentType)){
            return NextResponse.json({
                status: 400,
                message: "Invalid file type",
            });
        }

        // Validate file size (e.g., 2GB limit)
        const maxFileSize = 2 * 1024 * 1024 * 1024; // 2GB in bytes
        if (fileSize > maxFileSize) {
            return NextResponse.json({
                message: "File size exceeds the 2GB limit",
            }, { status: 400 });
        }

        const uniqueFileName = `${session.user.email}-${Date.now()}`;
        const signedUrl = await generateSignedUrl(uniqueFileName, contentType);

        // Save the file name and signed url to the database
        const upload = await prisma.videoUpload.create({
            data: {
                fileName: uniqueFileName,
                originalName: fileName,
                fileSize: fileSize,
                fileType: contentType,
                storageUrl: signedUrl,
                status: "PENDING",
                uploadedBy: session.user.email || "Anon",
                    
            }
        })


       return NextResponse.json({
            message: "Upload initiated successfully",
            data: {
                uploadId: upload.id,
                signedUrl: signedUrl,
                fileName: uniqueFileName,
            },
        }, { status: 200 });


    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }catch (error: any) {
        console.error("Upload initiation error:", error);
        return NextResponse.json({
            message: "An error occurred while initiating the upload",
        }, { status: 500 });
    }

};



export {handler as POST};