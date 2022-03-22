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
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

//routes
app.get("/", (req, res) => {
  res.render('index');
});

app.post("/", (req, res) => {
  const reqUrl = req.protocol + '://' + req.get('host') + '/';
  const url = new Url(req.body);
  url
    .save()
    .then((result) => {
      const newUrl = reqUrl + result._id;
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

//server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => app.listen(process.env.PORT))
  .catch((err) => console.log(err));
