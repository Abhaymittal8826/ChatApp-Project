import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/user.route.js";
const app = express();
app.use(express.json());
dotenv.config();
const PORT = process.env.PORT || 3001;
const URI = process.env.MONGODB_URI;

async function connectToMe(){
  try{
    await mongoose.connect(URI);
    console.log("mongoose is connected");
  }
catch(error){
 console.log("Error occured" , error.message);
}
}

connectToMe();

app.get('/', (req, res) => {
  res.send('Hello  World!')
})

app.use("/user", userRoutes);
  
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
