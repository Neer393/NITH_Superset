const dotenv = require('dotenv')
const { connectToDb } = require('./config/db.js')
dotenv.config({path: './config/config.env'})
const app = require('./app.js')
const {consumeMessages,deleteTopics} = require('./kafka/consumer.js');

const port = process.env.PORT || 8000

connectToDb();

const cleanKafka = async () => {
    await deleteTopics([process.env.KAFKA_TOPIC, '__consumer_offsets']);
    console.log('Kafka Queue cleaned');
}

cleanKafka().catch(err => console.error('Error in cleaning Kafka:', err));

app.listen(port,()=>{
    console.log('Server running on port',port);
    consumeMessages();
})