const express = require("express");
const bodyParser = require("body-parser");

// Initializations
const app = express();

// Setting 
app.set("port", process.env.PORT || 5000);

// Middlewares
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json()); 

// Routes
app.use(require("./routes/events"));
//app.use(require(./routes/summary));

// Starting the server
app.listen(app.get("port"), () => {
    console.log("Server on Port", app.get("port"));
});
