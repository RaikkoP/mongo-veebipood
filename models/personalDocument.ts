import mongoose from 'mongoose';

const personalDocument = new mongoose.Schema({
    documentType: {
        required: true,
        type: String
    },
    documentCode: {
        required: true,
        type: String
    },
    documentReleaseDate: {
        required: true,
        type: mongoose.Schema.Types.Date
    },
    documentExpireDate: {
        required: true,
        type: mongoose.Schema.Types.Date
    },
    countryOfDocumentOrigin: {
        required: true,
        type: String
    }
})

export default mongoose.model('PersonalDocument', personalDocument)