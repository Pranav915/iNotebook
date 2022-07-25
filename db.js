const mongoose = require("mongoose");

const connectToMongo = () => {
  mongoose.connect(process.env.MONGO_URI, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected to mongo successfully");
    }
  });
};

module.exports = connectToMongo;
