const mongoose = require("mongoose");
const gridfsStream = require('gridfs-stream');

let gfs, gridfsBucket;

const connectToDb = async() => {
    try {
        const conn = await mongoose.connect(process.env.DB_URI.replace('<PASSWORD>',process.env.DB_PASSWORD))
        console.log('Connected to database');
        gridfsBucket = new mongoose.mongo.GridFSBucket(conn.connection.db, {
            bucketName: 'uploads'
        });
        gfs = gridfsStream(conn.connection.db, mongoose.mongo);
        gfs.collection('uploads');
        console.log('GridFS is initialized');
    } catch (error) {
        console.log(error);
    }
}

const getGfs = () => {
    if (!gfs) {
        throw new Error('gfs is not initialized yet.');
    }
    return gfs;
};

const getGridfsBucket = () => {
    if (!gridfsBucket) {
        throw new Error('gridfsBucket is not initialized yet.');
    }
    return gridfsBucket;
};

module.exports = {connectToDb ,getGfs, getGridfsBucket };