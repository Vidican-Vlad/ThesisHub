import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    count:{
        type: Number,
        default: 0
    }
});

const tag = mongoose.model("Tag", tagSchema);
export default tag;
