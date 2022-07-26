import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const MemoSchema = new mongoose.Schema({
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
        type: String,
        required: true,
        unique: true
    },
    bookCover: {
        type: String
    },
    bookTitle: {
        type: String
    },
    bookAuthor: {
        type: String
    },
    bookDsc: {
        type: String
    },
    bookPage: {
        type: Number
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
},{ timestamps: true })

module.exports = mongoose.models.Memo || mongoose.model('Memo', MemoSchema)