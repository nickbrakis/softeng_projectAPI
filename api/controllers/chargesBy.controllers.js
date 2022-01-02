const Passes = require("../models/passes.models.js");

exports.getChargesBy = (req, res) => {
    Passes.chargesBy(req.params.op_ID, req.params.date_from, req.params.date_to, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Passes with op1_id ${req.params.op_ID}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Passes from id " + req.params.op_ID
          });
        }
      } 
      else res.send(data);
    });
  };