import { Router } from 'express';
import { createRoom, joinRoom, sendMessage } from '../controllers/room';
import { sseHandler } from "../controllers/events";

const roomRouter = Router();

roomRouter.post('/createRoom', createRoom);

roomRouter.get("/joinRoom/:roomName", joinRoom);

roomRouter.post("/send", sendMessage);

roomRouter.get("messages", sseHandler);

export default roomRouter;