require("dotenv").config();

const app = require("./app");
const { initMongoDB } = require("./services/db");

// Initialize MongoDB, but DO NOT block the export
initMongoDB();

module.exports = app;
