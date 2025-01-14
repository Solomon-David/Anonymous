import { Schema, model } from "mongoose";

const messageSchema : Schema = new Schema({
    
    id: {
        type: Number,
        min:0
    },
    replyId: {
        type: Number,
        min:0,
    },
    message: {
        type: String,
        validate: {
            validator: function(this: any, value: string){
                return this.image || (value && value.length > 0);
            },
            message: "text is required when no image is attached"
        }
    },
    image: {
        type: Buffer
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const Message = model("Messages", messageSchema);

export default Message;