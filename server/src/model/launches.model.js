
const launches = new Map();

let latestFlightNumber = 100;

const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27, 2030'),
    target: 'Kepler-442 b',
    customer: ['ZTM', 'NASA'],
    upcoming: true,
    success: true
};

function existLaunchWithID(launchId) {
    return launch.has(launchId)
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
    
}

launches.set(launch.flightNumber, launch);
module.exports = {
    getAllLaunches,
    addNewLaunch,
    existLaunchWithID,
    abortLaunchById,
}