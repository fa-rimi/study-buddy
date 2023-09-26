const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Dictionary = require('./dictionary');

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
    dictionary: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Dictionary',
      },
    ],

  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);