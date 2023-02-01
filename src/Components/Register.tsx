import React, { useContext } from 'react'
import { attemptContext, dataContext } from '../App';
import { OtpLayout } from './OtpLayout';

export const Register = () => {
    const otp: any = useContext(dataContext)
    const attempt: any = useContext(attemptContext)
    // Generating Random Otp here......
    const generateOtpHandler = () => {
        attempt.setLeftAttempt(attempt.leftAttempt - 1)
        let max = 99999;
        let min = 10000;
        let RandomOtp = Math.floor(Math.random() * (max - min) + min);
        otp.setOtp(RandomOtp)
    }
    console.log(otp.otp);
    return (
        <div className='RegisterContainer'>
            <button className='btn btn-info'
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
                onClick={generateOtpHandler}>
                Validate Otp
            </button>
            <OtpLayout GenerateOtpMethod={generateOtpHandler} />
        </div>
    )
}
