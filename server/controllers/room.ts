import { Request, Response } from 'express';
import Room from '../models/room';

export const createRoom = async (req: Request, res: Response) => {
    const { email, roomName }: { email: string, roomName: string; } = req.body;
    if (!email || !roomName) {
        res.status(400).json({ message: 'Email and room name are required' });
    }
    const existingRoom = await Room.findOne({ $or: [{ roomName }, { email }] });
    if (existingRoom) {
        res.status(400).json({ message: 'Room name already exists' });
    }
    const room = await Room.create({ email, roomName });
    res.status(201).json({
        message: 'Room created successfully',
        room
    });
};