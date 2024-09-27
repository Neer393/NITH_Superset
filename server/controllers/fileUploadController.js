const express =require('express');
const mongoose =require('mongoose');
const multer =require('multer')
const  {getGridfsBucket}  =require('../config/db.js');

const storage = multer.memoryStorage();
exports.storage = storage;
const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
      const allowedPdfFields = ['resume', 'result', 'TenthResult', 'TwelthResult'];
      const allowedImageFields = ['profileImage'];

      if (allowedPdfFields.includes(file.fieldname)){
        if (file.mimetype === 'application/pdf') {const express =require('express');
          const mongoose =require('mongoose');
          const multer =require('multer')
          const  {getGridfsBucket}  =require('../config/db.js');
          
          exports.storage=multer.memoryStorage();
          const upload = multer({
              storage,
              limits: { fileSize: 5 * 1024 * 1024 },
              fileFilter: (req, file, cb) => {
                const allowedPdfFields = ['resume', 'result', 'TenthResult', 'TwelthResult'];
                const allowedImageFields = ['profileImage'];
          
                if (allowedPdfFields.includes(file.fieldname)){
                  if (file.mimetype === 'application/pdf') {
                    cb(null, true);
                  } else {
                    cb(new Error(`${file.fieldname} must be a PDF`), false);
                  }
                } else if (allowedImageFields.includes(file.fieldname)) {
                  if (
                    file.mimetype === 'image/jpeg' ||
                    file.mimetype === 'image/jpg' ||
                    file.mimetype === 'image/png' ||
                    file.mimetype === 'image/svg+xml'
                  ) {
                    cb(null, true);
                  } else {
                    cb(new Error(`${file.fieldname} must be an image (jpeg, jpg, png, or svg)`), false);
                  }
                } else {
                  cb(new Error(`Invalid fieldname: ${file.fieldname}`), false);
                }
              }
            }).fields([
              { name: 'resume', maxCount: 1 },
              { name: 'profileImage', maxCount: 1 },
              { name: 'result', maxCount: 1 },
              { name: 'TenthResult', maxCount: 1 },
              { name: 'TwelthResult', maxCount: 1 }
            ]);
          
          exports.uploadFiles = async(req,res)=>{
            const gridfsBucket = getGridfsBucket();
              upload(req, res, function (err) {
                  if (err) {
                      if (err.code === 'LIMIT_FILE_SIZE') {
                          return res.status(400).json({ error: 'File too large. Maximum size is 5 MB.' });
                      }
                      return res.status(400).json({ error: err.message });
                  }
                  if (!req.files || Object.keys(req.files).length === 0) {
                      return res.status(400).json({ error: 'No file uploaded' });
                  }
                  const uploadPromises = Object.keys(req.files).map(field=>{
                      const file = req.files[field][0];
                      return new Promise((resolve,reject)=>{
                          const filename = file.originalname;
                          const uploadStream = gridfsBucket.openUploadStream(filename, {
                              contentType: file.mimetype
                          });
                          uploadStream.write(file.buffer);
                          uploadStream.end();
                          uploadStream.on('finish', () => {
                              resolve(uploadStream.id);
                          });
                          uploadStream.on('error', (err) => {
                              reject(err);
                          });
                      })
                  });
          
                  Promise.all(uploadPromises)
                  .then((fileIds)=>{
                      res.status(201).json({
                          message:'Files uploaded successfully',
                          fileIds
                      });
                  })
                  .catch((err)=>{
                      res.status(500).json({error:'Error uploading files',details:err.message});
                  });
              });
          }
          
          exports.getFile = async(req,res)=>{
            const gridfsBucket = getGridfsBucket();
              try {
                  const fileId = new mongoose.Types.ObjectId(req.params.id);
                  const file = await gridfsBucket.find({ _id: fileId }).toArray();
                  if (!file || file.length === 0) {
                    return res.status(404).json({ error: 'File not found' });
                  }
                  res.set({
                    'Content-Type': file[0].contentType,
                    'Content-Disposition': 'inline'
                  });
                  const downloadStream = gridfsBucket.openDownloadStream(fileId);
                  downloadStream.pipe(res).on('error', (err) => {
                    res.status(500).json({ error: 'Error streaming file', details: err.message });
                  });
              } catch (err) {
                  res.status(500).json({ error: 'Internal server error', details: err.message });
              }
          }
          cb(null, true);
        } else {
          cb(new Error(`${file.fieldname} must be a PDF`), false);
        }
      } else if (allowedImageFields.includes(file.fieldname)) {
        if (
          file.mimetype === 'image/jpeg' ||
          file.mimetype === 'image/jpg' ||
          file.mimetype === 'image/png' ||
          file.mimetype === 'image/svg+xml'
        ) {
          cb(null, true);
        } else {
          cb(new Error(`${file.fieldname} must be an image (jpeg, jpg, png, or svg)`), false);
        }
      } else {
        cb(new Error(`Invalid fieldname: ${file.fieldname}`), false);
      }
    }
  }).fields([
    { name: 'resume', maxCount: 1 },
    { name: 'profileImage', maxCount: 1 },
    { name: 'result', maxCount: 1 },
    { name: 'TenthResult', maxCount: 1 },
    { name: 'TwelthResult', maxCount: 1 }
  ]);

exports.uploadFiles = async(req,res)=>{
  const gridfsBucket = getGridfsBucket();
    upload(req, res, function (err) {
        if (err) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).json({ error: 'File too large. Maximum size is 5 MB.' });
            }
            return res.status(400).json({ error: err.message });
        }
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        const uploadPromises = Object.keys(req.files).map(field=>{
            const file = req.files[field][0];
            return new Promise((resolve,reject)=>{
                const filename = file.originalname;
                const uploadStream = gridfsBucket.openUploadStream(filename, {
                    contentType: file.mimetype
                });
                uploadStream.write(file.buffer);
                uploadStream.end();
                uploadStream.on('finish', () => {
                    resolve(uploadStream.id);
                });
                uploadStream.on('error', (err) => {
                    reject(err);
                });
            })
        });

        Promise.all(uploadPromises)
        .then((fileIds)=>{
            res.status(201).json({
                message:'Files uploaded successfully',
                fileIds
            });
        })
        .catch((err)=>{
            res.status(500).json({error:'Error uploading files',details:err.message});
        });
    });
}

exports.getFile = async(req,res)=>{
  const gridfsBucket = getGridfsBucket();
    try {
        const fileId = new mongoose.Types.ObjectId(req.params.id);
        const file = await gridfsBucket.find({ _id: fileId }).toArray();
        if (!file || file.length === 0) {
          return res.status(404).json({ error: 'File not found' });
        }
        res.set({
          'Content-Type': file[0].contentType,
          'Content-Disposition': 'inline'
        });
        const downloadStream = gridfsBucket.openDownloadStream(fileId);
        downloadStream.pipe(res).on('error', (err) => {
          res.status(500).json({ error: 'Error streaming file', details: err.message });
        });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error', details: err.message });
    }
}