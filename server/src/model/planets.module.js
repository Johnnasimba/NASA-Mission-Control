const fs = require('fs');
const path = require('path')
const parse = require('csv-parse');
const planets = require('./planets.mongo');

const max_survivable_light = 1.11;
const min_survivable_light = 0.36;
const max_survivable_planet_radius = 1.6;


function isHabitablePlanet(planet) {

    return planet['koi_disposition'] === 'CONFIRMED' 
    && planet['koi_insol'] > min_survivable_light 
    && planet['koi_insol'] < max_survivable_light
    && planet['koi_prad'] < max_survivable_planet_radius
    ;
}

function loadPlanetsData() {    
    return new Promise((resolve, reject) => {
        fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'kepler_data.csv'))
        .pipe(parse({
            comment: '#',
            columns: true
        }))
        .on('data', async (data) => {
            if(isHabitablePlanet(data)) {
                savePlanet(data);
            }
        })
        .on('error', (err) => {
            console.log(err);
            reject(err)
        })
        .on('end', async () => {
            const countPlanetsFound = (await getAllPlanets()).length;
            console.log(`${countPlanetsFound} habitable planets found!`);
            resolve();
        });
    
    })    
   
}

async function getAllPlanets() {
    return await planets.find({}, {
        // exclude ID  and version
        '_id': 0, '__v': 0,
    })
}

async function savePlanet(planet) {
    try {
        // Add a planet else update if exist
        await planets.updateOne({
            keplerName : planet.kepler_name,
        }, {
            keplerName : planet.kepler_name,
        }, {
            upsert: true,
        });
    }catch(error) {
        console.error(`Could not save planet ${error}`)
    }
   
}

  

    module.exports = {
        loadPlanetsData,
        getAllPlanets
    }
