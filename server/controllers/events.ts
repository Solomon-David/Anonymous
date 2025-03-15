import { EventEmitter } from "events";
import { Request, Response } from "express";

const eventEmitter = new EventEmitter();

/**
 * Function to send a message to clients in a specific room.
 */
export const updateMessage = async (req: Request, res: Response) => {
    try {
        const { message, roomName } = req.body;

        if (!roomName || !message) {
            return res.status(400).json({ error: "roomName and message are required" });
        }

        // Emit event only to the specified room
        eventEmitter.emit(`updateMessages:${roomName}`, message);

        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

/**
 * Function to handle SSE connections for a specific room.
 */
export const sseHandler = (req: Request, res: Response) => {
    const { roomName } = req.query;

    if (!roomName || typeof roomName !== "string") {
        res.status(400).json({ error: "Room name is required" });
        return;
    }

    // Set SSE headers
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    // Send keep-alive messages every 30 seconds
    const keepAlive = setInterval(() => {
        res.write(": keep-alive\n\n");
    }, 30000);

    // Function to send messages to this client
    const sendMessageToClient = (message: string) => {
        res.write(`data: ${JSON.stringify({ roomName, message })}\n\n`);
    };

    // Listen for room-specific events
    eventEmitter.on(`updateMessages:${roomName}`, sendMessageToClient);

    // Cleanup when client disconnects
    req.on("close", () => {
        clearInterval(keepAlive);
        eventEmitter.off(`updateMessages:${roomName}`, sendMessageToClient);
    });
};

export default eventEmitter;
