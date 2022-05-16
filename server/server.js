const express = require("express");
const app = express();
const test = require("./Route/test");
const bodyParser = require('body-parser');

var cors = require('cors');



// open database in memory

app.use(cors());
app.use(bodyParser.json());

app.use("/api", test);

const port = 8080;
app.listen(port, ()=> console.log(`${port}`));