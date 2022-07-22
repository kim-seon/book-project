import dbConnect from "../../lib/dbConnect";
import User from "../../models/User"


export default async function handler(req, res) {
    const { method } = req

    await dbConnect()

    switch(method) {
        case 'GET':
            try {
                const users = await User.find({})
                res.status(200).json({ success: true, data: users })
            } catch(error) {
                res.status(400).json({ success: false })
                console.log(error)
            }
            break
        case 'POST':
            try {
                var user = new User(req.body);
                const { email, nickname, password } = req.body;
                const exists = await User.findOne({ email });
                if (exists) {
                    throw new Error("이미 가입된 메일입니다");
                }
                const result = await user.save();
                return res.status(201).json({ success: true, data: result });
            } catch(error) {
                res.status(400).json({ success: false })
                console.log(error)
            }
            break
        default:
            res.status(400).json({ success: false })
            console.log("default")
            break
    }
}