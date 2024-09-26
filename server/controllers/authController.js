const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const {promisify} = require('util');
const Student = require('../models/student');
const Company = require('../models/company');
const Tpo=require('../models/tpo');

const sendToken = (user,statuscode,res)=>{
    const token = jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_IN
    });
    res.cookie('jwt',token,{
        expires:new Date(Date.now()+90*24*60*60*1000),
        httpOnly:false
    });
    user.password=undefined;
    res.status(statuscode).json({
        status:'success',
        token,
        user
    })
}

exports.login = async(req,res,next)=>{
    const {email,password,role} = req.body;

    if(!email || !password || !role){
        return res.status(404).json({
            status:'fail',
            message:'Either email address or password is missing'
        });
    }
    if(role==='student'){
        const searchStudent = await Student.findOne({email}).select('+password');
        if(!searchStudent || !(await bcrypt.compare(password,searchStudent.password))){
            return res.status(401).json({
                status:'fail',
                message:'Invalid credentials'
            });
        }
        sendToken(searchStudent,200,res);
    }
    else if(role==='company'){
        const searchCompany = await Company.findOne({email}).select('+password');
        if(!searchCompany || !(await bcrypt.compare(password,searchCompany.password))){
            return res.status(401).json({
                status:'fail',
                message:'Invalid credentials'
            });
        }
        sendToken(searchCompany,200,res);
    }
    else if(role==='tpo'){
        const searchTpo = await Tpo.findOne({email}).select('+password');
        if(!searchTpo || !(await bcrypt.compare(password,searchTpo.password))){
            return res.status(401).json({
                status:'fail',
                message:'Invalid credentials'
            });
        }
        sendToken(searchTpo,200,res);
    }
    else{
        return res.status(404).json({
            status:'fail',
            message:'Invalid role'
        });
    }
};

exports.protect = async(req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
    }
    else if(req.cookies.jwt){
        token = req.cookies.jwt;
    }
    else{
        return res.status(401).json({
            status:'fail',
            message:'You are not logged in. Please log in to get access'
        });
    }
    const decodedData = await promisify(jwt.verify)(token,process.env.JWT_SECRET);
    let freshUser;
    if(decodedData.role==='student')   freshUser = await Student.findById(decodedData.id);
    else if(decodedData.role==='company')   freshUser = await Company.findById(decodedData.id);
    else if(decodedData.role==='tpo')   freshUser = await Tpo.findById(decodedData.id);
    else{
        return res.status(404).json({
            status:'fail',
            message:'Invalid role'
        });
    }
    if(!freshUser){
        return res.status(401).json({
            status:'fail',
            message:'The token belonging to the user does not exists'
        });
    }
    if(freshUser.passwordChangedAt){
        const chngdtimestamp = parseInt(freshUser.passwordChangedAt.getTime()/1000);
        if(decodedData.iat < chngdtimestamp){
            return res.status(401).json({
                status:'fail',
                message:'User recently changed password. Please Log in again'
            });
        }
    }
    req.user = freshUser;
    next();
}

exports.restrictTo = (...roles) =>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return res.status(403).json({
                status:'fail',
                message:'You do not have the permission to perform this action'
            });
        }
        next();
    }
}

exports.forgotPassword = async(req,res,next)=>{
    let user = await User.findOne({email:req.body.email});
    if(req.body.role==='student')   user = await Student.findOne({email:req.body.email});
    else if(req.body.role==='company')   user = await Company.findOne({email:req.body.email});
    else if(req.body.role==='tpo')   user = await Tpo.findOne({email:req.body.email});
    else{
        return res.status(404).json({
            status:'fail',
            message:'Invalid role'
        });
    }
    if(!user){
        return res.status(404).json({
            status:'fail',
            message:`No user with email address ${req.body.email} found`
        });
    }
    const resetToken = user.createPasswordResetToken();
    await user.save({validateBeforeSave:false});

    const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`;
    const message = `Forgot your password? Submit a patch request with your new password and passwordConfirm to ${resetURL}`;

    try{
        // await sendEmail({
        //     email:user.email,
        //     subject:'Your password reset Token (Valid for only 10 mins)',
        //     message
        // });
        res.status(200).json({
            status:'success',
            message: `Token sent to ${user.email}`
        })
    }
    catch(err){
        user.passwordResetToken = undefined;
        user.paswordResetTokenExpires = undefined;
        await user.save({validateBeforeSave:false});
        return res.status(500).json({
            status:'fail',
            message:'There was an error sending mail. Try again later'
        });
    }
}

exports.resetPassword = async(req,res,next)=>{
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    const user = await Student.findOne({passwordResetToken:hashedToken,passwordResetTokenExpires:{$gt:Date.now()}}) || await Company.findOne({passwordResetToken:hashedToken,passwordResetTokenExpires:{$gt:Date.now()}}) || await Tpo.findOne({passwordResetToken:hashedToken,passwordResetTokenExpires:{$gt:Date.now()}});
    if(!user){
        return res.status(400).json({
            status:'fail',
            message:'Either the token is invalid or the token has expired. Please try again'
        });
    }
    user.password = req.body.password;
    user.passwordResetToken=undefined;
    user.passwordResetTokenExpires = undefined;
    await user.save();
    sendToken(user,200,res);
}

exports.updatePassword = async(req,res,next)=>{
    let user;
    if(req.user.role==='student')   user = await Student.findById(req.user.id).select('+password');
    else if(req.user.role==='company')   user = await Company.findById(req.user.id).select('+password');
    else if(req.user.role==='tpo')   user = await Tpo.findById(req.user.id).select('+password');
    else{
        return res.status(404).json({
            status:'fail',
            message:'Invalid role'
        });
    }

    if(!user || !(await bcrypt.compare(req.body.currpassword,user.password))){
        return res.status(401).json({
            status:'fail',
            message:'Invalid Credentials'
        });
    }
    user.password = req.body.newpassword;
    await user.save();
    sendToken(user,201,res);
}