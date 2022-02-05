import React, {useState, useRef} from 'react'
import { TextBox, MyContainer, Form, Input, ErrMessage } from './styles'
import gImg from '../../assets/google.png'
import { NavLink } from 'react-router-dom'
import { RemoveRedEye, VisibilityOff } from '@mui/icons-material';
import { ButtonBase } from '@mui/material'
import { signIn } from '../../apis/api'
import { useDispatch } from 'react-redux';
import { logIn } from '../../features/slices/userSlice';
import Loader from '../../components/loader/Loader'

const SignIn = () => {

    const loginData = JSON.parse(localStorage.getItem('loginData'))
    const [inputErr, setInputErr] = useState({email: false, password: false})
    const [showPassword, setShowPassword] = useState(false)
    const [errorMsg, setErrMsg] = useState('')
    const [loading, setLoading] = useState(false)

    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const rememberRef = useRef(null)

    const dispatch = useDispatch()

    const fatchData = async(userData) => {
        if(!navigator.onLine)
            return alert('You offline please check network connect')

        setLoading(true)
        const data = await signIn(userData)
        setLoading(false)
    
        if(data && data.error){
            setErrMsg(data.error)
        } else {
            dispatch(logIn(data))
        }
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()

        const email = emailRef.current.value
        const password = passwordRef.current.value

        if(email.length <  10 || !email.match(/^\w{5,15}@(gmail.com|mail.ru|outlook.com)$/i)){
            setInputErr({email: true, password: false})
            setErrMsg('Email must be min 10 charector and consist of [a-z] [0-9] @ sybmles')
            emailRef.current.focus()
        } else if(password.length < 7){
            setInputErr({email: false, password: true})
            setErrMsg('Password must be min 7 charector')
            passwordRef.current.focus()
        } else {

            if(rememberRef.current.checked){
                localStorage.setItem('loginData', JSON.stringify({email, password}))
            }

            setInputErr({email: false, password: false})
            setErrMsg('')
            fatchData({email, password})
        }
    }

    return (
        <MyContainer>
            <TextBox>
                <h1>Messanger</h1>
                <h5>
                    Connect with your friends and the world arround you on Messanger
                </h5>
            </TextBox>
            <Form onSubmit={handleSubmit}>
                <Input defaultValue={loginData?.email || ''} type="text" placeholder='E-mail' error={inputErr.email} ref={emailRef} />
                <span className="password">
                    <Input defaultValue={loginData?.password || ''} type={showPassword ? 'text':'password'} placeholder='Password' error={inputErr.password} ref={passwordRef} />
                    {
                        showPassword ? <VisibilityOff className='eye-icon' onClick={() => setShowPassword(false)} /> : <RemoveRedEye className='eye-icon' onClick={() => setShowPassword(true)} />
                    }
                </span>
                <div className="remember">
                    <span>
                        <input type="checkbox" id="checkbox" ref={rememberRef} />
                        <label htmlFor="checkbox">remember me</label>
                    </span>
                    <h5>
                        <NavLink to='/login/signin'>Forget password ?</NavLink>
                    </h5>
                </div>
                <ErrMessage >
                    {errorMsg}
                </ErrMessage>
                <ButtonBase>
                    <button className='login' style={{background: loading && '#6593ed'}} > {loading ? <Loader />: 'Login'} </button>
                </ButtonBase>
                <ButtonBase>
                    <button className='google-btn' >
                        <img alt='' src={gImg} /><span>Sign in with Google</span>
                    </button>
                </ButtonBase>
                <div className="under-text">
                    <h5>Do you haven't got account?</h5>
                    <NavLink to='/login/signup'>Sign up now</NavLink>
                </div>
            </Form>
        </MyContainer>
    )
}

export default SignIn
