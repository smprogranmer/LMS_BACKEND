// const app = require('./app');
import app from "./app.js"
// const mongodb_url = require("./config/db");
import mongodb_url from "./config/db.js";

mongodb_url()
.then(() =>{
  app.listen(process.env.PORT || 8000, (req,res) =>{
    console.log(`Server is listening on port ${process.env.PORT}`);
  })
})
.catch((error) =>{
  console.log(`MongoDb connection error ${error}`)
})