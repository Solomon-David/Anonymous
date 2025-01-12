import express, { Express, Request, Response } from "express";
import mongoose from 'mongoose';
import { configDotenv } from 'dotenv';
import roomRouter from './apis/rooms';

configDotenv();

const port = process.env.PORT || 8080;
const app: Express = express();
app.use(express.json());
app.use('/api', roomRouter);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "hello world!" });
});

app.get("/status", (req: Request, res: Response) => {
  res.status(200).json({ message: `Server running on port ${port}.` });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
  mongoose.connect(process.env.MONGO_URI! as string)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Error connecting to MongoDB:', error));
});