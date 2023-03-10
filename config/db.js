const mongoose = require("mongoose");
const connectDb = async () => {
  try {
    const conn = await mongoose.connect(
      "Your MOngoDb URL",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("MongoDb Connected");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDb;
