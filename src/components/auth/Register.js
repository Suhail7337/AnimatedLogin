import {useState,useEffect} from 'react'
import registerImg from "../../assets/register.svg"
import {AiOutlineEye,AiOutlineEyeInvisible} from "react-icons/ai"
import {GoPrimitiveDot} from "react-icons/go"
import {FaCheck} from "react-icons/fa"




const Register = ({onLogin,onShowPassword,onTogglePassword}) => {
  const [showIndicators, setShowIndicators] = useState(false)
  const [pass, setPass] = useState("")
  const [passLetter, setPassLetter] = useState(false)
  const [passNumber, setpassNumber] = useState(false)
  const [passChar, setPassChar] = useState(false)
  const [passLength, setPassLength] = useState(false)

  const [passComplete, setPassComplete] = useState(false)



  const handleShowIndicator = () =>{
    setShowIndicators(true)
  }

  const handleChange = (e) => {
    setPass(e.target.value)
    console.log(pass)
  }

  useEffect(() => {
    if(pass.match(/([a-z.*[A-Z]])|([A-Z].*[a-z])/)){
      setPassLetter(true)
    }else{
      setPassLetter(false)
    }

    if(pass.match(/([0-9])/)){
      setpassNumber(true)
    }else{
      setpassNumber(false)
    }

    if(pass.match(/([!,@,#,$,%,^,&,*,?,_,~])/)){
      setPassChar(true)
    }else{
      setPassChar(false)
    }

    if(pass.length > 7){
      setPassLength(true)
    }else{
      setPassLength(false)
    }

    if(passLetter && passNumber && passChar && passLength){
      setPassComplete(true)
    } else{
      setPassComplete(false)
    }
  },[pass,passLetter,passNumber,passChar,passLength])

  return (
    <div className='main-container --flex-center'>
    
    <div className='form-container'> 
    <form className='--form-control'>
        <h2 className='--color-danger --text-center'>Register</h2>
        <input type="text" className='--width-100' placeholder='Username'/>
        <input type="text" className='--width-100' placeholder='Email'/>
        <div className='password'>
        <input 
        type={onShowPassword ? "text" : "password"} 
        className='--width-100' 
        placeholder='Password'
        onFocus={handleShowIndicator}
        value={pass}
        onChange={handleChange}
        />
        <span className='icon' onClick={onTogglePassword}>
          {onShowPassword ? <AiOutlineEyeInvisible/> : <AiOutlineEye/>}
          </span> 
        </div>
        <button 
        disabled={!passComplete} 
        className={
          passComplete 
        ? "--btn --btn-primary --btn-block"
        : "--btn --btn-primary --btn-block btn-disabled" 
        }
        >Register</button>
        
        <span className='--text-sm --block'>have an account?<a href="#"className='--text-sm' onClick={onLogin}>Login</a> 
        </span>
        <div className={showIndicators ? "show-indicator" : "hide-indicator"}>
          <ul className='--list-style-none --card --bg-gray --text-sm --p'>
            <p className='--text-sm'>Password Strength Indicator</p>
            <li className={passLetter ? "pass-green" : "pass-red"}>
              <span className='--align-center'>
                {passLetter ? <FaCheck/> :  <GoPrimitiveDot/>}
                  &nbsp; Lowercase & Uppercase
              </span>
            </li>
            <li className={passNumber ? "pass-green" : "pass-red"}>
            <span className='--align-center'>
              {passNumber ? <FaCheck/> : <GoPrimitiveDot/> }
            
              &nbsp; Numbers (0-9)
              </span>
            </li>
            <li className={passChar ? "pass-green" : "pass-red"}>
            <span className='--align-center'>
            {passChar ? <FaCheck/> : <GoPrimitiveDot/> }
              &nbsp; Special Character (!@#$%^&*)
              </span>
            </li>
            <li className={passLength ? "pass-green" : "pass-red"}>
            <span className='--align-center'>
            {passLength ? <FaCheck/> : <GoPrimitiveDot/> }
              &nbsp; At least 8 character
              </span>
            </li>
          </ul>
        </div>
    </form>
    </div>
    <div className='img-container'>
        <img src={registerImg}></img>
    </div>
</div>
  )
}

export default Register