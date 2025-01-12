import express from 'express';
const roomRouter = express.Router();

roomRouter.get('/createRoom', (req, res) => {
    res.status(201).json({ message: 'Room created successfully' });
});

export default roomRouter;