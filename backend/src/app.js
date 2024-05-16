const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const User = require("./models/register");
const path = require('path');
const expresSession = require('express-session');
const passport=require('passport');
const cookieParser=require('cookie-parser');
const localStrategy = require('passport-local');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
const p = path.join(__dirname,"../views");
app.use(express.static(p));
app.use(expresSession({
  resave: false,
  saveUninitialized:false,
  secret:"hello"
}))
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new localStrategy(User.authenticate()));
app.set("view engine","ejs")
// const User = require("./models/register");
require("./db/conn");
app.get("/user",(req,res) =>{
  res.status(201).render("index2", { name });
    // res.send("yes")
})
app.get("/",(req,res) =>{
  res.render("index");
  // res.send("yes")
})
let body =0;

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

// app.post('/register', async (req, res) => {
//   const userdata = new User({
//     username: req.body.email, // Assuming Passport-local-mongoose needs username
//     name: req.body.name,
//     email: req.body.email,
//   });

//   User.register(userdata, req.body.password, (err, user) => {
//     if (err) {
//       console.error('Error during registration:', err);
//       return res.status(500).json({ message: 'Registration error' });
//     }
//     // Registration successful, redirect to login page
//     res.redirect('/userProfile'); // Replace with your login page path
//   });
// });

// Separate login route
app.get("/userProfile", function(req, res) {
  res.render("userProfile", { name: body.email });
});
const zuhair = "Zuhair"; // Define and assign value to the variable
app.get("/index2", function(req, res) {
    res.render("index2");
});


  app.post('/signin', async (req, res) => {
    try {
      const { email, password } = req.body ;
    //    res.send(req.body);
      // Check if required fields are missing
      body = req.body;
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
         res.status(201).redirect("index2");
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