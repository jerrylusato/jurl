require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const Url = require("./models/url");

//middlewares
app.use(cors());
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

//routes
app.get("/", (req, res) => {
  res.render("index");
});

app.post("/", (req, res) => {
  Url.find()
    .sort({ _id: -1 })
    .limit(1)
    .then((result) => {
      let index = 0;
      result[0] ? (index = result[0].index + 1) : (index = 1);
      const url = new Url({ index: index, url: req.body.url });
      url
        .save()
        .then((result) => {
          const newUrl =
            req.protocol + "://" + req.get("host") + "/" + result.index;
          res.render("response", { newUrl });
        });
    })
    .catch((err) => console.log(err));
});

app.get("/:index", (req, res) => {
  Url.findOne({ index: req.params.index })
    .then((result) => {
      res.redirect(result.url);
    })
    .catch((err) => console.log(err));
});

//server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => app.listen(process.env.PORT))
  .catch((err) => console.log(err));
