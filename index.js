import express from 'express';
import bodyParser from 'body-parser';
import 'dotenv/config'
import User from "./models/user.js";
import connection from './mongoC.js';


const port = 5000;
const app = express();

connection();

app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
  
    next();
  });

// Parses the text as url encoded data
app.use(bodyParser.urlencoded({ extended: true }));

// Parses the text as json
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.status(200).json({message : 'Hello World, from express okk'});
})

app.post("/adduser", async (req, res) => {
    try {
      const { name, email, age, address, phoneNumber } = req.body;
      const newUser = new User({ name, email, age, address, phoneNumber });
      await newUser.save();
      res.status(201).json({ message: "User added successfully", user: newUser });
    } catch (err) {
        console.log(err,"I am error");
      res.status(500).json({ message: "Error adding users", error: err.message });
    }
  });
  
  // Route to get a user by ID
  app.get("/getuser/:id", async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ message: "Error retrieving user", error: err.message });
    }
  });

  app.get("/getusers", async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ message: "Error retrieving users", error: err.message });
    }
  });
  

app.listen(port, function () {
    console.log("Server is listening at port:" + port);
});
 