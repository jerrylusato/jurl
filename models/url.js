const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const urlSchema = new Schema({
  index: Number,
  url: String
});

const Url = mongoose.model("Url", urlSchema);

module.exports = Url;