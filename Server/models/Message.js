import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({

    content: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    sender: {
        type: mongoose.Schema.Types.ObjectID,
        required: true,
        ref: "User"
    },
    conversation: {
        type: mongoose.Schema.Types.ObjectID,
        required: true,
        ref: "Conversation"
    },
    attachements: [{
        type: mongoose.Schema.Types.ObjectID,
        ref: "File"
    }]
});

const message = mongoose.model("Message",messageSchema);

export default message;