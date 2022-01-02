const Passes = require("../models/passes.models.js");

exports.getPasses = (req, res) => {
    Passes.passesAnalysis(req.params.op1_ID, req.params.op2_ID, req.params.date_from, req.params.date_to, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Passes with op1_id ${req.params.op1_ID}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Passes from id " + req.params.op1_id
          });
        }
      } 
      else res.send(data);
    });
  };