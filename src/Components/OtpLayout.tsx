import React, { ChangeEvent, createRef, useContext, useEffect, useRef, useState } from 'react'
import { dataContext } from '../App'
type OtpLayoutProps = {
  GenerateOtpMethod: any
}
export const OtpLayout = (props: OtpLayoutProps) => {
  const inputRef1 = useRef<HTMLInputElement>(null)
  const [inputBox, setInputBox] = useState<any | []>([])
  const [inputBox1, setInputBox1] = useState<any | []>([])
  const [input, setInput] = useState<any>([])
  const [msg, setMsg] = useState("")
  const [timer, setTimer] = useState(60)
  const [disable, setDisable] = useState(true)
  const [attempt, setAttempt] = useState(4)
  const otp: any = useContext(dataContext)
  let temp = JSON.stringify(otp.otp)
  let temp1: any = [];
  const regex = /^[0-9\b]+$/
  useEffect(() => {
    if (timer !== 0) {
      setDisable(true)
      setTimeout(() => {
        setTimer(timer - 1)
      }, 1000)
    } else {
      setTimer(0)
      setDisable(false)
    }
  }, [timer])
  useEffect(() => {
    setInputBox(temp.split(""))
    for (let i = 0; i < JSON.stringify(otp.otp).length; i++) {
      let temp = React.createRef<HTMLInputElement>()
      temp1.push(temp)
    }
    setInputBox1(temp1);
    let temp4: any = []
    for (let i = 0; i < temp.split("").length; i++) {
      temp4.push("")
    }
    setInput(temp4)
  }, [otp.otp])
  console.log(input);
  const InputBoxHandler = (e: any, index: number) => {
    console.log(inputBox1[index].current.value);
    let tempArr: any = []
    if (regex.test(inputBox1[index].current.value)) {
      // setInput(inputBox[index].current.value)
      input[index] = inputBox1[index].current.value
      setInput(input)
      // InputValue[index] = inputBox1[index].current.value
      // if (!InputValue.includes("")) {
      //   e.target.blur()
      //   if (JSON.stringify(InputValue) === JSON.stringify(inputBox)) {
      //     setMsg("Otp matched");
      //   } else {
      //     setMsg("Otp not matched");
      //   }
      // }
      // else {
      //   setMsg("")
      // }
      // // }
      // // if (inputBox1.length !== 0) {
      // for (let i = 0; i < inputBox1.length; i++) {
      //   console.log(e.target.value);
      //   if (e.target.value !== '') {
      //     console.log(inputBox1[inputBox1.length - 1]);
      //     e.target.nextSibling.focus()
      //   }
      //   else {
      //     e.target.previousSibling.focus()
      //   }

      //   break
      // }
      // }
    }
    else {
      inputBox1[index].current.value = ""
    }

  }
  console.log(input);

  const ResendOtpHandler = () => {
    props.GenerateOtpMethod()
    setTimer(60)
    setMsg("Otp send successfully")
    setAttempt(attempt - 1)
    for (let i = 0; i < inputBox1.length; i++) {
      console.log(inputBox1[i].current.value);
      inputBox1[i].current.value = ""
    }

  }
  return (
    <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">Varify Email Address({otp.otp})</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <b id="staticBackdropLabel" className='mx-3'>Enter Your code here</b>
          <div className="modal-body d-flex" >
            {inputBox1.map((val: any, index: any) =>
              <input type="text"
                className={`${msg.length === 11 ? "success input w-25  rounded-2" : `${msg.length === 0 ? " input w-25  rounded-2" : "Error input w-25  rounded-2"}`}`}
                maxLength={1}
                onChange={(e) => InputBoxHandler(e, index)}
                ref={inputBox1[index]}
              />)}
            <br />
          </div>
          {msg === "" ? " " : <p className={`${msg === "Otp matched" ? "SuccesMsg mx-3" : "errorMsg mx-3"}`}>{msg}</p>}

          <div className='d-flex'>
            <button
              disabled={disable}
              className='btn btn-primary mb-4 mx-3'
              onClick={ResendOtpHandler}
            >Resend One Time Passcode</button>
            <p className='mx-3 mt-3' style={{ color: "blue" }}> {attempt} attempt Left</p>
            <b className='mt-3' style={{ color: "red" }}>{timer} sec</b>
          </div>
        </div>
      </div>
    </div>

  )
}
