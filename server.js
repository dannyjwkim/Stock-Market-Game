var express = require("express");
var bodyParser = require("body-parser");
var quotes = require("./routes/updata.js");

// Sets up the Express App
// =============================================================
var app = express();

var PORT = process.env.PORT || 8000;
// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
process.env.SECRET_key = "randomsecretforsigningjwt";
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
// Static directory
app.use(express.static("./public"));
// Routes =============================================================
require("./routes/first.js")(app);
require("./routes/inside.js")(app);
require("./routes/apiman.js")(app);



// Syncing our sequelize models and then starting our express app
db.sequelize.sync({}).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});

var timer =  setInterval(function () {
        quotes.getQuote();
      }, 1000*600);
