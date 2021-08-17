const fs = require('fs');
const path = require('path')
const parse = require('csv-parse');
const planets = require('./planets.mongo');

const habitablePlanets = []
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
               await planets.createReadStream({
                   keplerName = data.kepler_name,
               });
            }
        })
        .on('error', (err) => {
            console.log(err);
            reject(err)
        })
        .on('end', () => {
            console.log(`${habitablePlanets.length} habitable planets found!`);
            resolve();
        });
    
    })    
   
}

function getAllPlanets() {
    return habitablePlanets;
}
  

    module.exports = {
        loadPlanetsData,
        getAllPlanets
    }
