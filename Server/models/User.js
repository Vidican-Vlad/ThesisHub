import mongoose from "mongoose";
const userSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim:true,
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
    cycle: {
        type: String,
        enum: ["Licenta", "Master", null],
        default: null
    }
});

const user = mongoose.model("User",userSchema);

export default user;
