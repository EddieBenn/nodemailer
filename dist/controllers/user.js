"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUser = exports.createUser = void 0;
const helpers_1 = require("../helpers/helpers");
const uuid_1 = require("uuid");
const userModels_1 = require("../models/userModels");
const helpers_2 = require("../helpers/helpers");
const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userId = (0, uuid_1.v4)();
        console.log(req.body);
        const user = await userModels_1.UserInstance.findOne({ where: { email: email } });
        if (user) {
            return res.status(400).json({
                message: `User already exists`
            });
        }
        const { otp, expiry } = (0, helpers_1.GenerateOTP)();
        await userModels_1.UserInstance.create({
            id: userId,
            email,
            name,
            password,
            otp: otp,
            otp_expiry: expiry,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        const newUser = await userModels_1.UserInstance.findOne({ where: { email: email } });
        if (newUser) {
            const params = {
                email: newUser.email,
                otp: newUser.otp
            };
            await (0, helpers_2.mailUserOtp)(params);
            return res.status(200).json({
                message: `User created successfully`,
                newUser
            });
        }
        return res.status(400).json({
            message: `Guy e no work`
        });
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({
            message: `Internal Server Error`
        });
    }
};
exports.createUser = createUser;
const verifyUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const { otp } = req.body;
        const user = await userModels_1.UserInstance.findOne({ where: { id: userId } });
        if (!user)
            return res.status(404).json({ message: `User not found` });
        if (user.otp !== Number(otp)) {
            return res.status(400).json({
                message: `Wrong Otp`
            });
        }
        if (user.otp_expiry < new Date()) {
            return res.status(400).json({
                message: `Otp Expired, Resend Another`
            });
        }
        if (user.otp === Number(otp) && user.otp_expiry > new Date()) {
            const newOtp = 100;
            await userModels_1.UserInstance.update({
                otp: newOtp,
            }, { where: { id: userId } });
            return res.status(200).json({
                message: `Otp Verified`
            });
        }
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({
            message: `Internal Server error`
        });
    }
};
exports.verifyUser = verifyUser;
