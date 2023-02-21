import mongoose from "mongoose";

const proposalSchema = new mongoose.Schema({

    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true,
    },
    studyCycle:{
        type: String,
        required: true,
        enum: ["Licenta","Master"]
    },
    owner:{
        type: mongoose.Schema.Types.ObjectID,
        required: true,
        ref: "User"
    },
    applicants:[
        {
            type: mongoose.Schema.Types.ObjectID,
            required: true,
            ref: "User"
        }
    ],
    approved:{
        type: mongoose.Schema.Types.ObjectID,
        ref: "User"
    },
    attachements:[
        {
            type: mongoose.Schema.Types.ObjectID,
            ref: "File"
        }
    ],
    tags:[
        {
            type: mongoose.Schema.Types.ObjectID,
            required: true,
            ref: "Tag"
        }
    ],
    available:{
        type:Boolean,
        default:true
    },
})
const proposal = mongoose.model("Proposal", proposalSchema);

export default proposal;