import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI

if(!MONGODB_URI) {
    throw new Error(
        'mongodb url이 틀렸음'
    )
}

async function dbConnect() {
    mongoose.connect(MONGODB_URI)
        .then(() => console.log('MongoDB Connected...'))
        .catch(err => console.log(err))
}

export default dbConnect