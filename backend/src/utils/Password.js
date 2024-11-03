import User from "../models/user.models.js";
import sendEmail from "./mailer.js";
import { Router } from "express";
const router = Router();

router.post('/reset',async(req,res)=>{
    const {email} = req.body;
    console.log("reset Password send otp ",email);
    
    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({msg:"User Not Found"});
        }
        
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        user.otp = otp;
        user.otpExpires = Date.now() + 300000; // OTP expires in 5 minutes
        await user.save({validateBeforeSave:false});
        console.log("user ",user);
        const subject = 'Password Reset';
        await sendEmail(
            email,
            subject,
            `Your OTP is: ${otp}. It is valid for 5 minutes.`,);
        res.status(200).json({msg:"OTP is Sent to your mail"});
    } catch (error) {
        console.log('Error while Sending OTP');
        res.status(500).json({msg:"Error While sending OTP"});
    }
})

router.post('/verify', async (req, res) => {
    const { email, otp, newPassword } = req.body;
    console.log("Verify Otp ", email, otp, newPassword);
    
    try {
        const user = await User.findOne({ email });

        // Check if user exists
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        console.log("user ",user);
        
        // Check if the OTP matches and is still valid
        if (user.otp !== otp || user.otpExpires < Date.now()) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }
        user.password = newPassword;
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save({ validateBeforeSave: false });
        res.status(200).json({ msg: "Password Reset Successfully" });
    } catch (error) {
        console.log('Error while Verifying OTP:', error);
        res.status(500).json({ msg: "Error While Verifying OTP" });
    }
});

export default router;