"use server";

import { auth } from "@/lib/auth";
import prisma from "@/db/db";
import { verifyFileInBucket } from "@/lib/storage";


export async function completeUpload(req: { uploadId: string, fileName: string }) {

    try{

        // Get the user's session
        const session = await auth();
        
        if(!session){
            return {
                status: 401,
                message: "Unauthorized",
            };
        }

        const { uploadId, fileName } = req;

        if(!uploadId || !fileName){
            return {
                status: 400,
                message: "Missing required fields",
            };
        }

        // Verify upload exists and belongs to user
        const existingUpload = await prisma.videoUpload.findFirst({
            where: {
                id: uploadId,
                uploadedBy: session?.user?.email,
            },
        });

        if (!existingUpload) {
            return {
                message: "Upload not found",
                status: 404 
            };
        }

        // Verify file exists in bucket
        const fileExists = await verifyFileInBucket(fileName);
        if (!fileExists) {
            await prisma.videoUpload.update({
                where: { id: uploadId },
                data: { status: "FAILED" },
            });

            return {
                status: 400,
                message: "File not found in storage bucket",
            };
        }

        // Update upload status
        const bucketUrl = `https://storage.googleapis.com/${process.env.GOOGLE_CLOUD_STORAGE_BUCKET}/uploads/${fileName}`;
        
        const updatedUpload = await prisma.videoUpload.update({
            where: { id: uploadId },
            data: {
                status: "UPLOADED",
                storageUrl: bucketUrl,
                updatedAt: new Date(),
            },
        });

        return {
            message: "Upload completed successfully",
            data: {
                upload: updatedUpload,
            },
            status: 200 
        };


    }catch(e){
        console.error(e);
    }

}