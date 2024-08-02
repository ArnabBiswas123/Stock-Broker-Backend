const express = require("express");
const connectDB = require("./db/connect");
const app = express();
const userRouter=require('./routes/userRouter')
const port = process.env.PORT || 5000;

require("dotenv").config();

const cors = require("cors");
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Stock Broker");
  });


app.use("/api/v1/user",userRouter)
const start = async () => {
    try {
      await connectDB(process.env.MONGO_URI);
      await app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
      });

   } catch (error) {
      console.log(error);
    }
  };
  
start();