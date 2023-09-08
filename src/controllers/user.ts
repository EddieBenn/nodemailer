import express, {Request, Response, NextFunction} from 'express';
import {GenerateOTP} from '../helpers/helpers'
import {v4} from 'uuid'
import { UserAttributes, UserInstance } from '../models/userModels';
import {mailUserOtp} from '../helpers/helpers'

export const createUser = async (req:Request, res:Response) => {
    try{
        const {name, email, password} = req.body;
        const userId = v4()
        console.log(req.body)
        const user:any = await UserInstance.findOne({where: {email:email}})
        if(user){
            return res.status(400).json({
                message: `User already exists`
            })
        }
        const {otp, expiry} = GenerateOTP()
       await UserInstance.create({
            id: userId,
            email,
            name,
            password,
            otp:otp,
            otp_expiry:expiry,
            createdAt:new Date(),
            updatedAt: new Date()
        })

        const newUser:any = await UserInstance.findOne({where: {email:email}})
        if(newUser) {
            const params = {
                email: newUser.email,
                otp: newUser.otp
            }
            await mailUserOtp(params)
            return res.status(200).json({
            message: `User created successfully`,
            newUser
        })
    }
        return res.status(400).json({
            message: `Guy e no work`
        })
    }catch(err:any){
        console.log(err.message)
        res.status(500).json({
            message: `Internal Server Error`
        })
    }
}

export const verifyUser = async (req:Request, res:Response)=> {
    try{
        const userId = req.params.id;
        const {otp} = req.body
        const user:any = await UserInstance.findOne({where: {id:userId}})
        if(!user) return res.status(404).json({message: `User not found`})
        if(user.otp !== Number(otp)){
            return res.status(400).json({
                message: `Wrong Otp`
            })
        }
        if(user.otp_expiry < new Date()){
            return res.status(400).json({
                message:`Otp Expired, Resend Another`
            })
        }
        if(user.otp === Number(otp) && user.otp_expiry > new Date()){
            const newOtp = 100
           await UserInstance.update(
                {
                otp:newOtp,
            },
            {where: { id: userId }}
            ) as unknown as UserAttributes;
            return res.status(200).json({
                message: `Otp Verified`
            })
        }
    }catch(err:any){
        console.log(err.message)
        res.status(500).json({
            message: `Internal Server error`
        })
    }
}