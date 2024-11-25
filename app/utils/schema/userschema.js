import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: { type: String },
    phone: { type: Number },
    company: { type: String },
    address: { type: String },
    type: { type: String },
    purpose: { type: String },
    compname: { type: String },
    compadd: { type: String },
    createdAt: { type: String },
    entry: { type: Boolean },
    photo: { type: String }  // Add this field for base64 photo
})

const User = mongoose.models.users || mongoose.model('users', userSchema)
export default User