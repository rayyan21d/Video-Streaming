import express from 'express';
import {v4 as uuidv4} from 'uuid';
import cors from 'cors';
import { upload } from './middlewares/multer.middleware';
import fs from 'fs';
import {exec} from 'child_process';

const app = express();

app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true
}));


// Type of content
// app.use((req, res, next)=>{
//     res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
//     res.header("Origin, X-Requested-With, Content-Type, Accept, Authorization");
//     next();
// })

// Parse incoming requests with JSON payloads
app.use(express.json());

// Parse incoming requests with urlencoded payloads
app.use(express.urlencoded({extended: true}));

// Serve static files
app.use('/uploads', express.static('uploads'));



app.get('/', (req, res) => {
    res.send('Hello World');
});

// Upload file
app.post('/upload', upload.single('file'), (req:any , res)=>{
    console.log("File uploaded");
    
    // Now put the file in the cloud
    // Use it's path
    const videoId = uuidv4();
    const videoPath = req.file.path;
    const outputPath = `./uploads/videos/${videoId}`;
    // This is the path to the video file
    const hlsPath = `${outputPath}/index.m3u8`;
    console.log("HLS Path: ", hlsPath);

    if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath, {recursive: true})
    }


    // ffmpeg
    const ffmpegCommand = `ffmpeg -i ${videoPath} -codec:v libx264 -codec:a aac -hls_time 10 -hls_playlist_type vod -hls_segment_filename "${outputPath}/segment%03d.ts" -start_number 0 ${hlsPath}
    `;

    // This Command is run on some other set of machines
    // Using a Queue like RabbitMQ or Kafka
    // Url is saved before the video is uploaded anyway so just video File is saved in the location

    exec(ffmpegCommand, (error, stdout, stderr)=>{
             
        if (error) {
        console.log(`exec error: ${error}`)
        }

        console.log(`stdout: ${stdout}`)
        console.log(`stderr: ${stderr}`)

        const videoUrl = `http://localhost:8000/uploads/videos/${videoId}/index.m3u8`;

        res.json({
        message: "Video converted to HLS format",
        videoUrl: videoUrl,
        videoId: videoId
        })
      

    })  

   

});

app.listen(8000, ()=>{
    console.log("Server running on port 8000");
})
