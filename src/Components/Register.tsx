import React, { useContext, useEffect, useRef, useState } from 'react'
import { dataContext } from '../App';
import { OtpLayout } from './OtpLayout';
export const Register = () => {
    // ref for  input box
    const ref = useRef<HTMLInputElement>(null!)
    // using context datacontext for keep otp 
    const otp: any = useContext(dataContext)
    // regex for input box validation 
    let regex = /^[4-7\b]+$/
    // State for taking no of digit from user
    const [value, setValue] = useState("")
    useEffect(() => {
        // focusing on input box
        ref.current.focus()
    }, [ref.current])

    // generating otp on buttton click
    const generateOtpHandler = () => {
        // checking validation for user value
        if (ref.current.value === "") {
            alert("Please enter digit between 4 to 7")
            ref.current.focus()
        }
        else if (!regex.test(ref.current.value)) {
            alert("Please enter value between 4 to 7")
            ref.current.focus()
        }
        else {
            // generating otp
            let max = ""
            for (let i = 0; i < parseInt(ref.current.value); i++) {
                max += 9
            }
            let min = "1"
            for (let i = 0; i < parseInt(ref.current.value) - 1; i++) {
                min += 0
            }
            let RandomOtp = Math.floor(Math.random() * (parseInt(max) - parseInt(min)) + parseInt(min));
            otp.setOtp(RandomOtp)
        }
    }
    const InputBoxHandler = (e: any) => {
        setValue(e.target.value)
    }
    return (
        <div className='Register_container'>
            <div>
                <input type="text"
                    ref={ref}
                    maxLength={1}
                    placeholder="Enter the no of digit in Otp [4-7]"
                    className="form-control w-150"
                    onChange={InputBoxHandler}
                />
            </div>
            <button className='btn btn-info mt-3'
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
                onClick={generateOtpHandler}
            >
                Validate Otp
            </button>{regex.test(value) === true ? <OtpLayout GenerateOtpMethod={generateOtpHandler} /> : ""}

        </div>
    )
}