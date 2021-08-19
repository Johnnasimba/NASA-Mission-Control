const axios = require('axios');

const launchesDatabase = require('./launches.mongo');
const planets = require('./planets.mongo');

const DEFAULT_FLIGHT_NUMBER = 100;
const launches = new Map();


const launch = {
    flightNumber: 100, //flight_number 
    mission: 'Kepler Exploration', //name
    rocket: 'Explorer IS1', //rocket.name 
    launchDate: new Date('December 27, 2030'), //date_local
    target: 'Kepler-442 b', //Not applicable
    customers: ['ZTM', 'NASA'], //payload.customers for each payload
    upcoming: true, //upcoming
    success: true //success
};

saveLaunch(launch);

const SPACEX_API_URL = 'https://api.spacexdata.com/v4/launches/query';

async function loadLaunchesData() {
    console.log('Downloading launch data from NASA API');
    const response = await axios.exports(SPACEX_API_URL, {
        query: {},
        options: {
            populate: [
                {
                    path: 'rocket',
                    select: {
                        name: 1
                    }
                }, {
                    path: 'payloads',
                    select: {
                        'customers': 1
                    }
                }
            ]
        }
         
    })
}


async function existLaunchWithID(launchId) {
    return await launchesDatabase.findOne({
        flightNumber: launchId,
    })
}
async function getLatestFlightNumber() {
    const latestLaunch = await launchesDatabase
        .findOne()
        .sort('-flightNumber');
    if(!latestLaunch) {
        return DEFAULT_FLIGHT_NUMBER;
    }
    return latestLaunch.flightNumber;
}

async function getAllLaunches() {
    return await launchesDatabase.find({}, {'_id': 0, '__v': 0});
}

async function saveLaunch(launch) {
    const planet = await planets.findOne({
        keplerName: launch.target,
    })
    if(!planet) {
        throw new Error("No matching planet found")
    };
    await launchesDatabase.findOneAndUpdate({
        flightNumber: launch.flightNumber,
    }, launch, {
        upsert: true,
    })
}
async function scheduleNewLaunch(launch) {
    const newFlightNumber = await getLatestFlightNumber() + 1;
    const newLaunch = Object.assign(launch, {
        success: true,
        upcoming: true,
        customers: ['NASA', 'SpaceX'],
        flightNumber: newFlightNumber,
    });
    await saveLaunch(newLaunch);
}


async function abortLaunchById(launchId) {
    const aborted = await launchesDatabase.updateOne({
        flightNumber: launchId,
    }, {
        upcoming: false,
        success: false,
    })
    return aborted.ok === 1 && aborted.nModified === 1;
}

module.exports = {
    loadLaunchesData,
    existLaunchWithID,
    getAllLaunches,
    scheduleNewLaunch,
    abortLaunchById,
}