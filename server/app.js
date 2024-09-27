// Global Imports
const express = require('express');
const cookieParser =  require('cookie-parser');

// Router Imports
const fileRouter = require('./routes/fileRoutes.js');
const studentRouter = require('./routes/studentRoutes.js');
const companyRouter = require('./routes/companyRoutes.js');
const tpoRouter = require('./routes/tpoRoutes.js');
const authRouter = require('./routes/authRoutes.js');

const app=express();
app.use(express.json());
app.use(cookieParser());

app.get('/',(req,res)=>{
    res.status(200).render('base');
})
app.use('/api/v1/auth',authRouter);
app.use('/api/v1/files',fileRouter);
app.use('/api/v1/students',studentRouter);
app.use('/api/v1/companies',companyRouter);
app.use('/api/v1/tpo',tpoRouter);
app.all('*',(req,res)=>{
    res.status(404).json({
        status:'fail',
        message:`Can't find ${req.originalUrl} on this server`
    })
});

module.exports = app;