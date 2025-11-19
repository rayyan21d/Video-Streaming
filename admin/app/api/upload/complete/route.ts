import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/db/db";
import { verifyFileInBucket } from "@/lib/storage";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(req: NextRequest) {
    try {
        // Get session and validate
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json({
                message: "Unauthorized",
            }, { status: 401 });
        }

        // Parse request body
        const { uploadId, fileName } = await req.json();

        if (!uploadId || !fileName) {
            return NextResponse.json({
                message: "Missing required fields",
            }, { status: 400 });
        }

        // Verify upload exists and belongs to user
        const existingUpload = await prisma.videoUpload.findFirst({
            where: {
                id: uploadId,
                uploadedBy: session.user.email,
            },
        });

        if (!existingUpload) {
            return NextResponse.json({
                message: "Upload not found",
            }, { status: 404 });
        }

        // Verify file exists in bucket
        const fileExists = await verifyFileInBucket(fileName);
        if (!fileExists) {
            await prisma.videoUpload.update({
                where: { id: uploadId },
                data: { status: "FAILED" },
            });

            return NextResponse.json({
                message: "File not found in storage bucket",
            }, { status: 400 });
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

        // // Trigger video processing (you'll implement this later)
        // await fetch(process.env.TRANSCODING_SERVICE_URL as string, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer ${process.env.TRANSCODING_SERVICE_KEY}`,
        //     },
        //     body: JSON.stringify({
        //         videoId: uploadId,
        //         inputUrl: bucketUrl,
        //         formats: [
        //             { resolution: '1080p', bitrate: '5000k' },
        //             { resolution: '720p', bitrate: '2500k' },
        //             { resolution: '480p', bitrate: '1000k' },
        //         ],
        //     }),
        // });

        return NextResponse.json({
            message: "Upload completed successfully",
            data: {
                upload: updatedUpload,
            },
        }, { status: 200 });

    } catch (error: any) {
        console.error("Upload completion error:", error);
        return NextResponse.json({
            message: "An error occurred while completing the upload",
        }, { status: 500 });
    }
}