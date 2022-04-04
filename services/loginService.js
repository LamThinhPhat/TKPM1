const userModel = require('../Model/user');
//const orderService = require('../services/orderService');
const bcrypt = require('bcrypt')
const salt = 10;
const transporter = require('../utils/nodemailer');
const crypto = require('crypto');

const FindByEmail = async (email) => {
    return await userModel.findOne({
        email: email,
    }).lean();
}

const validPassword = async (password, user) => {
    const valid = await bcrypt.compare(password, user.password);
    return valid;
}

const validateActive = (user) => {
    return user.active;
}

const register = async (email, password, firstName, lastName, address, host) => {
    const hashPassword = await bcrypt.hash(password, salt);
    const emailToken = crypto.randomBytes(20).toString('hex');;

    const mailOption = {
        from: process.env.SHOP_GMAIL_USERNAME,
        to: email,
        subject: 'Email verification',
        html: `<div style="background-color: #0fbbad; padding: 2em 2em;">
                    <h1 style="text-align: center;">Thank you for registering on our web</h1>
                    <h4 style="text-align: center;">Please click <a href="http://${host}/login/verify/${emailToken}">here</a> to activate your account</h4>
                </div>`
    }

    transporter.sendMail(mailOption, function (err, info) {
        if (err) console.log(err);
    })

    await userModel.create({
        email: email,
        password: hashPassword,
        firstName: firstName,
        lastName: lastName,
        address: address,        
        emailToken: emailToken,
    })

    const userID = await userModel.findOne({ email: email })
}

const activeNewAccount = async (emailToken) => {
    const account = await userModel.findOne({ emailToken: emailToken });
    if (account) {
        account.emailToken = null;
        account.active = true;
        await account.save();
    }
}

const sendNewPassword = async (email) => {
    const account = await userModel.findOne({ email: email });
    if (account) {
        const newPass = (Math.random() + 1).toString(36).substring(2);
        account.password = await bcrypt.hash(newPass, salt);

        const mailOption = {
            from: process.env.SHOP_GMAIL_USERNAME,
            to: email,
            subject: 'Forget password',
            html: `<div style="background-color: #ea562dda; padding: 2em 2em;">
                        <h1 style="text-align: center;">This is your new password</h1>
                        <h4 style="text-align: center;">${newPass}</h4>
                    </div>`
        }

        transporter.sendMail(mailOption, function (err, info) {
            if (err) console.log(err);
        })

        await account.save();
    }
}

module.exports = {
    FindByEmail,
    sendNewPassword,
    activeNewAccount,
    register,
    validateActive,
    validPassword,
}