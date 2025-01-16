import { Router } from 'express';
import { createRoom } from '../controllers/room';
const roomRouter = Router();

roomRouter.post('/createRoom', createRoom);

export default roomRouter;