import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import cookieParser from "cookie-parser";


mongoose.set('strictQuery', true);
const app = express();
dotenv.config();

app.use(cookieParser());

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

mongoose.connect(process.env.MONGODB)
  .then(() => {
    console.log('connected to mongoDB');
  })
  .catch((err) => {
    console.log(err.message);
  });

  app.use(express.json());

  app.use("/api/auth", authRoute);  
  app.use("/api/users", usersRoute);  
  app.use("/api/hotels", hotelsRoute);  
  app.use("/api/rooms", roomsRoute);  
 
  app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: errorMessage,
      stack: err.stack, 
    });
  });


  
const port = process.env.PORT || 6000;
app.listen(port, () => {
  console.log(`server at http://localhost:${port}`);
});

