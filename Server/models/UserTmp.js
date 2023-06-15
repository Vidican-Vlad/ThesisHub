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
        enum: ["Profesor","Student","Admin"],
        required: true
    },
    securityKey: {
        type: String,
        required: true
    },
    validated:{
        type:Boolean,
        default: false
    },
    cycle: {
        type: String,
        enum: ["Licenta", "Master", ""],
        default: null
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
