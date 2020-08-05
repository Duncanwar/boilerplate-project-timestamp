// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// route api
app.get("/api/timestamp/:date_string", (req,res)=>{
  let date_string = req.params.date_string;

  let date = new Date(date_string);

  if(/\d{5,}/.test(date_string)){
const dateInt = parseInt(date_string);
res.json({unix: date_string , utc:new Date(dateInt).toUTCString()})
  }

  if(date.toString() === "Invalid Date"){
    res.json({error : "Invalid Date"});
  } else{
         res.json({unix : date.getTime(), utc: date.toUTCString()})

      }
    })
// apps
        app.get("/api/timestamp", (req,res)=>{

                 res.json({unix: Date.now(), utc: Date()})
                })
// listen for requests :)
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});