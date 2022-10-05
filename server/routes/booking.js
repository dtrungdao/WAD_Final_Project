const express = require("express");

// bookingRoutes is an instance of the express router to define the routes
const bookingRoutes = express.Router();

// Connect to database
const dbo = require("../db/conn");

// Convert id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// Get a list of all the records.
bookingRoutes.route("/booking").get(function (req, res) {
 let db_connect = dbo.getDb("booking");
 db_connect
   .collection("booking")
   .find({})
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
// Get a single record by id
bookingRoutes.route("/booking/:id").get(function (req, res) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect
   .collection("booking")
   .findOne(myquery, function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
// Post: create a new record.
bookingRoutes.route("/booking/add").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myobj = {
   date: req.body.date,
   time: req.body.time,
   court: req.body.court,
 };
 db_connect.collection("booking").insertOne(myobj, function (err, res) {
   if (err) throw err;
   response.json(res);
 });
});
 
// Update a record by id.
// Update appears in Terminal windows, where I runs server.js. But there is a popup in browser "Error in Fetching: not found"
bookingRoutes.route("/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      date: req.body.date,
      time: req.body.time,
      court: req.body.court,
    },
  };
  db_connect
    .collection("booking")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
 });
// Delete a record
bookingRoutes.route("/:id").delete((req, response) => {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect.collection("booking").deleteOne(myquery, function (err, obj) {
   if (err) throw err;
   console.log("1 document deleted");
   response.json(obj);
 });
});


module.exports = bookingRoutes;