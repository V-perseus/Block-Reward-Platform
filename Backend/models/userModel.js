import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    email: { type: String, required: true },
    passwordHash: { type: String, required: true },
    isInterpreter: { type: String, required: false },
    phoneNumber: { type: String, required: false },
    location: { type: String, required: false },
    experience: { type: String, required: false },
    language: { type: String, required: false },
    availableTime: { type: String, required: false },
    company: { type: String, required: false },
    balance:{type:String,required:false},
    algo_address:{type:String,required:false},
    algo_sk:{type:String,required:false},
});

export const User = mongoose.model("reactUser", userSchema);
