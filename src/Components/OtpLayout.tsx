import React, { useContext, useEffect, useRef, useState } from 'react'
import { dataContext } from '../App'
type OtpLayoutProps = {
  GenerateOtpMethod: any
}
export const OtpLayout = (props: OtpLayoutProps) => {
  const [OtpArray, setOtpArray] = useState<any | []>([])
  const [inputRef, setinputRef] = useState<any | []>([])
  const [input, setInput] = useState<any>([])
  const [msg, setMsg] = useState("")
  const [timer, setTimer] = useState(60)
  const [disable, setDisable] = useState(true)
  const [attempt, setAttempt] = useState(4)
  const otp: any = useContext(dataContext)
  const ModalRef = useRef<any>(null)
  let temp = JSON.stringify(otp.otp)
  let temp1: any = [];
  // Regex for validation on user value
  const regex = /^[0-9\b]+$/
  useEffect(() => {
    // Timer
    if (timer !== 0) {
      setDisable(true)
      setTimeout(() => {
        setTimer(timer - 1)
      }, 1000)
    } else {
      setTimer(0)
      setDisable(false)
    }
    // focus on first OtpArray when page render
    ModalRef.current.addEventListener('shown.bs.modal', function () {
      inputRef[0].current.focus();
    })
  }, [timer])
  useEffect(() => {
    // spiliting otp here
    setOtpArray(temp.split(""))
    for (let i = 0; i < JSON.stringify(otp.otp).length; i++) {
      // creating ref here
      let temp = React.createRef<HTMLInputElement>()
      temp1.push(temp)
    }
    setinputRef(temp1);
    // creating a array whixh length is equal to otp
    let temp4: any = []
    for (let i = 0; i < temp.split("").length; i++) {
      temp4.push(" ")
    }
    setInput(temp4)
    // attempt value
    if (attempt === 0) {
      setDisable(true)
    }
  }, [otp.otp])
  // Onchange handler of input box
  const OtpArrayHandler = (e: any, index: number) => {
    // checking validation of input via regex
    if (regex.test(inputRef[index].current.value)) {
      input[index] = inputRef[index].current.value
      setInput([...input])
      // calling function of checking otp with user value
      checkOtp();
      for (let i = 0; i < inputRef.length; i++) {
        if (e.target.value !== '') {
          e.target.nextSibling.focus()
          break
        }
      }
    }
    else {
      // if value is not matching with regex the pass blank string into input box
      inputRef[index].current.value = ""
    }
  }
  // resend button functionality
  const ResendOtpHandler = (index: any) => {
    // calling generate otp function on resend button click
    props.GenerateOtpMethod()
    // setting timer again on resend click
    setTimer(60)
    // massage
    setMsg("Otp send successfully")
    // left attempt
    if (attempt !== 0) {
      setAttempt(attempt - 1)
    } else {
      setAttempt(0)
    }
    // focus on first box
    inputRef[0].current.focus()
    for (let i = 0; i < inputRef.length; i++) {
      inputRef[i].current.value = ""
    }
  }
  // onkeyUp handler
  const DownKeyHandler = (event: any, index: any) => {
    // click backspace
    if (event.keyCode === 8) {
      event.target.previousSibling.focus()
      input.splice(index, 1, " ")
      setInput([...input])
      checkOtp();
    }
  }
  // function for checking validation
  function checkOtp() {
    if (!input.includes(" ")) {
      if (JSON.stringify(input) === JSON.stringify(OtpArray)) {
        setMsg("Otp matched");
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      } else {
        setMsg("Otp not matched");
      }
    }
    else {
      setMsg("")
    }
  }
  return (
    <div ref={ModalRef} className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">Varify Email Address({otp.otp})</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <b id="staticBackdropLabel" className='mx-3'>Enter Your code here</b>
          <div style={{ display: "flex" }}>
            <div className="modal-body d-flex w-75" >
              {inputRef.map((val: any, index: any) =>
                <input type="text"
                  className={`${msg === "Otp matched" ? "success input_box" : `${msg === "" ? "input_box border" : "Error input_box"}`}`}
                  maxLength={1}
                  onChange={(e) => OtpArrayHandler(e, index)}
                  ref={inputRef[index]}
                  onKeyUp={(e) => DownKeyHandler(e, index)}
                />)}
            </div>
            {msg === "Otp matched" ? <div className="spinner-border text-success mt-3 me-5" role="status">
              <span className="visually-hidden">Loading...</span>
            </div> : ""}
            <br />
          </div>
          {msg === " " ? " " : <p className={`${msg === "Otp not matched" || msg === "You have exceed the limit now" ? "errorMsg mx-3" : "SuccesMsg mx-3"}`}>{msg}</p>}
          <div className='d-flex'>
            <button
              disabled={disable}
              className='btn btn-primary mb-4 mx-3'
              onClick={ResendOtpHandler}
            >Resend One Time Passcode</button>
            <p className='mx-3 mt-3' style={{ color: "blue" }}> {attempt} attempt Left</p>
            <b className='mt-3' style={{ color: "red" }}>{timer} sec left</b>
          </div>
        </div>
      </div>
    </div >

  )
}
