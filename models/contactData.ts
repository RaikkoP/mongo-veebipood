import mongoose from "mongoose";

const contactData = new mongoose.Schema({
    email: {
        required: true,
        type: String
    },
    telephone: {
        required: true,
        type: String
    },
    address: {
        required: true,
        type: String
    },
})

export default mongoose.model('ContactData', contactData);