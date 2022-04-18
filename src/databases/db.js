const mongoose = require("mongoose");

module.exports = async function connection() {
  try {
    const connectionParams = {
      useNewUrlParser: true,
      //   userCreateIndex: true, //더이상 지원 안 함
      useUnifiedTopology: true,
    };
    await mongoose.connect(process.env.MONGODB_URL, connectionParams);
    console.log("Connected to db");
  } catch (error) {
    console.log(error);
    console.log("Could not connect to db");
  }
};
