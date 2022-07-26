import dbConnect from "../../../../lib/dbConnect";
import User from "../../../../models/User"


export default async function handler(req, res) {
    const { method } = req

    await dbConnect()

    if(method === 'POST') {
        const { email } = req.body;
        const exists = await User.findOne({ email });
        if (exists) {
            throw new Error("이미 가입된 메일입니다");
        }
    }
}