import React, { useContext } from 'react'
// iMPORTING CONTEXT DATA HERE
import { attemptContext, dataContext } from '../App';
import { OtpLayout } from './OtpLayout';

export const Register = () => {
    // Storing context data .
    const otp: any = useContext(dataContext)
    const attempt: any = useContext(attemptContext)
    // Generating Random Otp here......
    const generateOtpHandler = () => {
        //setting the value of  left attempt
        attempt.setLeftAttempt(attempt.leftAttempt - 1)
        let max = 99999;
        let min = 10000;
        let RandomOtp = Math.floor(Math.random() * (max - min) + min);
        otp.setOtp(RandomOtp)
    }
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
