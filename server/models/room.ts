import { ObjectId } from "mongodb";
import {Schema, model} from "mongoose";

const roomsSchema: Schema = new Schema({
    id: {
        type: ObjectId
    },
    email: {
        type: String,
        required: true
    },
    roomName: { 
        type: String,
        required: true},
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const Room = model("Rooms", roomsSchema);

export default Room;