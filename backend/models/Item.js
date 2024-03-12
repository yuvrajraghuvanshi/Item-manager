const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      // required: true,
    },
    title: {
      type: String,
      // required: true,
    },
    qty: {
      type: String,
      // required: true,
    },
    price: {
      type: String,
      // required: true,
    },
    date: {
      type: Date,
      default: Date.now(),
    },
    description: {
      type: String,
      // required: true,
      maxlength: 250
    },
  },
  {
    timestamps: true,
  }
);

const Item = mongoose.model("Item", itemSchema);
module.exports = Item;
