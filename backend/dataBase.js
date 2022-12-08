const mongoose = require("mongoose");

const Database = async () => {
  await mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Database Connected Successfully");
    })
    .catch((error) => {
      console.log(error.message);
    });
};

module.exports = Database;
