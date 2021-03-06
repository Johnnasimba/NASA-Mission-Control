
const http =  require('http');
const app = require('./app');
const { mongoConnect } = require('./services/mongo');
const { loadPlanetsData } = require('./model/planets.module')
const { loadLaunchData } = require('./model/launches.model');


const PORT = process.env.PORT || 8000;

const server =  http.createServer(app);

async function startServer() {    
    await mongoConnect();    
    await loadPlanetsData();
    await loadLaunchData();
    server.listen(PORT, () =>{
        console.log(`Server listening on port ${PORT}`)
    })
}


startServer();