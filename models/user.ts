import mongoose from "mongoose";

const user = new mongoose.Schema({
    firstName: {
        required: true,
        type: String
    },
    lastName: {
        required: true,
        type: String
    },
    password: {
      required: true,
      type: String
    },
    admin: {
      required: true,
      type: Boolean
    },
    created: {
      required: true,
      type: Date
    },
    personalDocument: {
        require: true,
        type: mongoose.Schema.Types.ObjectId, ref: 'PersonalDocument'
    },
    contactData: {
        require: true,
        type: mongoose.Schema.Types.ObjectId, ref: 'ContactData'
    }
})

export default mongoose.model('User', user);