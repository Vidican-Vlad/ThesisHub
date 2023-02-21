import mongoose, { now } from "mongoose";

const conversationSchema = new mongoose.Schema({

    user1: {
        type: mongoose.Schema.Types.ObjectID,
        required: true,
        ref: "User"
    },
    user2: {
        type: mongoose.Schema.Types.ObjectID,
        required: true,
        ref: "User"
    },
    lastUpdated: {
        type: Date,
        default: now()
    }
});

const conversation = mongoose.model("Conversation",conversationSchema);

export default conversation;