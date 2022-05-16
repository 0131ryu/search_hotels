const mongoose = require("mongoose");

module.exports = async function connection() {
  try {
    const connectionParams = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useFindAndModify: false, userCreateIndex: true, //더이상 지원 안 함
    };
    await mongoose.connect(process.env.MONGODB_URL, connectionParams);
    console.log("Connected to db");
  } catch (error) {
    console.log(error);
    console.log("Could not connect to db");
  }

  mongoose.connection.on("connected", () => {
    console.log("Mongoose connected to db");
  });

  mongoose.connection.on("error", (err) => {
    console.log(err.message);
  });

  mongoose.connection.on("disconnected", () => {
    console.log("Mongoose connected is disconnected");
  });

  process.on("SIGINT", async () => {
    await mongoose.connection.close();
    process.exit(0);
  });
};

// mongoose
//   .connect(process.env.MONGODB_URL, {
//     dbName: "myFirstDatabase",
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("mongoDB connected");
//   })
//   .catch((err) => {
//     console.log(error.message);
//   });
