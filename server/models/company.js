const mongoose = require('mongoose');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    logo: {
        type: mongoose.Schema.Types.ObjectId
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'company'
    },
    passwordChangedAt:Date,
    passwordResetToken: String,
    passwordResetTokenExpires : Date
} , 
{timestamps: true,},  
);

companySchema.pre('save',async function(next){
    if(!this.isModified('password'))    return next();
    this.password = await bcrypt.hash(this.password,12);
    next();
});

companySchema.pre('save',function(next){
    if(!this.isModified('password') || this.isNew)  return next();
    this.passwordChangedAt = Date.now()-1000;
    next();
});

companySchema.methods.createPasswordResetToken = function(){
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');
    
    this.passwordResetTokenExpires = Date.now() + 10*60*1000;
    return resetToken;
}

const Company = mongoose.model('Company', companySchema);

module.exports = Company;