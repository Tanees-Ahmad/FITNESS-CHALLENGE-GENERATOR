const express = require('express');
const app = express();

const path = require('path');

const p = path.join(__dirname,"../views");
app.use(express.static(p));

app.set("view engine","ejs")

require("./db/conn");
app.get("/",(req,res) =>{
    res.render("index");
    // res.send("yes")
})
app.listen(3000);