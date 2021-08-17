
const {getAllPlanets} = require('../../model/planets.module');

async function httpGetAllPlanets(req, res) {
   return  res.status(200).json(await getAllPlanets());
}

module.exports = {
    httpGetAllPlanets
};