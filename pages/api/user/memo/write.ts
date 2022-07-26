import mongoose, { Types } from "mongoose";
import dbConnect from "../../../../lib/dbConnect";
import Memo from "../../../../models/Memo";

export default async function handler(req, res) {
    const { method } = req

    await dbConnect()

    switch (method) {
        case 'POST':
            try {
                var memo = new Memo(req.body)
                const result = await memo.save();
                return res.status(201).json({ success: true, data: result });
            }
            catch (error) {
                res.status(400).json({ success: false })
                console.log(error)
            }
            break
        case 'GET':
            const { headers: { referer } } = req
            const objectId = referer.substring(referer.lastIndexOf("/") + 1)
            Memo.find({ writer: new Types.ObjectId(objectId) })
                        .exec((err, board) => {
                            if(err) return res.status(400).send(err);
                            res.status(200).json(board)
                    })
            break
    }
    
}