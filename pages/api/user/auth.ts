import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User"


export default async function handler(req, res) {
    const { method } = req

    await dbConnect()

    switch(method) {
        case 'POST':
            User.findOne({ email: req.body.email }, async function(err, user) {
                if(!user) {
                    return await res.json({
                        loginSuccess: false,
                        message: "제공된 이메일에 해당하는 유저가 없습니다."
                    });
                };

                user.comparePassword(req.body.password, async function(err, isMatch) {
                    if(!isMatch)
                        return await res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다." });
                    user.generateToken(async (err, user) => {
                        if(err) return await res.status(400).send(err);
                        //res.cookie('w_authExp', user.tokenExp);
                        return await res.status(200).json({ loginSuccess: true, user: user })
                    });
                });
            });
            break;
        case 'DELETE':
            const { id } = req.body
            User.findOneAndUpdate( { _id: id }, { token: "" },
            async function(err, user) {
                if(err) return await res.json({ success: false, err });
                return await res.status(201).send({
                    success: true
                });
            });
        break;
    }
}