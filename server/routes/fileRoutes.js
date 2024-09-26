const express = require('express');
const fileUploadController = require('../controllers/fileUploadController.js');
const router=express.Router();

router
    .route('/:id')
    .get(fileUploadController.getFile)

router
    .route('/upload')
    .post(fileUploadController.uploadFiles);

module.exports = router;