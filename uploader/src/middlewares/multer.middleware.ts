import multer from 'multer';
import path from 'path';
import fs from 'fs';

// If the uploads folder does not exist, create it


// Multer Storage Middleware
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        
        const dir = './uploads';
        if(!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }

        cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
})

// Multer Configuration
export const upload = multer({storage: storage});