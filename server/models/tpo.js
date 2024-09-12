const mongoose = require('mongoose');

const tpoSchema = new mongoose.Schema({

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
        default: 'tpo'
    },
} ,
{timestamps: true,},
)