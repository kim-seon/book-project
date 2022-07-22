import dbConnect from "../../../../lib/dbConnect";
import Record from "../../../../models/Record";

export default async function handler(req, res) {
    const { method } = req

    await dbConnect()

    switch(method) {
        case 'POST':
            var record = new Record(req.body)
            const result = await record.save();
            console.log(result)
            return res.status(201).json({ success: true, data: result });
    }

}