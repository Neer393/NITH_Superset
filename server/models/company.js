const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    logo: {
        type: String,
        required: true,
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
} , 
{timestamps: true,},  
);

const Company = mongoose.model('Company', companySchema);

module.exports = Company;