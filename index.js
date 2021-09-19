const server = require('./src/server')
const dbConnect = require('./src/lib/db')
const PORT = 3001


dbConnect()
    .then(()=> {
        console.log('Database connected')
        server.listen(PORT, ()=>{
            console.log('Server listening in port 3001');
        });
    })
    .catch(err => console.error('OH no...', err))