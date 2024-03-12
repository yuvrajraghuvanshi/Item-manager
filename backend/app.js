const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
require("dotenv").config();
const itemRoutes = require("./routes/itemRoutes");

app.use(express.json({ limit: '50mb' }));
app.use(cors());

const mongoUrl = process.env.MONGODB_URL;
mongoose.connect(mongoUrl, err => {
  if (err) throw err;
  console.log("Mongodb connected...",mongoUrl);
});

app.use("/api/items", itemRoutes);


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Backend is running on port ${port}`);
});
