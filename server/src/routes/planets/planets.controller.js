
const {getAllPlanets} = require('../../model/planets.module');

function httpGetAllPlanets(req, res) {
   return res.status(200).json(getAllPlanets());
}

module.exports = {
    httpGetAllPlanets
};