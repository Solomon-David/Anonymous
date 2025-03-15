import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import Room from '../models/room';
import Messages from "../models/message"
import { v4 } from 'uuid';

//setting up multer to use memory storage
const uploads = multer({ storage: multer.memoryStorage() });


export const createRoom = async (req: Request, res: Response, next: NextFunction) => {
    try { 
        const { email, roomName }: { email: string, roomName: string; } = req.body;
        console.log(email);
        console.log(roomName);
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

export const joinRoom = async (req: Request, res: Response, next: NextFunction) => { 
    try{
        // get roomName
        const roomName = req.params.roomName;
Room.findOneAndUpdate
        // get room
        const room = await Room.findOne({roomName: roomName});

        if(room){
            // get room messages
            const [messages] = await Messages.find({roomName: roomName});
            //return messages and room
            res.status(200).json({
                room,
                messages: [messages]
            });
        }
    }catch(error: any){
        console.log(error.message);
        next(error);
        res.json({
            error
        })
    } 
};


export const sendMessage = async (req: Request, res: Response, next: NextFunction) => {
    try{
    // getting messages and roomName
    const {id, message, roomName, replyTo} = req.body;

    let messageObject = {id,message,roomName};
    if (req.file) {
            const image = req.file.buffer.toString('base64');
            messageObject = Object.assign(messageObject, {image: image});
        }
    if (replyTo){
        messageObject = Object.assign(messageObject, {replyId: replyTo});
    }
    // saving message
    const messageDoc = await Messages.create(messageObject);
    messageDoc.save();
    
    
    }catch(error : any){
        res.json({error})
    }
}

export const sendMessageWithImage = [uploads.single("file"), sendMessage];
