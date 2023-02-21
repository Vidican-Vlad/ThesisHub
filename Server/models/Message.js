import mongoose from "mongoose";

const messageSchema = new mongooose.Schema({

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
    receiver: {
        type: mongoose.Schema.Types.ObjectID,
        required: true,
        ref: "User"
    },
    attachement: {
        type: mongoose.Schema.Types.ObjectID,
        ref: "File"
    }
});

const message = mongooose.model("Message",messageSchema);

export default message;