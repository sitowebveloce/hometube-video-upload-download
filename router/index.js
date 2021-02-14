// IMPORT PACKAGES
import express from 'express';
import path from 'path';
import fs from 'fs';
const router = express.Router();

// JSON DB
import {JsonDB} from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig.js';
    // SET
    // db.push('/videos', [{name:'test03.mp4'}], false);
    // GET
    // let data = db.getData('/videos');

// Create New DB
const db = new JsonDB(new Config('videoDb', true, false, '/'));

// MULTER STORAGE
import multer from 'multer';
const storage = multer.diskStorage({
    destination: (req, video, cb)=>{
        cb(null, 'uploads') // null for the error, name folder
    },
    filename: (req, video, cb)=>{
        cb(null, `${video.fieldname}-${Date.now()}${path.extname(video.originalname)}`);
    },
    onError: (err, next)=>{
        console.log('error', err);
        next(err);
    }
})
// CHECK FILE TYPE FUNCTION
const checkFileType = (video, cb)=>{
    // FILES ACCEPTED
    const filetypes = /mp4|mkv/;
    // TEST FILE TYPE
    const extname = filetypes.test(path.extname(video.originalname).toLocaleLowerCase());
    // CHECK MIME TYPE
    const mimetype = filetypes.test(video.mimetype);

    if(extname && mimetype){
        cb(null, true);
    }else{
        console.log('Please, only videos.');
         cb('Please, only videos.', false);
    };
};
// UPLOAD
const upload = multer({
    storage,
    fileFilter: (req, video, cb)=>{
        checkFileType(video, cb);
    }
}).single('video'); // Single video syntax

// POST VIDEO ROUTE
// https://www.npmjs.com/package/multer#error-handling
router.post('/', (req, res) =>{
    upload(req, res, (err)=>{
        // Check for errors
        if(err){
           console.log(err);
          return  res.send(`<a href='/'>Home</a> <div>${err}</div>`);
        }else{
        res.redirect('/');
        }
    });
});
// GET ALL VIDEOS ROUTE
router.get('/',  (req, res) =>{
    // Read UPLOADS FOLDER
    fs.readdir('uploads', (err, files)=>{
        if(err){
           console.log(err);
           return  res.send(`<a href='/'>Home</a> <div>${err}</div>`);
        }else{
            res.status(200).json(files)
        }
    });
});

// DELETE ROUTE
router.delete('/:id', (req, res)=>{
    let id = req.params.id;
    //  console.log(id);
    // READ ALL VIDEO FILES
    fs.readdir('uploads', (err, files)=>{
        if(err) {
         console.log(err);
         // Video not found
        return res.send(`<a href='/'>Home</a> <div>${err}</div>`);
         }else{
             // DELETE VIDEO
           let videos = files.map(v=>{
                 if(fs.existsSync(`./uploads/${id}`)){
                      fs.unlinkSync(`./uploads/${id}`);
                 }
            }); 
            res.redirect('/');
        }
    });

});

export default router;