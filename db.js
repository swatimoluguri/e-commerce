const { MongoClient } = require("mongodb");
require("dotenv").config();
const { DB_URI } = process.env;

let dbConnection;

module.exports = {
  connectToDb: (cb) => {
    MongoClient.connect(DB_URI)
      .then((client) => {
        dbConnection = client.db();
        return cb();
      })
      .catch((err) => {
        console.log(err);
        return cb(err);
      });
  },
  getDb: () => dbConnection,
  getOrderModel: () => dbConnection.collection("orders"),
  getUserModel: () => dbConnection.collection("users"),
  getCustomerEnquiries: () => dbConnection.collection("customer-enquiries"),
  getNewsletter: () => dbConnection.collection("newsletters"),
  getResetPwd: () => dbConnection.collection("reset-password"),
};
