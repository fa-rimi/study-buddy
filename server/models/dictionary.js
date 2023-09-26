const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dictionarySchema = new Schema({
  word: {
    type: String,
    required: true,
  },
  definition: {
    type: String,
    required: true,
  },
  example: {
    type: String,
  },
});

module.exports = mongoose.model("Dictionary", dictionarySchema);