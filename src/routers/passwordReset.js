const Dentists = require("../usecases/dentists");
const Token = require("../models/token");
const sendEmail = require("../lib/sendEmail");
const crypto = require("crypto");
const Bcrypt = require("../lib/bcrypt")
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const dentist = await Dentists.getDentistByEmail(req.body.email)
        console.log(dentist)
        console.log(dentist[0].name)
        if (!dentist)
            return res.status(400).send("dentist with given email doesn't exist");
        console.log(dentist._id)
        let token = await Token.findOne({id:dentist[0]._id});
        if (!token) {
           console.log(dentist[0]._id)
            token = await new Token({
                id:dentist[0]._id,
                token: crypto.randomBytes(32).toString("hex"),
            }).save();
        }

        const link = `${process.env.BASE_URL}/passwordReset/${dentist[0]._id}/${token.token}`;
        await sendEmail(dentist[0].email, "Password reset", link);

        res.send("password reset link sent to your email account");
    } catch (error) {
        res.send("An error occured");
        console.log(error);
    }
});

router.post("/:idDentist/:token", async (req, res) => {
    try {

        const dentist = await Dentists.getDentistById(req.params.idDentist);
        if (!dentist) return res.status(400).send("invalid link or expired");

        const token = await Token.findOne({
            id:req.params.idDentist,
            token: req.params.token,
        });
        if (!token) return res.status(400).send("Invalid link or expired");

        dentist.password = await Bcrypt.hash(req.body.password);
        console.log(dentist.password)
        await dentist.save();
        await token.delete();

        res.send("password reset sucessfully.");
    } catch (error) {
        res.send("An error occured");
        console.log(error);
    }
});

module.exports = router;
