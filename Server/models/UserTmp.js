import mongoose from "mongoose";

const userTmpSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ["Professor","Student","Admin"],
        required: true
    },
    securityKey: {
        type: String,
        required: true
    },
    proofOfIdentity: [
        {
            type: mongoose.Schema.Types.ObjectID,
            required: true,
            ref: "File"
            
        }
    ]

});

const userTmp = mongoose.model("UserTmp",userTmpSchema);

export default userTmp;
