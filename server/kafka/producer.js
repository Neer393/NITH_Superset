const { Kafka } = require('kafkajs');
const Student = require('../models/student.js');
const Company = require('../models/company.js');
const scraper = require('../utils/scrape.js');

const kafka = new Kafka({
  clientId: 'NITH-Superset',
  brokers: [process.env.KAFKA_BROKER]
});

const producer = kafka.producer();

const registerEachStudent = async(student)=>{
    let studentrollnumber = student.rollnumber || student.Rollnumber || student.roll || student.Roll || student.rollNumber || student.RollNumber || student['Roll Number'] || student['roll number'] || student['Rollnumber'] || student['rollNumber'] || student['roll Number'] || student['Roll No'];
    let studentDepartment = student.department || student.Department || student.dept || student.Dept;
    if(!studentrollnumber || !studentDepartment){
        return {
            status:'fail',
            message:'Invalid student data'
        }
    }
    studentrollnumber = studentrollnumber.toLowerCase();
    if(await Student.findOne({rollno:studentrollnumber})){
        return {
            status:'fail',
            message:'Student already registered'
        }
    }
    const scrapedData = await scraper(studentrollnumber);
    if(!scrapedData || !scrapedData.studentName){
        return {
            status:'fail',
            message:'Invalid student data'
        }
    }
    scrapedData.department = studentDepartment;
    const newStudent = await Student.create({
        name: scrapedData.studentName,
        cgpiDetails: scrapedData.cgpiDetails,
        department: scrapedData.department,
        rollno: studentrollnumber,
        email: studentrollnumber+'@nith.ac.in',
        password: studentrollnumber.password,
        backlogsCount: scrapedData.backlogscount,
        hasActiveBacklogs:scrapedData.backlogsCount>0
    });
    if(!newStudent){
        return {
            status:'fail',
            message:'Error occurred while registering student'
        }
    }
    await sendMessage(newStudent.email,`Hello ${newStudent.name},<br><br>You have been registered on <strong>NITH-Superset</strong> for the upcoming Placement season at <strong>National Institute of Technology, Hamirpur</strong>.<br>You are requested to complete your profile on superset by logging in with the following details:-<br><br>Email:- <strong>${email}</strong><br>Password:- <strong>${password}</strong><br><br>Make sure to change your password after login.<br><br>Regards,<address>Team NITH-Superset<br>National Institute of Technology, Hamirpur<br>Hamirpur, Himachal Pradesh<br>India<br>Pincode:- 177005</address>`);
    return {
        status:'success',
        newStudent
    }
}

const registerCompany = async(company)=>{
    const {email,password,name} = company;
    if(!email || !password || !name){
        return {
            status:'fail',
            message:'Invalid company data'
        }
    }
    if(Company.findOne({email})){
        return {
            status:'fail',
            message:'Company already registered'
        }
    }
    const newCompany = await Company.create({
        name,
        email,
        password
    });
    if(!newCompany){
        return {
            status:'fail',
            message:'Error occurred while registering company'
        }
    }
    await sendMessage(newCompany.email,`Hello ${newCompany.name},<br><br>Thank you for participating in Campus Drive Placement of National Institute of Technology, Hamirpur.<br>You are requested to complete your profile on <strong>NITH-Superset</strong> by logging in with the following details:-<br><br>Email:- <strong>${email}</strong><br>Password:- <strong>${password}</strong><br><br>Make sure to change your password after login.<br><br>Regards,<address>Team NITH-Superset<br>National Institute of Technology, Hamirpur<br>Hamirpur, Himachal Pradesh<br>India<br>Pincode:- 177005</address>`);
    return {
        status:'success',
        newCompany
    }
}

const sendMessage = async (currstudent) => {
  await producer.connect();
  await producer.send({
    topic: process.env.KAFKA_TOPIC,
    messages: [{ value: JSON.stringify(currstudent) }],
  });
  await producer.disconnect();
};

module.exports = sendMessage;
