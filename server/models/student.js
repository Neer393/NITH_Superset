const mongoose = require('mongoose');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');

const validateEmail = (email) => {
    const parts = email.split('@');
    return parts.length === 2 && parts[1] === 'nith.ac.in';
};
const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    rollno: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        validate: {
            validator: validateEmail,
            message: 'Email must be a valid NIT Hamirpur email ID',
        },
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    branch: {
        type: String,
        required: true,
    },
    cgpa: {
        type: Number,
        required: true,
    },
    resume: {
        type: mongoose.Schema.Types.ObjectId
    },
    profileImage: {
        type: mongoose.Schema.Types.ObjectId
    },
    TenthResult: {
        type: mongoose.Schema.Types.ObjectId
    },
    TwelthResult: {
        type: mongoose.Schema.Types.ObjectId
    },
    result: {
        type: mongoose.Schema.Types.ObjectId
    },
    placed: {
        type: Boolean,
        default: false
    },
    offers: {
        type: [Object],
        default: [],
    },
    debar: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        default: 'student'
    },
    optout: {
        type: Boolean,
        default: false
    },
    hasActiveBacklogs: {
        type: Boolean,
        default: false
    },
    backlogsCount: {
        type: Number,
        default: 0
    },
    passwordChangedAt:Date,
    passwordResetToken: String,
    passwordResetTokenExpires : Date
} ,
{timestamps: true,},  
);

studentSchema.pre('save',async function(next){
    if(!this.isModified('password'))    return next();
    this.password = await bcrypt.hash(this.password,12);
    next();
});

studentSchema.pre('save',function(next){
    if(!this.isModified('password') || this.isNew)  return next();
    this.passwordChangedAt = Date.now()-1000;
    next();
});

studentSchema.methods.createPasswordResetToken = function(){
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');
    
    this.passwordResetTokenExpires = Date.now() + 10*60*1000;
    return resetToken;
}

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;