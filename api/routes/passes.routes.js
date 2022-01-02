module.exports = app => {
    const passesByStation = require("../controllers/passesByStation.controllers.js");
    const passesAnalysis = require("../controllers/passesAnalysis.controllers.js");
  
    var router = require("express").Router();
  
    // // Create a new Tutorial
    // router.post("/", tutorials.create);
  
    // Retrieve PassesAnalysis
    router.get("/PassesAnalysis/:op1_ID/:op2_ID/:date_from/:date_to", passesAnalysis.getPasses);
  
    // Retrieve passesByStationID
    router.get("/", passesByStation.getAll);
  
    // // Retrieve a single Tutorial with id
    // router.get("/:id", tutorials.findOne);
  
    // // Update a Tutorial with id
    // router.put("/:id", tutorials.update);
  
    // // Delete a Tutorial with id
    // router.delete("/:id", tutorials.delete);
  
    // // Delete all Tutorials
    // router.delete("/", tutorials.deleteAll);
  
    app.use('/api/passes', router);
  };