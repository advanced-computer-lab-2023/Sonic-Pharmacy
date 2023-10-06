//Di zi el main method lama bagy a run ba run el app js 3alatol
//use nodemon badal node 3lashan ma3odsh 22fl w aftah el server kol mara 

// External variables
const express = require("express");
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
require("dotenv").config();
//Declare ll methods el haktbha 

//el link bta3 el DB
const MongoURI = process.env.MONGO_URI;


//App variables
//3lashan a3rf akteb b express
const app = express();
//3lashan lw i am running haga fi el port el awlani yb2a fi option tany 
const port = process.env.PORT || "8000";
//require el models (schema) basamih kol ma aktb user refer to el schema user model 
// const user = require('./Models/User');


// #Importing the userController


// configurations
// Mongo DB
mongoose.connect("mongodb+srv://sarahhtawfik:Sarah123@cluster0.r6jvg7t.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp")
.then(()=>{
  console.log("MongoDB is now connected!")
// Starting server
 app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  })
})
.catch(err => console.log(err));
/*
                                                    Start of your code
*/
app.get("/home", (req, res) => {
    res.status(200).send("You have everything installed!");
  });

// #Routing to userController here
//lama bagy a test bakteb dool fi postman b3d el /
//ba map kol method l http req



/*
                                                    End of your code
*/
