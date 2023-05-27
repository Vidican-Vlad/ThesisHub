import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
        unique:true
    },
    displayName:{
        type:String,
        required:true,
    },
    extension:{
        type:String,
        required:true,
    },
    fullPath:{
        type:String,
        required: true
    }
});

const file = mongoose.model("File",fileSchema);

export default file;