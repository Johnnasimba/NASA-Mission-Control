
const http =  require('http')
const mongoose =  require('mongoose');
const app = require('./app')

require('dotenv').config();

const PORT = process.env.PORT || 8000;

const { loadPlanetsData } = require('./model/planets.module')

const server =  http.createServer(app);

mongoose.connection.once('open', () => {
    console.log('MongoDB connection ready!')
});

mongoose.connection.on('error', (error) => {
    console.error(error)
})

async function startServer() {    
    await mongoose.connect(process.env.MONGO_URL,  {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
    
    await loadPlanetsData()
    server.listen(PORT, () =>{
        console.log(`Server listening on port ${PORT}`)
    })
}


startServer();