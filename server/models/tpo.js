const mongoose = require('mongoose');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');

const tpoSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        validate: {
            validator: (email)=>{return email==="tpo@nith.ac.in"},
            message: 'Email ID provided is not a TPO email ID',
        },
        unique: true,
    },
    profilePhoto: {
        type: mongoose.Schema.Types.ObjectId
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'tpo'
    },
    passwordChangedAt:Date,
    passwordResetToken: String,
    passwordResetTokenExpires : Date
} ,
{timestamps: true,},
)

tpoSchema.pre('save',async function(next){
    if(!this.isModified('password'))    return next();
    this.password = await bcrypt.hash(this.password,12);
    next();
});

tpoSchema.pre('save',function(next){
    if(!this.isModified('password') || this.isNew)  return next();
    this.passwordChangedAt = Date.now()-1000;
    next();
});

tpoSchema.methods.createPasswordResetToken = function(){
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');
    
    this.passwordResetTokenExpires = Date.now() + 10*60*1000;
    return resetToken;
}

const Tpo = mongoose.model('Tpo', tpoSchema);

module.exports = Tpo;