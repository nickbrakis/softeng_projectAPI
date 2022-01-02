const Passes = require("../models/passes.models.js");

exports.getAll = (req, res) => {
    const station = req.query.passes_station_id;
  
    Passes.getAll(station, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving passes."
        });
      else res.send(data);
    });
  };
  

