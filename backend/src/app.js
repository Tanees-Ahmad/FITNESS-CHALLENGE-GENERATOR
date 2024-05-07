const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const User = require("./models/register");
const path = require('path');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const p = path.join(__dirname,"../views");
app.use(express.static(p));

app.set("view engine","ejs")
// const User = require("./models/register");
require("./db/conn");
app.get("/",(req,res) =>{
    res.render("index");
    // res.send("yes")
})
app.post('/register', async (req, res) => {
    try {
      const { name, email, password, confirmpassword } = req.body || {};
  
      // Check if required fields are missing
      if (!name || !email || !password || !confirmpassword) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      // Check if passwords match
      if (password !== confirmpassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
      }
  
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
      }
  
      const newUser = await User.create({ name, email, password});
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  app.get('/signin', async (req, res) => {
    try {
      const { email, password } = req.query ;
    //    res.send(req.body);
      // Check if required fields are missing
      if (!email || !password ) {
        return res.status(400).json({ message: 'All fields are required' });
      }

  
      const existingUser = await User.findOne({ email:email });
    //   const existingUseremail = await User.findOne({ email:email });
      if (!existingUser) {
        return res.status(400).json({ message: 'Wrong email' });
      }
      else{
        if(existingUser.password==password){
    //   res.status(201).json({ message: 'successfully sign in' });}
         res.status(201).render("index2");
        }
      else{
        res.send("wrong password");
      }
    }
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
app.listen(3000);