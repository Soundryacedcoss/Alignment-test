import React, { ChangeEvent, useContext, useEffect, useState } from 'react'
import { attemptContext, dataContext } from '../App';
// Defing types of props here.
type OtpLayoutProps = {
    GenerateOtpMethod: any
}
export const OtpLayout = (props: OtpLayoutProps) => {
    // Taking context data from context
    const otp: any = useContext(dataContext)
    const attempt: any = useContext(attemptContext)
    // state for taking value from user
    const [input1, setInput1] = useState("")
    const [input2, setInput2] = useState("")
    const [input3, setInput3] = useState("")
    const [input4, setInput4] = useState("")
    const [input5, setInput5] = useState("")
    // state for declearing msg
    const [msg, setMsg] = useState("")
    // State for timer
    const [timer, setTimer] = useState(60)
    // state for disable button untill time left
    const [disable, setDisable] = useState(true);
    // All value from user
    let UserValue = input1 + input2 + input3 + input4 + input5
    // Changing the generated value in string 
    let OtpInString = JSON.stringify(otp.otp)
    // taking regex for validating the text field
    const regex = /^[0-9\b]+$/
    useEffect(() => {
        // validation for checking otp with input data
        if (OtpInString === UserValue && UserValue.length === 5) {
            setMsg("Otp Matched!")
        }
        else if (OtpInString !== UserValue && UserValue.length === 5) {
            setMsg("Entered One Time Password is Incorrect!")
        }
        if (attempt.leftAttempt <= 0) {
            setMsg("You have exceed the limit")
            setDisable(true)
        }
        // timer
        let timeLimit
        if (timer <= 60 && disable === true) {
            timeLimit = setTimeout(() => {
                setTimer(timer - 1)
            }, 1000)
        } else {
            setTimer(0)
        }
        // clearing timer
        if (timer === 0) {
            setDisable(false)
            clearInterval(timeLimit)
            clearTimeout(timeLimit)
        }
        // disabling button here when no attempt available
        if (attempt.leftAttempt === 0) {
            setDisable(true)
        }
    }, [UserValue.length, attempt.leftAttempt, timer])
    //  taking the value from user
    const Input1Handler = (e: ChangeEvent<HTMLInputElement>) => {
        if (regex.test(e.target.value)) {
            setInput1(e.target.value)
            document.getElementById("input2")?.focus()
        } else {
            setInput1("")
        }
    }
    const Input2Handler = (e: ChangeEvent<HTMLInputElement>) => {
        if (regex.test(e.target.value)) {
            setInput2(e.target.value)
            document.getElementById("input3")?.focus()
        } else {
            setInput2("")
        }
    }
    const Input3Handler = (e: ChangeEvent<HTMLInputElement>) => {
        if (regex.test(e.target.value)) {
            setInput3(e.target.value)
            document.getElementById("input4")?.focus()
        } else {
            setInput3("")
        }
    }
    const Input4Handler = (e: ChangeEvent<HTMLInputElement>) => {
        if (regex.test(e.target.value)) {
            setInput4(e.target.value)
            document.getElementById("input5")?.focus()
        } else {
            setInput4("")
        }

    }
    const Input5Handler = (e: ChangeEvent<HTMLInputElement>) => {
        if (regex.test(e.target.value)) {
            setInput5(e.target.value)
            document.getElementById("input5")?.blur()
        }
        else {
            setInput5("")
        }
    }
    return (
        <div>
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Varify Email Address({otp.otp})</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <b id="staticBackdropLabel" className='mx-3'>Enter Your code here</b>
                        <div className="modal-body d-flex" >
                            <input type="text" value={input1} maxLength={1} onChange={Input1Handler} id='input1' className={`${msg.length === 12 ? "success input w-25  rounded-2" : `${msg.length === 0 ? " input w-25  rounded-2" : "Error input w-25  rounded-2"}`}`} />
                            <input type="text" value={input2} maxLength={1} onChange={Input2Handler} id='input2' className={`${msg.length === 12 ? "success input w-25 mx-3  rounded-2" : `${msg.length === 0 ? " input w-25  rounded-2 mx-3" : "Error mx-3 input w-25  rounded-2"}`}`} />
                            <input type="text" value={input3} maxLength={1} onChange={Input3Handler} id='input3' className={`${msg.length === 12 ? "success input w-25 mx-3  rounded-2" : `${msg.length === 0 ? " input w-25  rounded-2 mx-3" : "Error mx-3 input w-25  rounded-2"}`}`} />
                            <input type="text" value={input4} maxLength={1} onChange={Input4Handler} id='input4' className={`${msg.length === 12 ? "success input w-25 mx-3  rounded-2" : `${msg.length === 0 ? " input w-25  rounded-2 mx-3" : "Error mx-3 input w-25  rounded-2"}`}`} />
                            <input type="text" value={input5} maxLength={1} onChange={Input5Handler} id='input5' className={`${msg.length === 12 ? "success input w-25 mx-3  rounded-2" : `${msg.length === 0 ? " input w-25  rounded-2 mx-3" : "Error mx-3 input w-25  rounded-2"}`}`} />
                        </div>
                        {msg === "" ? " " : <p className={`${msg.length === 12 ? "SuccesMsg mx-3" : "errorMsg mx-3"}`}>{msg}</p>}

                        <div className='d-flex'>
                            <button
                                disabled={disable}
                                className='btn btn-primary mb-4 mx-3'
                                onClick={props.GenerateOtpMethod}
                            >Resend One Time Passcode</button>
                            <p className='mx-3 mt-3' style={{ color: "blue" }}> {attempt.leftAttempt} attempt Left</p>
                            <b className='mt-3' style={{ color: "red" }}>{timer} sec</b>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}