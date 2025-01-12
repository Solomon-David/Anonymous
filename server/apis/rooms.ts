import { Router, Request, Response } from 'express';
const roomRouter = Router();

roomRouter.post('/createRoom', (req: Request, res: Response) => {
    const { email, roomName } = req.body;

    res.status(201).json({ message: 'Room created successfully' });
});

export default roomRouter;