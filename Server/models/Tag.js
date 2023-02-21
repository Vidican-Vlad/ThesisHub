import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true
    }
});

const tag = mongoose.model("Tag", tagSchema);
export default tag;
