import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 100
        },

        username: {
            type: String,
            required: true,
            unique: true,
            minlength: 3,
            maxlength: 30
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },

        password: {
            type: String,
            required: true,
            minlength: 8,
            unique:true
        },

        avatar: {
            type: String,
            required:true
        },

        isVerified: {
            type: Boolean,
            default: false
        },

        refreshToken: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
);
const User=mongoose.model("User",userSchema)
export default User;
