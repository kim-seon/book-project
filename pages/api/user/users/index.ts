import dbConnect from "../../../../lib/dbConnect";
import User from "../../../../models/User"


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
                const { email, nickname } = req.body;
                const emailExists = await User.findOne({ email });
                const nickExists = await User.findOne({ nickname });
                if (emailExists) {
                    return res.status(401).json({ exist: true })
                }
                if (nickExists) {
                    return res.status(402).json({ exists: true })
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