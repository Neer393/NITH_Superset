const dotenv = require('dotenv')
const { connectToDb } = require('./config/db.js')
const app = require('./app.js')

dotenv.config({path: './config/config.env'})
const port = process.env.PORT || 8000

connectToDb();

app.listen(port,()=>{
    console.log('Server running on port',port);
})