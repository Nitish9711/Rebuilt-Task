const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const app = express();
const https = require("https");
const schedule = require("node-schedule");
const rule = new schedule.RecurrenceRule();
const axios = require("axios");
const DataToSent = require("./util");



app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});
var covidData;
fs.readFile('latestData.json',  (err, data) => {
   covidData =  JSON.parse(data);
})

rule.hour = 0;
rule.tz = "Etc/UTC";

const job = schedule.scheduleJob(rule, function () {
  getData();
  fs.readFile('latestData.json',  (err, data) => {
    covidData =  JSON.parse(data);
 })
});



app.use("/data/:month/:year", (req, res, next) => {
  const month = req.params.month;
  const year = req.params.year;

  console.log("params values");
  console.log(month);
  console.log(year);
  
  //total cases
  

  res.status(201).json(DataToSent(month, year, covidData));
  // res.status(201).json({
  //   mon:month,
  //   y: year
  // })
});

app.use("/", (req, res, next) => {
  console.log("server is running");
});

app.listen(5000);
