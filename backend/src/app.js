const express = require('express');
const app = express();
const path = require('path');

const p = path.join(__dirname,"../public");
app.use(express.static(p));

require("./db/conn");
app.get("/",(req,res) =>{
    res.send("yes");
})
app.listen(3000);