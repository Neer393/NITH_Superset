const { Kafka } = require('kafkajs');
const sendEmail = require('../utils/emailer.js');
const Student = require('../models/student.js');
const Company = require('../models/company.js');
const scraper = require('../utils/scrape.js');
const crypto = require('crypto');

const kafka = new Kafka({
  clientId: 'NITH-Superset',
  brokers: [process.env.KAFKA_BROKER]
});

const consumer = kafka.consumer({ groupId: 'email-group' });
const admin= kafka.admin();

const consumeMessages = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: process.env.KAFKA_TOPIC, fromBeginning: false });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
        const payload = JSON.parse(message.value.toString());
        let rollno = payload.rollnumber || payload.Rollnumber || payload.roll || payload.Roll || payload.rollNumber || payload.RollNumber || payload['Roll Number'] || payload['roll number'] || payload['Rollnumber'] || payload['rollNumber'] || payload['roll Number'] || payload['Roll No'];
        if(rollno)  rollno=rollno.toLowerCase();
        else    return;
        const email = rollno+'@nith.ac.in';
        const department = payload.department || payload.Department || payload.dept || payload.Dept || payload.branch || payload.Branch;
        if(!rollno || !department)    return;
        const scrapedData = await scraper(rollno);
        if(!scrapedData || !scrapedData.studentName)    return;
        scrapedData.department = department;
        let newStudent;
        if(await Student.findOne({email})){
            newStudent = await Student.findOneAndUpdate({email},{
                cgpiDetails: scrapedData.cgpiDetails,
                backlogsCount: scrapedData.backlogscount,
                hasActiveBacklogs:scrapedData.backlogscount>0
            })
        }
        else{
            const password = crypto.randomBytes(8).toString('hex');
            newStudent = await Student.create({
                name: scrapedData.studentName,
                cgpiDetails: scrapedData.cgpiDetails,
                department: department,
                rollno: rollno,
                email: email,
                password,
                backlogsCount: scrapedData.backlogscount,
                hasActiveBacklogs:scrapedData.backlogscount>0
            });
            await sendEmail({
                email: email,
                subject: 'Complete your registration on Superset for Upcoming Placement Drive',
                message: `<p>Hello ${newStudent.name},<br><br>You have been registered on <strong>NITH-Superset</strong> for the upcoming Placement season at <strong>National Institute of Technology, Hamirpur</strong>.<br>You are requested to complete your profile on superset by logging in with the following details:-<br><br>Email:- <strong>${newStudent.email}</strong><br>Password:- <strong>${password}</strong><br><br>Make sure to change your password after login.<br><br>Regards,<address>Team NITH-Superset<br>National Institute of Technology, Hamirpur<br>Hamirpur, Himachal Pradesh<br>India<br>Pincode:- 177005</address></p>`,
            });
            console.log(`Sending email to ${email}`);
        }
        
    },
  });
};

const deleteTopics = async (topicNames) => {
    await admin.connect();
    for (let topicName of topicNames) {
        try {
            await admin.deleteTopics({ topics: [topicName] });
            console.log(`Topic ${topicName} deleted successfully.`);
        } catch (error) {
            console.error(`Failed to delete topic ${topicName}:`, error);
        }
    }
    await admin.disconnect();
};

module.exports = {consumeMessages,deleteTopics};
