import express, { Express, Request, Response } from "express";
import { configDotenv } from 'dotenv';

configDotenv();

const port = process.env.PORT || 8080;
const app: Express = express();

app.get("", (req: Request, res: Response) => {
  res.send(`Server running on port ${port}.`);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});