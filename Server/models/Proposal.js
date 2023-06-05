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
    applications:[
        {
            applicant:{
                type: mongoose.Schema.Types.ObjectID,
                required: true,
                ref: "User"
            },
            message:{
                type: String,
            },
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
    tags:[{
        type: mongoose.Schema.Types.ObjectID,
        ref: "Tag"
    }],
    available:{
        type:Boolean,
        default:true
    },
})
const proposal = mongoose.model("Proposal", proposalSchema);

export default proposal;