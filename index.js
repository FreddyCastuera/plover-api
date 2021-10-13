require('dotenv').config()
const server = require('./src/server')
const dbConnect = require('./src/lib/db')

const port = process.env.PORT || 8080
dbConnect()
    .then(()=>{
        console.log('Database connected');
        server.listen(8080,()=>{
            console.log('server listening on 8080');
        })
    })
    .catch(err=>console.log(err))
