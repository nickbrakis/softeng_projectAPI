const sql = require("./db.js");
const moment = require('moment')

// constructor
const Passes = function(passes) {
    this.passes_pass_id = passes_pass_id;
    this.passes_timestamp = passes_timestamp; 
    this.passes_station_id = passes_station_id; 
    this.passes_vehicle_id = passes_vehicle_id;
    this.passes_charge = passes_charge;
};

Passes.getAll = (passes_station_id, result) => {
  const dateForm = 'YYYY-MM-DD HH:mm:ss';
  const reqTimestamp = moment().format(dateForm);
  let query = "SELECT * FROM passes";

  if (passes_station_id) {
    query += ` WHERE passes.passes_station_id LIKE '${passes_station_id}'`;
  }

  sql.query(query, function (err, rows) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    var string = JSON.stringify(rows)
    var json_res = JSON.parse(string)


    console.log("passes: ", json_res);
    result(null, json_res);
  });
};

Passes.passesAnalysis = (op1_id, op2_id, date_from, date_to, result) => {
  const dateForm = 'YYYY-MM-DD HH:mm:ss';
  const reqTimestamp = moment().format(dateForm);
  sql.query(`SELECT *
            FROM passes 
            LEFT JOIN vehicles 
            ON passes.passes_vehicle_id = vehicles.vehicles_vehicle_id 
            WHERE LEFT(passes_station_id, 2) = '${op1_id}' AND vehicles_tag_abbr = '${op2_id}' AND passes_timestamp > '${date_from}' AND passes_timestamp < '${date_to}';`, function (err, rows)  {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    var string = JSON.stringify(rows)
    var json_res = JSON.parse(string)

    list = new Array();
    for (var i = 0; i < rows.length; i++){
      list.push({
        PassIndex : i + 1,
        PassID : json_res[i].passes_pass_id,
        StationID : json_res[i].passes_station_id,
        TimeStamp : moment(json_res[i].passes_timestamp).format(dateForm),
        VehicleID : json_res[i].passes_vehicle_id,
        Charge : json_res[i].passes_charge
      });
    }
    var string_list = JSON.stringify(list)
    var passesList = JSON.parse(string_list) 
    const sendRes = {
      op1_ID : op1_id,
      op2_ID : op2_id,
      requestedTimestamp : reqTimestamp,
      PeriodFrom : moment(date_from).format(dateForm),
      PeriodTo : moment(date_to).format(dateForm),
      NumberOfPasses : rows.length,
      PassesList : passesList
    };
    

    if (rows.length) {
      console.log("found passes: \n", sendRes);
      result(null, sendRes);
      return;
    }

    // not found Passes with the id
    result({ kind: "not_found" }, null);
  });
};

module.exports = Passes;