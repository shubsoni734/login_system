const express = require("express");
const {
  RegisterControllers,
  LoginControll,
  FatchData,
  updateData,
} = require("../Controllers/LoginControllers");

const http = require("http");

const Route = express.Router();

Route.post("/register", RegisterControllers);

Route.post("/login", LoginControll);

Route.get("/home", FatchData);

Route.put("/update", updateData);

module.exports = Route;
