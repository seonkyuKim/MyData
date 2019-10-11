// 참고 레퍼런스: https://github.com/gothinkster/node-express-realworld-example-app

const http = require("http"),
  path = require("path"),
  methods = require("methods"),
  express = require("express"),
  bodyParser = require("body-parser"),
  session = require("express-session"),
  cors = require("cors"),
  passport = require("passport"),
  errorhandler = require("errorhandler"),
  mongoose = require("mongoose");


const isProduction = process.env.NODE_ENV === "production";

// Create global app object
const app = express();

app.use(cors());

// Normal express config defaultsf
app.use(require("morgan")("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require("method-override")());
app.use(express.static(__dirname + "/public"));

if (!isProduction) {
  app.use(errorhandler());

  // API Docs
  app.use("/docs", express.static("docs"));
}

// Database Setting

const dev_url = "mongodb://localhost:27017/myData";
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true
};

if (isProduction) {
  mongoose
    .connect(process.env.MONGODB_URI, options)
    .then(() => console.log("DB Connected!"))
    .catch(err => {
      console.log(`DB Connection Error: ${err.message}`);
    });
} else {
  mongoose
    .connect(dev_url, options)
    .then(() => console.log("DB Connected!"))
    .catch(err => {
      console.log(`DB Connection Error: ${err.message}`);
    });
  mongoose.set("debug", true);
}

require("./models/billing");
require("./models/order");
require("./models/product");
require("./models/store");
require("./models/warehousing");


app.use("/api", require("./routes"));

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (!isProduction) {
  app.use(function(err, req, res, next) {
    console.log(err.stack);
    res.status(err.status || 500).json({'errors': {
      message: err.message,
      error: err
    }});
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status).json({'errors': {
    message: err.message,
    error: {}
  }});
});

// finally, let's start our server... 
const server = app.listen(process.env.PORT || 9228, function() {
  console.log("Listening on port " + server.address().port);
});
