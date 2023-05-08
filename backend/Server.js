const express = require("express");
const dbconnect = require("./Config/dbconnection");
const Route = require("./Routes/LoginRoutes");
const app = express();
const cors = require("cors");

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/Auth", Route);

dbconnect();
app.get("/", (req, res) => {
  res.send("server is running");
});

app.listen(8080);
