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

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: true,
    },
    password: {
      type: String,
      minLength: 6,
      required: true,
    },
    dictionary: [dictionarySchema], // Embed the dictionary schema here
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);