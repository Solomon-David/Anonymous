import { Request, Response, NextFunction } from 'express';
import Room from '../models/room';
import { v4 } from 'uuid';

export const createRoom = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, roomName }: { email: string, roomName: string; } = req.body;
        if (!email || !roomName) {
            res.status(400).json({ message: 'Email and room name are required' });
            return;
        }
        const existingRoom = await Room.findOne({ $or: [{ roomName }, { email }] });
        if (existingRoom) {
            const _existingRoom = existingRoom.toObject();
            res.status(400).json({
                message: 'Room already exists',
                reason: (_existingRoom.email === email ? 'Email' : 'Room name') + ' already exists'
            });
            return;
        }
        const room = await Room.create({ roomId: v4(), email, roomName });
        res.status(201).json({
            message: 'Room created successfully',
            room
        });
        return;
    } catch (error) {
        console.log((error as Error).message);
        next(error);
        return;
    }
};
