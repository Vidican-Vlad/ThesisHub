import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
        unique:true
    },
    extension:{
        type:String,
        required:true,
        enum:[".jpg",".png",".pdf",".doc"]
    }
});

const file = mongoose.model("File",fileSchema);

export default file;