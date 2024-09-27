const express = require('express');
const Student = require('../models/student.js');
const Company = require('../models/company.js');
const Tpo=require('../models/tpo.js');
const multer = require('multer');
const xlsx = require('xlsx');
const crypto = require('crypto');
const sendEmail = require('../utils/emailer.js');
const {storage} = require('../controllers/fileUploadController.js');
const sendMessage = require('../kafka/producer.js');

const uploader=multer({storage,fileFilter: (req, file, cb) => {
    if(file.fieldname==='studentsData'){
      if (file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.mimetype === 'application/vnd.ms-excel') {
        cb(null, true);
      } else {
        cb(new Error(`${file.fieldname} must be an excel file`), false);
      }
    }
    else{
      cb(new Error(`Invalid fieldname: ${file.fieldname}`), false);
    }
  }}).fields([
    { name: 'studentsData', maxCount: 1 }
]);

exports.registerStudents = async(req,res,next)=>{
    uploader(req,res,async function(err){
        if(err){
            return res.status(400).json({
                status:'fail',
                message:err.message
            });
        }
        if(!req.files || req.files.length===0)   return res.status(400).json({status:'fail',message:'No file uploaded'});
        const file =req.files.studentsData[0];
        const workbook = xlsx.read(file.buffer,{type:'buffer'});
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json(worksheet);
        for(let currstudent of data)    await sendMessage(currstudent);
        return res.status(200).json({
            status:'success',
            message:'Students registered successfully'
        });
    });
}

exports.registerStudent = async(req,res,next)=>{
    let {rollnumber,department} = req.body;
    if(!rollnumber || !department){
        return res.status(404).json({
            status:'fail',
            message:'Roll number or department is missing'
        });
    }
    const currstudent = {
        "Roll No":rollnumber,
        department
    }
    await sendMessage(currstudent);
    return res.status(200).json({
        status:'success',
        message:'Student registered successfully'
    });
}

exports.registerNewCompany = async(req,res,next)=>{
    const {email,name} = req.body;
    if(!email || !name){
        return res.status(404).json({
            status:'fail',
            message:'Email address or password or name is missing'
        });
    }
    const password = crypto.randomBytes(8).toString('hex');
    const company = await Company.create({
        email,
        password,
        name
    });
    if(!company)    return res.status(400).json({status:'fail',message:'A company with this email already exists. Try logging in.'});
    return res.status(200).json({status:'success',company});
}