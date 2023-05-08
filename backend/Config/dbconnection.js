const mongoose = require("mongoose");

const url = "mongodb://127.0.0.1:27017/Registers";
const dbconnect = async () => {
  try {
    const conn = await mongoose.connect(url);
    console.log(`connecct to database ${conn}`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = dbconnect;
