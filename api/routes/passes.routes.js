module.exports = app => {
    const passesByStation = require("../controllers/passesByStation.controllers.js");
    const passesAnalysis = require("../controllers/passesAnalysis.controllers.js");
    const chargesBy = require("../controllers/chargesBy.controllers.js")
  
    var router = require("express").Router();
    
    // Retrieve PassesAnalysis
    router.get("/PassesAnalysis/:op1_ID/:op2_ID/:date_from/:date_to", passesAnalysis.getPasses);
  
    // Retrieve passesByStationID
    router.get("/", passesByStation.getAll);

    // Retrieve ChargesBy
    router.get("/ChargesBy/:op_ID/:date_from/:date_to", chargesBy.getChargesBy);

    
    app.use('/api/passes', router);
  };