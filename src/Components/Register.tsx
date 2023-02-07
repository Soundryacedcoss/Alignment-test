import React, { ChangeEvent, useContext, useEffect, useRef, useState } from 'react'
import { dataContext } from '../App';
import { OtpLayout } from './OtpLayout';
export const Register = () => {
    const ref = useRef<HTMLInputElement>(null!)
    const otp: any = useContext(dataContext)
    let regex = /^[4-7\b]+$/
    const [NoOfDigit, setNoOfDigit] = useState("")
    // const [disable, setDisable] = useState(true)
    useEffect(() => {
        ref.current.focus()
    }, [])
    const InputHandler = (e: ChangeEvent<HTMLInputElement>) => {

        // if (regex.test(e.target.value)) {
        setNoOfDigit(e.target.value);
        if (regex.test(e.target.value)) {
            // setDisable(false)
        }
    }
    const generateOtpHandler = () => {
        if (NoOfDigit === "") {
            alert("Please enter digit between 4 to 7")
        }
        else if (!regex.test(NoOfDigit)) {
            alert("Please enter value between 4 to 7")
        }
        else {
            let max = ""
            for (let i = 0; i < parseInt(NoOfDigit); i++) {
                max += 9
            }
            let min = "1"
            for (let i = 0; i < parseInt(NoOfDigit) - 1; i++) {
                min += 0
            }
            let RandomOtp = Math.floor(Math.random() * (parseInt(max) - parseInt(min)) + parseInt(min));
            otp.setOtp(RandomOtp)
        }
    }
    console.log(otp.otp);

    return (
        <div className='Register_Container'>
            <div>
                <input type="text" ref={ref} onChange={InputHandler} value={NoOfDigit} maxLength={1} />
            </div>
            <button className='btn btn-info mx-5 mt-3'
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
                // disabled={disable}
                onClick={generateOtpHandler}
            >
                Validate Otp
            </button>
            <OtpLayout GenerateOtpMethod={generateOtpHandler} />
        </div>
    )
}
