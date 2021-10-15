const dotenv = require('dotenv')
const mongoose = require('mongoose')

dotenv.config()

const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_HOST = process.env.DB_HOST
const DB_NAME= process.env.DB_NAME
const url = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`
console.log(DB_USER)

function connect(){
    return mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
}
module.exports = connect;