const express = require('express');
const fs = require("fs");
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

// important for Access-Control-Allow-Origin
app.use(cors());

// adds ability to pass urls
app.use(bodyParser.urlencoded({
    extended: true
}));
// adds ability to pass json
app.use(bodyParser.json());
// Read database json
// IMPORTANT - readFileSync is only used because the file is critical to the web app on initial load
// If the file was to change like in production then readFile() would be used to allow other operations whilst it loaded
// Potential speed increases with JSON object if associative array
var dbCore = JSON.parse(fs.readFileSync("db.json"))["vehicles"];
var coreKeys = Object.keys(dbCore[0]);
for(b = 0; b < coreKeys.length;b++) {
    if(coreKeys[b] !== "topFeatures" && dbCore[0][coreKeys[b]] !== null && typeof dbCore[0][coreKeys[b]] === "object") {
        var arrayAdjust = Object.keys(dbCore[0][coreKeys[b]]);
        for(i = 0; i < arrayAdjust.length;i++) {
            coreKeys.splice(parseInt(b) + i + 1, 0,arrayAdjust[i]);
        }
    }
}
function isFloat(n) {
    return n === +n && n !== (n|0);
}

function isInteger(n) {
    return n === +n && n === (n|0);
}
// group all json values as we want to display min max sliders and list
var structuredData = {};
for(i = 0; i < dbCore.length;i++) {
    var subTree = "1";
    for(var indivKey in coreKeys) {
        if(!(coreKeys[indivKey] in structuredData)) {
            structuredData[coreKeys[indivKey]] = [];
        }
        if(coreKeys[indivKey] in dbCore[i]) {
            if(typeof dbCore[i][coreKeys[indivKey]] !== "object") {
                if(isFloat(dbCore[i][coreKeys[indivKey]]) || isInteger(dbCore[i][coreKeys[indivKey]])) {
                    structuredData[coreKeys[indivKey]].push(dbCore[i][coreKeys[indivKey]]);
                }
                else {
                    structuredData[coreKeys[indivKey]][dbCore[i][coreKeys[indivKey]]] = "value";
                }
            }
            else if(typeof dbCore[i][coreKeys[indivKey]] === "object")  {
                subTree = coreKeys[indivKey];
            }
        }
        else if(dbCore[i][subTree] === null || dbCore[i][subTree] === undefined) {
        }
        else if(coreKeys[indivKey] in dbCore[i][subTree]) {
            if(isFloat(dbCore[i][subTree][coreKeys[indivKey]]) || isInteger(dbCore[i][subTree][coreKeys[indivKey]])) {
                structuredData[coreKeys[indivKey]].push(dbCore[i][subTree][coreKeys[indivKey]]);
            }
            else if(dbCore[i][subTree][coreKeys[indivKey]] != null) {
                structuredData[coreKeys[indivKey]][dbCore[i][subTree][coreKeys[indivKey]]] = "subtree";
            }
        }
    }
}
for(i = 0; i < coreKeys.length;i++) {
    if(isFloat(structuredData[coreKeys[i]][0]) || isInteger(structuredData[coreKeys[i]][0])) {
        var max = Math.max.apply(null,structuredData[coreKeys[i]]);
        var min = Math.min.apply(null,structuredData[coreKeys[i]]);
        structuredData[coreKeys[i]] = [min,max];
    }
    else {
        structuredData[coreKeys[i]] = Object.keys(structuredData[coreKeys[i]]);
    }
}
// remove unwanted data -
delete structuredData["id"];
delete structuredData["attentionGrabber"];
delete structuredData["autotraderDescription"];
delete structuredData["displayImage"];
delete structuredData["displayImage"];
delete structuredData["small"];
delete structuredData["medium"];
delete structuredData["large"];
delete structuredData["statistics"];
delete structuredData["width"];
delete structuredData["length"];
delete structuredData["topFeatures"];
delete structuredData["vehicleCapDetails"];
delete structuredData["vehiclePrice"];
delete structuredData["motUntil"];
delete structuredData["watchers"];
delete structuredData["capDerivativeName"];
delete structuredData["registration"];
delete structuredData["capModelName"];
delete structuredData["capRangeName"];
delete structuredData["presentationMake"];
delete structuredData["transmission"];
delete structuredData["serviceHistoryPresent"];
delete structuredData["fuel"];
delete structuredData["watchersCount"];
delete structuredData["topSpeed"];
delete structuredData["optionsCost"];
delete structuredData["wasPrice"];
delete structuredData["seats"];
delete structuredData["ncapStarRating"];
delete structuredData["engineSize"];
delete structuredData["bodyStyle"];
delete structuredData["capMakeName"];
delete structuredData["presentationRange"];
delete structuredData["minimumMonthlyPayment"];
delete structuredData["salePrice"];
delete structuredData["pcpMonthlyPayment"];
delete structuredData["taxBand"];
delete structuredData["luggageCapacitySeatsUp"];
delete structuredData["luggageCapacitySeatsDown"];
delete structuredData["sixMonthRoadTax"];
delete structuredData["zeroToSixtySeconds"];
delete structuredData["mpg"];
delete structuredData["carbonEmission"];
delete structuredData["fuelCapacity"];
delete structuredData["year"];
delete structuredData["storeName"];
delete structuredData["enginePower"];
delete structuredData["yearlyRoadTax"];
delete structuredData["monthlyPayment"];
delete structuredData["insuranceGroup"];
delete structuredData["mileage"];

