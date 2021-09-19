const mongoose = require('mongoose')

const DB_USER="jorgeCastuera"
const DB_PASSWORD="megamanzeroaxlx1"
const DB_HOST="cluster0.omvx8.mongodb.net"
const DB_NAME="plover"
const url = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`
console.log(DB_USER)
function connect(){
    return mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
}
module.exports = connect;