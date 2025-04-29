import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

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

const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    confirmPassword: {
        type: String,
    },
}, { timestamps: true }); // createdAt & updatedAt


const User = mongoose.model("User", userSchema);
export default User;