const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const urlSchema = new Schema({
  url: String
});

const Url = mongoose.model("Url", urlSchema);

module.exports = Url;