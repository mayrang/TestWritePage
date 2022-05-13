const express = require("express");
const app = express();
const test = require("./Route/test");

var cors = require('cors');
app.use(cors());

app.use("/api", test);

const port = 8080;
app.listen(port, ()=> console.log(`${port}`));