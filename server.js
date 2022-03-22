require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const Url = require('./models/url');

//middlewares
app.use(cors());
app.set('view engine', 'ejs');
const port = process.env.PORT;
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/", (req, res) => {
  res.render('index');
});

app.post("/", (req, res) => {
  console.log("The req url is " + req.url);
  const url = new Url(req.body);
  url
    .save()
    .then((result) => {
      const newUrl = req.url + result._id;
      res.render('response', { newUrl });
    })
    .catch((err) => console.log(err));
});

app.get("/:id", (req, res) => {
  Url.findById(req.params.id)
    .then((result) => {
      res.redirect(result.url);
    })
    .catch((err) => console.log(err));
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DB connected");
    app.listen(port, () => {
      console.log(`Listening at http://localhost:${port}`);
    });
  })
  .catch((err) => console.log(err));
