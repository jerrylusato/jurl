if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const mongoose = require("mongoose")
const express = require("express")
const app = express()

const Url = require("./models/url");

app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(express.urlencoded({ extended: false }))

app.get("/", (req, res) => res.render("index"))

app.get("/:index", (req, res) => {
  Url.findOne({ index: req.params.index })
    .then(result => res.redirect(result.url))
    .catch(err => console.log(err));
})

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
          const newUrl = req.protocol + "://" + req.get("host") + "/" + result.index;
          return res.render("response", { newUrl });
        });
    })
    .catch(err => console.log(err));
})

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => app.listen(process.env.PORT))
  .catch(err => console.log(err));
