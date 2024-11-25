import mongoose from "mongoose"

const appUserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    toggle: { type: Boolean, required: true, default: false },
    admin: { type: Boolean, required: true, default: false }
})

const appUser = mongoose.models.appusers || mongoose.model('appusers', appUserSchema)
export default appUser