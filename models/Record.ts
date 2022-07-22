import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const RecordSchema = new mongoose.Schema({
    state: {
        type: String,
        required: true
    },
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    book: {
        type: Number,
        required: true
    },
    content: {
        type: String
    },
    rating: {
        type: Number
    },
    startDate: {
        type: String,
        required: true
    },
    endDate: {
        type: String
    },
    page: {
        type: Number
    }
})

module.exports = mongoose.models.Record || mongoose.model('Record', RecordSchema)