// Standard get request
app.get('/api/searchkeys', (req, res) => {


    res.json(structuredData);
});
// get cars with page
app.get('/api/cars/:perpage/:page', (req, res) => {
    var perpage = parseInt(req.params.perpage);
    var page = 0;
    if(req.params.page) {
        page = parseInt(req.params.page);
    }
    var dataToSend = {cars:[],result:""};

    for(i = 0; i < perpage;i++) {
        var numGen = i + (perpage * page);
        if(dbCore.length > numGen)
            dataToSend.cars.push(dbCore[numGen]);
    }
    if(dataToSend.cars.length != 0) {
        dataToSend.result = "success";
    }
    else {
        dataToSend.result = "No results";
    }
    res.json(dataToSend);
});
app.get('/api/car/:id', (req, res) => {
    var cardata = "";
    console.log(req.params.id);
    for(i = 0; i < dbCore.length;i++) {
        if(dbCore[i].id === parseInt(req.params.id)) {
            console.log("found");
            cardata = dbCore[i];
        }
    }
    res.json(cardata);
})
app.get('/api/carsearch/:perpage/:page/:doors/:color/:drivetrain', (req, res) => {
    var perpage = parseInt(req.params.perpage);
    var page = 0;
    if(req.params.page) {
        page = parseInt(req.params.page);
    }
    console.log(req.params.page);
    var allowedCars = [];
    if(req.params.color != null && req.params.doors != null  && req.params.drivetrain != null ) {

    var colorC = req.params.color.split(',');
    var doors = req.params.doors.split(',');
    var drivetrain = req.params.drivetrain.split(',');

    for(i = 0; i < dbCore.length;i++) {
        var colourTrue = false;
        if(req.params.color === "null") {
            colourTrue = true;
        }
        else {
            for(a = 0; a < colorC.length;a++) {
                if(dbCore[i].displayColour == colorC[a])
                    colourTrue = true;
            }
        }

        var doorsTr = false;
        console.log(dbCore[i].doors  + " " + doors[0]);
        if(dbCore[i].doors >= doors[0] || dbCore[i].doors <= doors[1])
            doorsTr = true;
        var driveTrain = false;
        console.log(dbCore[i].drivetrain  + " " + drivetrain);
        if(req.params.drivetrain === "null") {
            driveTrain = true;
        }
        else {
            for (a = 0; a < drivetrain.length; a++) {
                if (dbCore[i].drivetrain == drivetrain[a])
                    driveTrain = true;
            }
        }
        console.log(doorsTr + " " + driveTrain + " " + colourTrue);
        if(doorsTr && driveTrain && colourTrue) {
            allowedCars.push(dbCore[i]);
        }
    }
    }
    else
        allowedCars = dbCore;
        console.log(allowedCars.length);
        var dataToSend = {cars:[],result:""};
        for(i = 0; i < perpage;i++) {
            var numGen = i + (perpage * page);
            if(allowedCars.length > numGen)
                dataToSend.cars.push(allowedCars[numGen]);
        }
        if(dataToSend.cars.length != 0) {
            dataToSend.result = "success";
        }
        else {
            dataToSend.result = "No results";
        }
    console.log("end");
    console.log(req.params);
    res.json(dataToSend);
});

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);