import { Storage } from '@google-cloud/storage';

// Validate required environment variables
const requiredEnvVars = {
    GOOGLE_CLOUD_PROJECT: process.env.GOOGLE_CLOUD_PROJECT,
    GOOGLE_CLOUD_CLIENT_EMAIL: process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
    GOOGLE_CLOUD_PRIVATE_KEY: process.env.GOOGLE_CLOUD_PRIVATE_KEY,
    BUCKET_NAME: process.env.BUCKET_NAME
};

// Check for missing environment variables
Object.entries(requiredEnvVars).forEach(([key, value]) => {
    if (!value) {
        throw new Error(`Missing required environment variable: ${key}`);
    }
});

// Initialize storage with proper error handling
const storage = new Storage({
    projectId: process.env.GOOGLE_CLOUD_PROJECT,
    credentials: {
        client_email: process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_CLOUD_PRIVATE_KEY!.replace(/\\n/g, '\n'),
    },
});

const bucket = storage.bucket(process.env.BUCKET_NAME!);

// Verify bucket access on initialization
async function verifyBucketAccess() {
    try {
        const [exists] = await bucket.exists();
        if (!exists) {
            throw new Error(`Bucket ${process.env.BUCKET_NAME} does not exist`);
        }
        return true;
    } catch (error) {
        console.error('Error accessing bucket:', error);
        throw new Error(`Failed to access bucket: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}

export async function generateSignedUrl(fileName: string, contentType: string): Promise<string> {
    // Input validation
    if (!fileName) {
        throw new Error('fileName is required');
    }
    if (!contentType) {
        throw new Error('contentType is required');
    }

   
    const file = bucket.file(`uploads/${fileName}`);
   
    try {
        const [signedUrl] = await file.getSignedUrl({
            version: 'v4',
            action: 'write',
            expires: Date.now() + 15 * 60 * 1000, // 15 minutes
            contentType,
            conditions: [
                ['content-length-range', 0, 5000 * 1024 * 1024], // 5MB max size - adjust as needed
            ],
        });
        
        return signedUrl;
    } catch (error) {
        console.error('Error generating signed URL:', error);
        throw new Error(`Failed to generate signed URL: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}

export async function verifyFileInBucket(fileName: string): Promise<boolean> {
    // Input validation
    if (!fileName) {
        throw new Error('fileName is required');
    }

    // Sanitize file name
    const file = bucket.file(`uploads/${fileName}`);
    
    try {
        const [exists] = await file.exists();
        return exists;
    } catch (error) {
        console.error('Error verifying file:', error);
        return false;
    }
}

// Add a function to get file metadata
export async function getFileMetadata(fileName: string) {
    if (!fileName) {
        throw new Error('fileName is required');
    }

   
    const file = bucket.file(`uploads/${fileName}`);

    try {
        const [metadata] = await file.getMetadata();
        return metadata;
    } catch (error) {
        console.error('Error getting file metadata:', error);
        throw new Error(`Failed to get file metadata: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}

// Initialize bucket access verification
verifyBucketAccess()
    .then(() => console.log('Successfully connected to GCP bucket'))
    .catch((error) => console.error('Failed to initialize bucket connection:', error));

export { storage, bucket };