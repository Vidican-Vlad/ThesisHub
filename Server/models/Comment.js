import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    content:{
        type: String,
        required: true,
    },
    parentPost:{
        type: mongoose.Schema.Types.ObjectID,
        required: true,
        ref: "Post"
    },
    owner:{
        type: mongoose.Schema.Types.ObjectID,
        required: true,
        ref: "User"
    },
    postedAt:{
        type:Date,
        default:Date.now()
    }
});

const comment = mongoose.model("Comment",commentSchema);

export default comment;
