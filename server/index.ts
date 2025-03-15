import express, { Express, Request, Response } from "express";
import mongoose from 'mongoose';
import { configDotenv } from 'dotenv';
import roomRouter from './apis/rooms';

configDotenv();

const port = process.env.PORT || 8080;
const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api', roomRouter);


// Test Routes
app.get("/", (req: Request, res: Response) => {
  
  res.status(200).json({ message: "hello world!" });
});

app.get("/status", (req: Request, res: Response) => {
  const connection = mongoose.connection;
  if(connection.readyState){
    res.status(200).json({ message: `Server running fine on port ${port} and database is connected.` });
    return;
  }
  else{
  res.status(200).json({ message: `Server running fine on port ${port} but database is not connected.` });
  return;
  }
});
// End Test Routes

app.all("*", (req: Request, res: Response) => {
  res.status(404).json({ message: "Route or Method not found on this server" });
});


app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
  mongoose.connect(process.env.MONGO_URI! as string)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Error connecting to MongoDB:', error));
});