// const launches = require('./launches.mongo');
const launches = new Map();

let latestFlightNumber = 100;

const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27, 2030'),
    target: 'Kepler-442 b',
    customers: ['ZTM', 'NASA'],
    upcoming: true,
    success: true
};

launches.set(launch.flightNumber, launch);


function existLaunchWithID(launchId) {
    return launches.has(launchId)
}

function getAllLaunches() {
    return Array.from(launches.values());
}

function addNewLaunch(launch) {
    latestFlightNumber++
    launches.set(
        latestFlightNumber,
        Object.assign(launch, {
            success: true,
            upcoming: true,
            customers: ['John Nasimba', 'Elon Mask'],
            flightNumber : latestFlightNumber
        })
    )
}

function abortLaunchById(launchId) {
    const aborted = launches.get(launchId)
    aborted.upcoming = false;
    aborted.success =  false;
    return aborted;
}

module.exports = {
    existLaunchWithID,
    getAllLaunches,
    addNewLaunch,
    abortLaunchById,
}